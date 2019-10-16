import React from 'react';
import Popup from './popup';
import Axios from 'axios';
import ListView from './ListView';
import Switch from 'react-switch';

class ShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: null,
            DestinationLat: null,
            DestinationLng: null,
            direction: false,
            showPopup: false,
            showList: [],
            parkingLotID: null,
            list: true
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
        console.log(this.props.location.Origin);
        if (this.props.location.Origin) {
            localStorage.setItem('OriginLat', this.props.location.Origin.latitude);
            localStorage.setItem('OriginLng', this.props.location.Origin.longitude);
        }

    }

    componentDidMount() {

        if (localStorage.getItem('OriginLat')) {
            var Origin = { latitude: JSON.parse(localStorage.getItem('OriginLat')), longitude: JSON.parse(localStorage.getItem('OriginLng')) };
            this.setState({ origin: Origin })
            Axios.get('http://localhost:5000/ParkingLot/All')
                .then(response => {
                    response.data.map((data) => {
                        var distance;
                        var duration;
                        var timeUnit;
                        var destinations = `${data.Lat}/${data.Lng}`;
                        var origins = `${this.state.origin.latitude}/${this.state.origin.longitude}`;

                        Axios.get(`http://localhost:5000/distancematrix/${origins}/${destinations}`)
                            .then(response => {
                                distance = response.data.distance;
                                duration = response.data.duration;
                                timeUnit = response.data.unit;
                                Axios.get(`http://localhost:5000/ParkingLot/${data._id}/SnapShots/latest`)
                                    .then(response => {
                                        data["OpenParkings"] = (response.data);
                                        data["Distance"] = distance;
                                        data["Duration"] = duration;
                                        data["TimeUnit"] = timeUnit;

                                    }).then(() => {
                                        this.setState({
                                            showList: [data, ...this.state.showList]
                                        })
                                    })
                            })
                        return data;
                    })
                });
        }
    }

    shouldComponenetUpdate() {

    }

    handleToggleSwitch(list) {
        this.setState({ list });
    }

    togglePopup(id) {
        console.log(id);
        this.setState({
            showPopup: !this.state.showPopup,
            parkingLotID: id
        });
    }

    handleClick(e, e2) {
        this.setState({
            direction: !this.state.direction,
            DestinationLat: e,
            DestinationLng: e2
        });
    }

    render() {

        return (
            <main>
                <section className="section-display">
                    <Switch
                        onChange={this.handleToggleSwitch}
                        checked={this.state.list}
                        className="react-switch"
                    />
                    {this.state.list ?
                        <ListView key={1}
                            showList={this.state.showList}
                            togglePopup={this.togglePopup.bind(this)}
                            handleClick={this.handleClick.bind(this)} />
                        : null
                    }
                    {this.state.direction ?
                        this.props.history.push({
                            pathname: '/direction',
                            Destination: { lat: this.state.DestinationLat, lng: this.state.DestinationLng },
                            Origin: { lat: this.state.origin.latitude, lng: this.state.origin.longitude }
                        })
                        : null
                    }

                    {this.state.showPopup ?
                        <Popup
                            key={this.state.parkingLotID}
                            closePopup={this.togglePopup.bind(this)}
                            ID={this.state.parkingLotID}
                        />
                        : null
                    }
                </section>
            </main>
        )
    }

}

export default ShowPage;