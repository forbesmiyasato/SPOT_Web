import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import SidePanel from './SidePanel';

class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            showingSidePanel: false,
            activeMarker: {},
            selectedPlace: {},
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            showingSidePanel: true
        });
    }

    render() {
        console.log(this.state.selectedPlace);
        var data = this.state.selectedPlace.info;
   const containerStyle = { position: 'absolute', width: '100%', height: '100%' }

        return (
            <main>
                <div className="map">
                    <Map google={this.props.google}
                        containerStyle = { containerStyle }
                        style={{ width: '90%', height: '90%', position: 'absolute', left: '4rem', top: '3rem' }}
                        zoom={10}
                        mapTypeControl={false}
                        initialCenter={{
                            lat: this.props.Origin.lat,
                            lng: this.props.Origin.lng
                        }}
                    >
                        <div>
                            <SidePanel Data={this.props.showList} />
                        </div>
                        {this.props.showList.map((data) => {
                            return <Marker
                                onClick={this.onMarkerClick}
                                info={data}
                                position={{ lat: data.Lat, lng: data.Lng }}
                            />
                        })}

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                {data ?
                                    (<div className="info-window">
                                        <h2>{data.Name}</h2>
                                        <a href={data.Image}>
                                            <img style={{ height: '10rem', width: '10rem' }} ALIGN="right" src={data.Image} />
                                        </a>
                                        <h3>Open Parkings: {data.OpenParkings}</h3>
                                        <h3>Distance: <br /> {data.Distance} Miles</h3>
                                        <h3>Duration: {data.Duration} {data.TimeUnit}</h3>
                                    </div>)
                                    : null
                                }
                            </div>
                        </InfoWindow>
                    </Map>


                </div>

            </main>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyB-7ORj7iEWauVJmKQG6nUvEaq0unSBA9Y"
})(MapView)