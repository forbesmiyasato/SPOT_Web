import React from 'react';


class LandingPage extends React.Component {

    render() {
        return (
            <header className="header">
                <div className="header__logo-box">S<i className="fas fa-parking"></i>OT</div>
                <div className="header__text-box">
                    <h1 className="heading-primary">
                        <span className="heading-primary--main">Spot</span>
                        <span className="heading-primary--sub">Single Parking Observation Tool</span>
                    </h1>
                    <div className="search-box">
                        <input className="search-txt" list="parkings" type="text" placeholder="Search Parking Lot" />
                        <a className="search-btn" href="#">
                            <i className="icon-basic-magnifier"></i>
                        </a>
                        <datalist id="parkings">
                            <select name="parking">
                                <option value="123432452"> Pacific University </option>
                                <option value="Stoller-East"> Seattle University </option>
                                <option> huhu </option>
                            </select>
                        </datalist>
                    </div>
                    <a href="/showpage" className="btn btn--white btn--animated btn__location"> Current Location <i className="icon-basic-geolocalize-05"></i></a>
                </div>

            </header>
            )
    }

}

export default LandingPage;