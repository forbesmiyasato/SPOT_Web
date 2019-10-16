import React from 'react';
import { withScriptjs } from "react-google-maps";
import Map from './DirectionMap';

class DirectionPage extends React.Component {

    render() {
        const MapLoader = withScriptjs(Map);
        return (

            <MapLoader
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API}`}
                loadingElement={<div style={{ height: `100%`, position: `none` }} />}
                Destination={this.props.location.Destination}
                Origin={this.props.location.Origin}
            />
        );
    }
};

export default DirectionPage;
