import React from 'react';
import "../stylesheets/LandingPage.css"
import Map from './Map';

const LandingPage = () => {
    return (
        <div>
            <nav className="navbar">
                <div className=" container-fluid left">
                    <div className="navbar-header">
                        <a className="navbar-brand unclickable" href="#">S<i className="fas fa-parking"></i>OT</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                        </ul>
                    </div>
                </div>
            </nav>

            <div id="landing-header" className="ui container">
                <h1 className="text">Welcome to SPOT - Simple Parking Observation Tool<i className="fas fa-car"></i></h1>
                <div className="search-box">
                    <input className="search-txt" list="parkings" type="text" placeholder="Search Parking Lot"/>
                    <a className="search-btn" href="#">
                        <i className="fas fa-search"></i>
                    </a>
                    <datalist id="parkings">
                        <select name="parking">
                            <option value="123432452"> Pacific University </option>
                            <option value="Stoller-East"> Seattle University </option>
                            <option> huhu </option>
                        </select>
                        </datalist>
                </div>
            </div>
            <ul className="slideshow">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        <Map />
                
        </div>
    )
}
export default LandingPage;