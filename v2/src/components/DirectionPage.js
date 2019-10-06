import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import Map from './Map';

class DirectionPage extends React.Component {

    //componentDidMount() {
    //    console.log(this.props.location);
    //};
    render() {
        const MapLoader = withScriptjs(Map);
        return (

            <MapLoader
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API}`}
                loadingElement={<div style={{ height: `100%`, position: `none` }} />}
                Destination={this.props.location.state}
            />
        );
    }
};

export default DirectionPage;
