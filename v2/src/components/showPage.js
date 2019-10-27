import React from 'react';
import Popup from './popup';
import Axios from 'axios';
import ListView from './ListView';
import Switch from 'react-switch';
import MapView from './MapView';

class ShowPage extends React.Component {
    constructor(props) {
        super(props);
        console.log("Still part of show page")
        var listView;
        if (null === localStorage.getItem("listView")) {
            listView = true;
        }
        else {
            listView = JSON.parse(localStorage.getItem('listView'));
        }
        //setting origin to 0 is to avoid origin being undefined when starting show page on map view (line 168) might cause errors need to monitor this
        this.state = {
            origin: 0,
            DestinationLat: null,
            DestinationLng: null,
            direction: false,
            showPopup: false,
            showList: [],
            parkingLotID: null,
            list: listView
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
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
        localStorage.setItem('listView', JSON.stringify(!this.state.list));
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
                    <div className="ui grid">
                        <div className="eight wide column">
                            <h2 className="section-display__text">
                                Parking lots found
            </h2>
                        </div>
                        <div className="eight wide column">
                            <h2 className="section-display__text">
                                Change View

                        <Switch
                                    onChange={this.handleToggleSwitch}
                                    checked={this.state.list}
                                    onColor="#86d3ff"
                                    //style={{ transform: [{ scaleX: 2 }, { scaleY: .8 }] }}
                                    uncheckedIcon={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                color: "white",
                                                paddingRight: 2
                                            }}
                                        >
                                            List
                            </div>
                                    }
                                    checkedIcon={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                color: "white",
                                                paddingRight: 2
                                            }}
                                        >
                                            Map
                            </div>
                                    }
                                    className="react-switch"
                                />
                            </h2>
                        </div>
                    </div>
                    {this.state.list ?
                        <ListView key={1}
                            showList={this.state.showList}
                            togglePopup={this.togglePopup.bind(this)}
                            handleClick={this.handleClick.bind(this)} />
                        :
                        <MapView key={2}
                            showList={this.state.showList}
                            togglePopup={this.togglePopup.bind(this)}
                            handleClick={this.handleClick.bind(this)}
                            Origin={{ lat: this.state.origin.latitude, lng: this.state.origin.longitude }}
                        />
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