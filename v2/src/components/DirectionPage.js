import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import Map from './Map';

const DirectionPage = () => {
    const MapLoader = withScriptjs(Map);

    return (
        <MapLoader
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API}`}
            loadingElement={<div style={{ height: `100%`, position: `none` }} />}
        />
    );
};

export default DirectionPage;
