/*global google*/

import React from 'react';


class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.autoCompleteInput = React.createRef();
        this.autoComplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(this.autoCompleteInput.current);
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        //this.props.onPlaceLoaded(place);
    }

    submitLocation() {
        console.log("submit");
        console.log(this.autocomplete.getPlace().geometry.location.lat());
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
                    <form onSubmit={this.submitLocation.bind(this)}>
                    <div className="search-box">
                        <input ref={this.autoCompleteInput} className="search-txt" list="parkings" type="text" placeholder="Search Parking Lot" />
                        <a className="search-btn" href="#">
                            <i className="icon-basic-magnifier"></i>
                        </a>
                        </div>
                    </form>
                    <a href="/showpage" className="btn btn--white btn--animated btn__location"> Current Location <i className="icon-basic-geolocalize-05"></i></a>
                </div>

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