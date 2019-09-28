import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import Axios from 'axios';
import dotenv from 'dotenv';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.InitMap = this.InitMap.bind(this)

        this.state = { parkings: [] };
        Axios.get('http://localhost:5000/Location/5d7482ea69e83a587c806c8a/check')
            .then(response => {

                var i = 0;
                response.data.ParkingLots.map(parkinglots => {
                    //this.state.parkings[i] = parkinglots;
                    this.setState(state => {
                        const parkings = state.parkings.concat(parkinglots);
                        return {
                            parkings
                        }
                    })
                    i++;
                })
            })
    }

    InitMap() {
        var tempLat;
        var tempLng;
        var tempData = []
        {
            this.state.parkings.map((parking) => {
                const test = Axios.get('http://localhost:5000/Location/' + parking)
                    .then(response => {
                        //console.log(response.data.Lat);
                        //console.log(response.data.Lng);
                        return response.data;
                        //return (<Marker position={{ lat: response.data.Lat, lng: response.data.Lng }} />)
                    }
                    )
                test.then(data => {
                    tempData.push(data);
                }
                )
            })
        }
console.log (tempData);
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 45.518391, lng: -123.111191 }}>

                
                {tempData.map(data => (
                    <Marker position={{ lat: data.Lat, lng: data.Lng }} />
                ))}

            </GoogleMap>
        )
    }

    componentDidMount() {
        console.log(process.env.REACT_APP_API);
    }

    render() {
        const WrappedMap = withScriptjs(withGoogleMap(this.InitMap));
        return (
            <div className="map">
                <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_API}`}
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                />
            </div>
        )
    }
}

export default Map;