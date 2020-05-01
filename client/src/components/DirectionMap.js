/*global google*/

import React, { Component, Fragment } from "react";
import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";
import ReactHtmlParser from 'react-html-parser'
import SearchBox from "react-google-maps/lib/components/places/SearchBox";


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
            <>
                <div>
                    <GoogleMapExample
                        containerElement={<div style={{ height: "70rem", width: "100%" }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    <div class="ui list divided direction-list massive">
                        {this.state.directions ? this.state.directions.routes[0].legs[0].steps.map((data, i) => {
                            return (<div class="item">
                                {data.maneuver.includes("left") ?  <i class="icon arrow left"></i> : null}
                                {data.maneuver.includes("right") ?  <i class="icon arrow right"></i> : null}
                                {data.maneuver ? null : <i class="map marker icon"></i>}
                                <div class="content direction-content">
                                    <a class="header direction-header">{ReactHtmlParser(data.instructions)}</a>
                                    <div class="description direction-description">
                                        Distance: {data.distance.text} Duration: {data.duration.text}
                                    </div>
                                </div>
                            </div>
                            )
                        })
                            :
                            null
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Map;
