/*global google*/

import React, { Component } from "react";
import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";


class Map extends Component {

    constructor(props) {
        super(props);
        if (this.props.Destination) {
            localStorage.setItem('DestinationLat', this.props.Destination.lat);
            localStorage.setItem('DestinationLng', this.props.Destination.lng);
            localStorage.setItem('OriginLat', this.props.Origin.lat);
            localStorage.setItem('OriginLng', this.props.Origin.lng);
        }
    }
    state = {
        directions: null
    };

    componentDidMount() {
        const directionsService = new google.maps.DirectionsService();
        console.log(localStorage.getItem('OriginLat'))
        const origin = { lat: JSON.parse(localStorage.getItem('OriginLat')), lng: JSON.parse(localStorage.getItem('OriginLng')) };
        const destination = { lat: JSON.parse(localStorage.getItem('DestinationLat')), lng: JSON.parse(localStorage.getItem('DestinationLng')) };
        console.log(origin);
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result
                    });
                    console.log(result);
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }

    //componentWillUpdate(nextProps, nextState) {
    //    localStorage.setItem('DestinationLat', this.props.Destination.lat);
    //    localStorage.setItem('DesinationLng', this.props.Destination.lng);
    //    localStorage.setItem('OriginLat', this.props.Origin.lat);
    //    localStorage.setItem('OriginLng', this.props.Origin.lng);
    //}

    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: JSON.parse(localStorage.getItem('OriginLat')), lng: JSON.parse(localStorage.getItem('OriginLng')) }}
                defaultZoom={13}
            >
                <DirectionsRenderer
                    directions={this.state.directions}
                />
            </GoogleMap>
        ));

        return (
            <div>
                <GoogleMapExample
                    containerElement={<div style={{ height: "70rem", width: "100%" }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

export default Map;
