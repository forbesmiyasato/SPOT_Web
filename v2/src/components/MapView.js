import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import SidePanel from './SidePanel';

class MarkersList extends React.Component {

    constructor(props) {
        super(props);
        this.markersRendered = false;
        console.log(this.props.showList);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.props.showList) === JSON.stringify(nextProps.showList) && this.markersRendered) {
            return false;
        }
        this.markersRendered = true;
        return true;
    }

    render() {
        return (
            <span>
                {this.props.showList.map((place, i) => {
                    return (
                        <Marker
                            {...this.props}
                            key={i}
                            data={place}
                            position={{ lat: place.Lat, lng: place.Lng }}
                        />
                    );
                })}
            </span>
        )
    }

}
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
        //console.log(this.state.selectedPlace)
    }

    render() {
        var selectedPlaceData = this.state.selectedPlace.data;
        var data = this.state.selectedPlace.info;
        const containerStyle = { position: 'absolute', width: '100%', height: '100%' }

        return (
            <main>
                <div className="map">
                    <Map google={this.props.google}
                        containerStyle={containerStyle}
                        style={{ width: '90%', height: '90%', position: 'absolute', left: '4rem', top: '3rem' }}
                        zoom={10}
                        mapTypeControl={false}
                        initialCenter={{
                            lat: this.props.Origin.lat,
                            lng: this.props.Origin.lng
                        }}
                    >
                        <MarkersList showList={this.props.showList} onClick={this.onMarkerClick} />
                        <div>
                            <SidePanel Data={this.props.showList} />
                        </div>
                

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                {selectedPlaceData ?
                                    (<div className="info-window">
                                        <h2>selectedPlaceData.Name</h2>
                                        <a href={selectedPlaceData.Image}>
                                            <img style={{ height: '10rem', width: '10rem' }} ALIGN="right" src={selectedPlaceData.Image} />
                                        </a>
                                        <h3>Open Parkings: {selectedPlaceData.OpenParkings}</h3>
                                        <h3>Distance: <br /> {selectedPlaceData.Distance} Miles</h3>
                                        <h3>Duration: {selectedPlaceData.Duration} {selectedPlaceData.TimeUnit}</h3>
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

        //{this.props.showList.map((data) => {
                        //    return <Marker
                        //        onClick={this.onMarkerClick}
                        //        info={data}
                        //        position={{ lat: data.Lat, lng: data.Lng }}
                        //    />
                        //})}