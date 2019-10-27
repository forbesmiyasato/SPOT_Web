import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import SidePanel from './SidePanel';
//TODO highlight marker when selected from list, and add hover effects for markers, get rid of overflowing side panel!

class MarkersList extends React.Component {

    constructor(props) {
        super(props);
        this.markersRendered = false;
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
            showList: [],
            showingInfoWindow: false,
            showingList: true,
            activeMarker: {},
            selectedPlace: {},
            showData: null
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.mapRef = React.createRef();
        this.onListItemClick = this.onListItemClick.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    componentDidMount() {
        this.setState(
            {
                showList: this.props.showList
            }
        );
    }

    onListItemClick(data) {
        const map = this.mapRef;
        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(data.Lat, data.Lng);
            map.panTo(center);
            map.setZoom(13);
        }
        this.setState({
            showingList: false,
            showData: data
        })
    }

    onBack() {
        this.setState({
            showData: null,
            showingList: true
        })
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            showingList: false,
            showData: props.data
        });

        var map = this.mapRef;
        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(this.state.selectedPlace.position.lat, this.state.selectedPlace.position.lng);
            map.panTo(center);
            var zoom = map.getZoom();
            if (zoom < 16) {
                map.setZoom(zoom + 2);
            }
        }
    }

    render() {
        var selectedPlaceData = this.state.selectedPlace.data;
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
                        onReady={(mapProps, map) => (this.mapRef = map)}
                    >
                        <MarkersList showList={this.props.showList} onClick={this.onMarkerClick} />
                        <SidePanel Data={this.props.showList} onListItemClick={this.onListItemClick} showingList={this.state.showingList}
                            showData={this.state.showData} handleClick={this.props.handleClick} onBack={this.onBack} />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                {selectedPlaceData ?
                                    (<div className="info-window">
                                        <h2>{selectedPlaceData.Name}</h2>
                                        <a href={selectedPlaceData.Image}>
                                            <img alt={selectedPlaceData.Name} style={{ height: '10rem', width: '10rem' }} ALIGN="right" src={selectedPlaceData.Image} />
                                        </a>
                                        <h3>Open Parkings: {selectedPlaceData.OpenParkings}</h3>
                                        <h3>Distance: <br /> {selectedPlaceData.Distance} Miles</h3>
                                        <h3>Duration: {selectedPlaceData.Duration} {selectedPlaceData.TimeUnit}</h3>
                                    </div>)
                                    : null
                                }
                            </div>
                        </InfoWindow>
                        <div>
                        </div>
                    </Map>


                </div>

            </main>
        )
    }
}

export default GoogleApiWrapper((props) => ({
    apiKey: "AIzaSyB-7ORj7iEWauVJmKQG6nUvEaq0unSBA9Y"
}))(MapView)