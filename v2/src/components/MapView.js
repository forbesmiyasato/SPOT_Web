import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

class MapView extends React.Component {

    onMarkerClick(props, marker, e) {
        // ..
    }

    render() {
        console.log(this.props);
        return (
            <div className="map">
                <Map google={this.props.google}
                    style={{ width: '90%', height: '90%', position: 'absolute', left: '4rem', top: '4rem'}}
                    zoom={10}
                    initialCenter={{
                        lat: this.props.Origin.lat,
                        lng: this.props.Origin.lng
                    }}
                >
                    {this.props.showList.map((data) => {
                        return <Marker
                            name={data.Name}
                            position={{ lat: data.Lat , lng: data.Lng }}
                        />
                    })}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyB-7ORj7iEWauVJmKQG6nUvEaq0unSBA9Y"
})(MapView)