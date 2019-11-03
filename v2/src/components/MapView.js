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
        var label = {
            text: "P",
            color: "white"
        };
        var defaultIcon = {
            url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless2_hdpi.png', // url
            scaledSize: new this.props.google.maps.Size(20, 32), // scaled size
        };
        //var highlightedIcon = {
        //    url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2', // url
        //    scaledSize: new this.props.google.maps.Size(20, 30), // scaled size
        //};

        return (
            <span>
                {this.props.showList.map((place, i) => {
                    return (
                        <Marker
                            {...this.props}
                            ref={place.Name}
                            key={i}
                            data={place}
                            position={{ lat: place.Lat, lng: place.Lng }}
                            Name={place.Name}
                            context={place.Name}
                            label={label}
                            icon={defaultIcon}
                        //animation={this.props.google.maps.Animation.DROP}
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
            showData: null,
            showSidePanel: false
        }

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMarkerMouseOver = this.onMarkerMouseOver.bind(this);
        this.onMarkerMouseOut = this.onMarkerMouseOut.bind(this);
        this.mapRef = React.createRef();
        this.onListItemClick = this.onListItemClick.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onListItemHover = this.onListItemHover.bind(this);
        this.onListItemLeave = this.onListItemLeave.bind(this);
        this.onSidePanelToggle = this.onSidePanelToggle.bind(this);
    }

    onSidePanelToggle() {
        this.setState({
            showSidePanel: !this.state.showSidePanel
        })
    }

    componentDidMount() {
        this.setState(
            {
                showList: this.props.showList
            }
        );
    }

    onListItemHover(data) {
        var label = this.clickedListItem.refs[data.Name].marker.getLabel();
        label.color = "black";
        this.clickedListItem.refs[data.Name].marker.setLabel(label);
        var icon = this.clickedListItem.refs[data.Name].marker.getIcon();
        icon.scaledSize = new this.props.google.maps.Size(24, 36)
        icon.labelOrigin = new this.props.google.maps.Point(12, 16)
        //icon.anchor = new this.props.google.maps.Point(0,32)
        console.log(icon);
        this.clickedListItem.refs[data.Name].marker.setIcon(icon);
    }

    onListItemLeave(data) {
        var label = this.clickedListItem.refs[data.Name].marker.getLabel();
        label.color = "white";
        this.clickedListItem.refs[data.Name].marker.setLabel(label);
        var icon = this.clickedListItem.refs[data.Name].marker.getIcon();
        icon.scaledSize = new this.props.google.maps.Size(20, 32)
        icon.labelOrigin = new this.props.google.maps.Point(10, 16)
        console.log(icon);
        this.clickedListItem.refs[data.Name].marker.setIcon(icon);
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
            selectedPlace: data,
            showingList: false,
            showData: data,
            activeMarker: this.clickedListItem.refs[data.Name].marker,
            showingInfoWindow: true

        })
    }

    onBack() {
        this.setState({
            showData: null,
            showingList: true
        })
    }

    onMarkerMouseOut(props, marker, e) {
        var label = marker.getLabel();
        label.color = "white";
        marker.setLabel(label);
        var icon = marker.getIcon();
        icon.scaledSize = new this.props.google.maps.Size(20, 32)
        icon.labelOrigin = new this.props.google.maps.Point(10, 16)
        //icon.anchor = new this.props.google.maps.Point(0,32)
        marker.setIcon(icon);
    }
    onMarkerMouseOver(props, marker, e) {
        var label = marker.getLabel();
        label.color = "black";
        marker.setLabel(label);
        var icon = marker.getIcon();
        icon.scaledSize = new this.props.google.maps.Size(24, 36)
        icon.labelOrigin = new this.props.google.maps.Point(12, 16)
        marker.setIcon(icon);
    }
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props.data,
            activeMarker: marker,
            showingInfoWindow: true,
            showingList: false,
            showData: props.data,
            showSidePanel: true
        });
        var map = this.mapRef;
        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(this.state.selectedPlace.Lat, this.state.selectedPlace.Lng);
            map.panTo(center);
            var zoom = map.getZoom();
            if (zoom < 16) {
                map.setZoom(zoom + 2);
            }
        }

        console.log(this.InfoWindow)
        //if (this.InfoWindow.)
        //TODO add a check if the window is closed before opening
        this.InfoWindow.openWindow();
    }

    render() {
        console.log(this.state.selectedPlace);
        console.log(this.state.showingInfoWindow);
        var selectedPlaceData = this.state.selectedPlace;
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
                        <MarkersList showList={this.props.showList} onClick={this.onMarkerClick} ref={component => this.clickedListItem = component}
                            onMouseover={this.onMarkerMouseOver} onMouseout={this.onMarkerMouseOut} />
                        <SidePanel Data={this.props.showList} onListItemClick={this.onListItemClick} showingList={this.state.showingList}
                            showData={this.state.showData} handleClick={this.props.handleClick} onBack={this.onBack} onHover={this.onListItemHover}
                            onLeave={this.onListItemLeave} onSidePanelToggle={this.onSidePanelToggle} showSidePanel={this.state.showSidePanel} />
                        <InfoWindow
                            ref={component => this.InfoWindow = component}
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