
import React from 'react';
import Popup from './popup';
import Axios from 'axios';
import AvailabilityChart from './AvailabilityChart';

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
            parkingLotID: null
        };
        this.togglePopup = this.togglePopup.bind(this);
        console.log(this.props.location.Origin);
        if (this.props.location.Origin) {
            localStorage.setItem('OriginLat', this.props.location.Origin.latitude);
            localStorage.setItem('OriginLng', this.props.location.Origin.longitude);
        }

    }

    componentDidMount() {
        //console.log(localStorage.getItem('OriginLat'))
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
        //else {
        //    window.navigator.geolocation.getCurrentPosition(
        //        (position) => {
        //            this.setState({ origin: position.coords })
        //            const ParkingLots = Axios.get('http://localhost:5000/ParkingLot/All')
        //                .then(response => {
        //                    response.data.map((data) => {
        //                        var distance;
        //                        var duration;
        //                        //console.log(response);
        //                        var destinations = `${data.Lat}/${data.Lng}`;
        //                        var origins = `${this.state.origin.latitude}/${this.state.origin.longitude}`;
        //                        //console.log(process.env.REACT_APP_API);

        //                        Axios.get(`http://localhost:5000/distancematrix/${origins}/${destinations}`)
        //                            .then(response => {
        //                                distance = response.data.distance;
        //                                duration = response.data.duration;
        //                                Axios.get(`http://localhost:5000/ParkingLot/${data._id}/SnapShots/latest`)
        //                                    .then(response => {
        //                                        data["OpenParkings"] = (response.data);
        //                                        data["Distance"] = distance;
        //                                        data["Duration"] = duration;

        //                                    }).then(() => {
        //                                        this.setState({
        //                                            showList: [data, ...this.state.showList]
        //                                        })
        //                                    })
        //                            })
        //                    })
        //                });
        //        },
        //        (err) => {
        //            this.setState({ errorMessage: err.message })
        //        }
        //    )
        //}
    }

    shouldComponenetUpdate() {

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
                    <h2 className="section-display__text">
                        Parking lots found
            </h2>
                    <div className="ui stackable four column grid">
                        {this.state.showList.map((data) => {
                            return (
                                <div className="column">
                                    <div className="card" id="popup1">
                                        <div className="card__side card__side--front">
                                            <div className="card__picture card__picture--3">
                                                <img alt="Parking lot" src={data.Image} />
                                            </div>
                                            <h4 className="card__heading">
                                                <span className="card__heading-span">{data.Name}</span>
                                            </h4>
                                            <div className="card__details">
                                                <div className="row">
                                                    <div className="col-1-of-2">
                                                        <h3>Parkings</h3>
                                                        <h3 className="card__details--parkings">{data.OpenParkings}</h3>
                                                    </div>
                                                    <div className="col-1-of-2">
                                                        <h3>Distance</h3>
                                                        <h3 className="card__details--distance">{data.Distance}</h3>
                                                        <h4 className="utility-center">Miles</h4>
                                                        <h3>Approximately</h3>
                                                        <h3 className="card__details--distance">{data.Duration}</h3>
                                                        <h4 className="utility-center">{data.TimeUnit}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card__side card__side--back">
                                            <div className="card__cta">
                                                <AvailabilityChart key={data._id} UnavailableParkings={data.TotalParkings - data.OpenParkings} OpenParkings={data.OpenParkings} />
                                                <button onClick={this.handleClick.bind(this, data.Lat, data.Lng)} className="btn btn--white btn--animated btn__directions"> Get Directions <i className="icon-basic-geolocalize-01"></i></button>
                                                <button onClick={this.togglePopup.bind(this, data._id)} className="btn btn--white btn--animated btn__statistics"> See Statistics <i className="icon-ecommerce-graph2"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </section>
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
            </main>
        )
    }

}

export default ShowPage;


//<div id="activeBorder" className="active-border">
//    <div id="circle" className="circle">
//        <span className="prec 270" id="prec">20%</span>
//    </div>
//</div>

//{ Name: "Health Profession Campus", Lat: 41.756795, Lng: -78.954298, OpenParking: 5, Distance: 10, Image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Building_2_at_Pacific_University_HPC_south_side_-_Hillsboro%2C_Oregon.JPG" },
//{ Name: "Cascade Hall", Lat: 41.756795, Lng: -78.954298, OpenParking: 8, Distance: 20, Image: "https://www.walshconstruction.com/wp-content/uploads/PacU-Cascade-JoshPartee-3861-ext-corner-1450x966.jpg" },
//{ Name: "Stoller Hall", Lat: 41.756795, Lng: -78.954298, OpenParking: 5, Distance: 10, Image: "https://www.pacificu.edu/sites/html/map/images/Stoller_Center.jpg" },
//{ Name: "Gilbert Hall", Lat: 41.756795, Lng: -78.954298, OpenParking: 5, Distance: 10, Image: "https://cdnassets.hw.net/6d/51/5348993a4205be33137df8970a6b/d7b0e137-1210-40fe-beb5-36e47db92c70.jpg" }