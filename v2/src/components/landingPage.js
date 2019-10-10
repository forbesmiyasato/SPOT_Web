/*global google*/

import React from 'react';


class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.autoCompleteInput = React.createRef();
        this.autoComplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.removeElementsByClass = this.removeElementsByClass(this);
        this.state = ({
            next: false,
            currentLocation: false,
            origin: null,
            errorMessage: null,
            wrongLocation: false
        })
    }

    removeElementsByClass(className) {
        var elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(this.autoCompleteInput.current);
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);

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
        console.log("place changed")
    }

    currentLocation() {
        console.log("currentLocation");
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                    origin: position.coords,
                    currentLocation: true
                })
                console.log(this.state.origin)

            },
            (err) => {
                this.setState({ errorMessage: err.message })
            }
        )
        //this.setState({
        //    currentLocation: true
        //})

    }

    test(event) {
        console.log(event.target.value);
    }
    submitLocation() {
        console.log("submit");
        if (this.autocomplete.getPlace()) {
            var latitude = this.autocomplete.getPlace().geometry.location.lat();
            var longitude = this.autocomplete.getPlace().geometry.location.lng()
            var Origin = { latitude, longitude };
            this.setState({
                next: true,
                origin: Origin
            })
        }
        else {
            this.setState({
                wrongLocation: true
            })
        }
    }

    render() {
        return (
            <header className="header">
                <div className="header__logo-box">S<i className="fas fa-parking"></i>OT</div>
                <div className="header__text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">Spot</span>
                        <span className="heading-primary--sub">Single Parking Observation Tool</span>
                    </h1>
                    <form id="input" onSubmit={this.submitLocation.bind(this)} onChange={this.test.bind(this)}>
                        <div className="search-box">
                            <input onSubmit={this.submitLocation.bind(this)} ref={this.autoCompleteInput} className="search-txt" list="parkings" type="text" placeholder="Search Parking Lot" />
                            <a className="search-btn" onClick={this.submitLocation.bind(this)} >
                                <i className="icon-basic-magnifier"></i>
                            </a>
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

                        //<datalist id="parkings">
                        //    <select name="parking">
                        //        <option value="123432452"> Pacific University </option>
                        //        <option value="Stoller-East"> Seattle University </option>
                        //        <option> huhu </option>
                        //    </select>
                        //</datalist>