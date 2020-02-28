/*global google*/

import React from 'react';
import Spinner from './Spinner';

class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        window.localStorage.clear();
        this.autoCompleteInput = React.createRef();
        this.autoComplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.removeElementsByClass = this.removeElementsByClass(this);
        this.state = ({
            next: false,
            currentLocation: false,
            origin: null,
            errorMessage: null,
            wrongLocation: false,
            wait: false
        })
    }

    removeElementsByClass(className) {
        var elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem("error") !== null)
        {
            this.setState({
                errorMessage: sessionStorage.getItem("error")
            })
            sessionStorage.clear();
        }
        var options = {
            componentRestrictions: { country: "us" }
        }

        this.autocomplete = new google.maps.places.Autocomplete(this.autoCompleteInput.current, options);
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
        this.service = new google.maps.places.AutocompleteService();
        google.maps.event.addDomListener(document.getElementById('input'), 'keydown', function (e) {
            if (e.keyCode === 13) {
                const googleDOMNodes = document.getElementsByClassName('pac-container');
                if (googleDOMNodes.length > 0) {
                    e.preventDefault();
                }
                //this.removeElementsByClass('pac-container');
                var elements = document.getElementsByClassName('pac-container');
                while (elements.length > 0) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
            }
        })

    }



    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        if (!place.geometry) {
            console.log("invalid location");
            this.submitLocation();
        }
        else {
            this.submitLocation();
            console.log("submit");
        }
        console.log("place changed")
    }

    currentLocation() {
        console.log("currentLocation");
        this.setState({
            wait: true
        })
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                    origin: position.coords,
                    currentLocation: true,
                    wait: false
                })
                console.log(this.state.origin)

            },
            (err) => {
                this.setState({
                    errorMessage: "Error: " + err.message + "! Please allow access to your location!",
                    wait: false
                })
            }
        )
    }

    test(event) {
        //var request = {
        //    placeId: this.autocomplete.,
        //    fields: ['geometry']
        //};

        //service = new google.maps.places.PlacesService(map);
        //service.getDetails(request, callback);
    }

    submitLocation() {

        console.log("submit");
        console.log(this.autocomplete.getPlace());
        if (this.autocomplete.getPlace().geometry) {
            var latitude = this.autocomplete.getPlace().geometry.location.lat();
            var longitude = this.autocomplete.getPlace().geometry.location.lng()
            var Origin = { latitude, longitude };
            this.setState({
                next: true,
                origin: Origin
            })
        }
        else {
            //window.alert("Please selected address suggested in dropdown")
            //window.location.reload();
            if (this.autocomplete.gm_accessors_.place.dd.h[0] == null)
            {
                console.log(this.autocomplete.getPlace());
                sessionStorage.setItem("error", 'Invalid Location "'  + this.autocomplete.getPlace().name + '"');
                window.location.reload(false);
                
            }
            else {
            var placeID = this.autocomplete.gm_accessors_.place.dd.h[0].m[3];
            console.log(placeID);
            var request = {
                placeId: placeID,
                fields: ['geometry']
            };

            var service = new google.maps.places.PlacesService(document.createElement('div'));
            service.getDetails({
                placeId: placeID,
                fields: ['geometry']
            }, (place) => {
                var latitude = place.geometry.location.lat();
                var longitude = place.geometry.location.lng()
                var Origin = { latitude, longitude };
                this.setState({
                    next: true,
                    origin: Origin
                })
            });
        }
        }
    }

    render() {
        if (this.state.wait) {
            return <Spinner />
        }
        return (
            <header className="home-header">
                {this.state.errorMessage && !this.state.origin ?
                    <div className="ui red message" style={{textAlign: "center"}}>
                        {this.state.errorMessage}
                    </div>
                    : null
                }
                <div className="home-header__logo-box">S<i className="fas fa-parking"></i>OT</div>
                <div className="home-header__text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">Spot</span>
                        <span className="heading-primary--sub">Single Parking Observation Tool</span>
                    </h1>
                    <form id="input" onSubmit={this.submitLocation.bind(this)} onChange={this.test.bind(this)}>
                        <div className="search-box">
                            <input onSubmit={this.submitLocation.bind(this)} ref={this.autoCompleteInput} className="search-txt" list="parkings" type="text" placeholder="Search Parking Lot" />
                            <button className="search-btn" onClick={this.submitLocation.bind(this)} >
                                <i className="icon-basic-magnifier"></i>
                            </button>
                        </div>
                    </form>
                    <button onClick={this.currentLocation.bind(this)} className="btn btn--white btn--animated btn__location"> Current Location <i className="icon-basic-geolocalize-05"></i></button>
                </div>
                {this.state.next ?
                    this.props.history.push({
                        pathname: '/ShowPage',
                        Origin: this.state.origin
                    })
                    : null
                }
                {this.state.currentLocation ?
                    this.props.history.push({
                        pathname: '/ShowPage',
                        Origin: this.state.origin
                    })
                    : null
                }
                {this.state.wrongLocation ?
                    this.props.history.push({
                        pathname: '/LocationNotFound'
                    })
                    : null
                }
            </header>
        )
    }

}

export default LandingPage;