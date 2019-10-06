import React from 'react';
import Popup from './popup';

class ShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false, showList: [
                { Name: "Health Profession Campus", OpenParking: 5, Distance: 10, Image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Building_2_at_Pacific_University_HPC_south_side_-_Hillsboro%2C_Oregon.JPG"},
                { Name: "Cascade Hall", OpenParking: 8, Distance: 20, Image: "https://www.walshconstruction.com/wp-content/uploads/PacU-Cascade-JoshPartee-3861-ext-corner-1450x966.jpg"},
                { Name: "Stoller Hall", OpenParking: 5, Distance: 10, Image: "https://www.pacificu.edu/sites/html/map/images/Stoller_Center.jpg"},
                { Name: "Gilbert Hall", OpenParking: 5, Distance: 10, Image: "https://cdnassets.hw.net/6d/51/5348993a4205be33137df8970a6b/d7b0e137-1210-40fe-beb5-36e47db92c70.jpg"}
            ]
        };
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        console.log(this.state.showList);
        return (

            <main>
                <section class="section-display">
                    <h2 class="section-display__text">
                        Parking lots found
            </h2>
                    <div class="row">
                        {this.state.showList.map((data) => {
                            return (
                                <div class="col-1-of-4">
                                    <div class="card" id="popup1">
                                        <div class="card__side card__side--front">
                                            <div class="card__picture card__picture--3">
                                                <img src={data.Image} />
                                            </div>
                                            <h4 class="card__heading">
                                                <span class="card__heading-span">{data.Name}</span>
                                            </h4>
                                            <div class="card__details">
                                                <div class="row">
                                                    <div class="col-1-of-2">
                                                        <h3>Parkings</h3>
                                                        <h3 class="card__details--parkings">{data.OpenParking}</h3>
                                                    </div>
                                                    <div class="col-1-of-2">
                                                        <h3>Distance</h3>
                                                        <h3 class="card__details--distance">{data.Distance}</h3>
                                                        <h4 class="utility-center">Miles</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card__side card__side--back">
                                            <div class="card__cta">
                                                <div id="activeBorder" class="active-border">
                                                    <div id="circle" class="circle">
                                                        <span class="prec 270" id="prec">20%</span>
                                                    </div>
                                                </div>
                                                <a href="yahoo.com" class="btn btn--white btn--animated btn__directions"> Get Directions <i class="icon-basic-geolocalize-01"></i></a>
                                                <button onClick={this.togglePopup.bind(this)} class="btn btn--white btn--animated btn__statistics"> See Statistics <i class="icon-ecommerce-graph2"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </section>
                {this.state.showPopup ?
                    <Popup
                        text='Click "Close Button" to hide popup'
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </main>
        )

    }
}

export default ShowPage;

            ////          <div class="col-1-of-4">
            ////            <div class="card">
            ////                <div class="card__side card__side--front">
            ////                    <div class="card__picture card__picture--3">
            ////                        <img src="https://www.walshconstruction.com/wp-content/uploads/PacU-Cascade-JoshPartee-3861-ext-corner-1450x966.jpg" />
            ////                    </div>
            ////                    <h4 class="card__heading">
            ////                        <span class="card__heading-span">Cascade Hall</span>
            ////                    </h4>
            ////                    <div class="card__details">
            ////                        <div class="row">
            ////                            <div class="col-1-of-2">
            ////                                <h3>Parkings</h3>
            ////                                <h3 class="card__details--parkings">1</h3>
            ////                            </div>
            ////                            <div class="col-1-of-2">
            ////                                <h3>Distance</h3>
            ////                                <h3 class="card__details--distance">5</h3>
            ////                                <h4 class="utility-center">Miles</h4>
            ////                            </div>
            ////                        </div>
            ////                    </div>
            ////                </div>
            ////                <div class="card__side card__side--back">
            ////                    <div class="card__cta">
            ////                        <div id="activeBorder" class="active-border">
            ////                            <div id="circle" class="circle">
            ////                                <span class="prec 270" id="prec">20%</span>
            ////                            </div>
            ////                        </div>
            ////                        <a href="yahoo.com" class="btn btn--white btn--animated btn__directions"> Get Directions <i class="icon-basic-geolocalize-01"></i></a>
            ////                        <a href="google.com" class="btn btn--white btn--animated btn__statistics"> See Statistics <i class="icon-ecommerce-graph2"></i></a>
            ////                    </div>
            ////                </div>
            ////            </div>
            ////        </div>
            ////        <div class="col-1-of-4">
            ////            <div class="card">
            ////                <div class="card__side card__side--front">
            ////                    <div class="card__picture card__picture--3">
            ////                        <img src="https://cdnassets.hw.net/6d/51/5348993a4205be33137df8970a6b/d7b0e137-1210-40fe-beb5-36e47db92c70.jpg" />
            ////                    </div>
            ////                    <h4 class="card__heading">
            ////                        <span class="card__heading-span">Gilbert Hall</span>
            ////                    </h4>
            ////                    <div class="card__details">
            ////                        <div class="row">
            ////                            <div class="col-1-of-2">
            ////                                <h3>Parkings</h3>
            ////                                <h3 class="card__details--parkings">1</h3>
            ////                            </div>
            ////                            <div class="col-1-of-2">
            ////                                <h3>Distance</h3>
            ////                                <h3 class="card__details--distance">5</h3>
            ////                                <h4 class="utility-center">Miles</h4>
            ////                            </div>
            ////                        </div>
            ////                    </div>
            ////                </div>
            ////                <div class="card__side card__side--back">
            ////                    <div class="card__cta">
            ////                        <div id="activeBorder" class="active-border">
            ////                            <div id="circle" class="circle">
            ////                                <span class="prec 270" id="prec">20%</span>
            ////                            </div>
            ////                        </div>
            ////                        <a href="yahoo.com" class="btn btn--white btn--animated btn__directions"> Get Directions <i class="icon-basic-geolocalize-01"></i></a>
            ////                        <a href="google.com" class="btn btn--white btn--animated btn__statistics"> See Statistics <i class="icon-ecommerce-graph2"></i></a>
            ////                    </div>
            ////                </div>
            ////            </div>
            ////        </div>
            ////        <div class="col-1-of-4">
            ////            <div class="card">
            ////                <div class="card__side card__side--front">
            ////                    <div class="card__picture card__picture--3">
            ////                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/62/Building_2_at_Pacific_University_HPC_south_side_-_Hillsboro%2C_Oregon.JPG" />
            ////                    </div>
            ////                    <h4 class="card__heading">
            ////                        <span class="card__heading-span">Health Professions Campus</span>
            ////                    </h4>
            ////                    <div class="card__details">
            ////                        <div class="row">
            ////                            <div class="col-1-of-2">
            ////                                <h3>Parkings</h3>
            ////                                <h3 class="card__details--parkings">1</h3>
            ////                            </div>
            ////                            <div class="col-1-of-2">
            ////                                <h3>Distance</h3>
            ////                                <h3 class="card__details--distance">5</h3>
            ////                                <h4 class="utility-center">Miles</h4>
            ////                            </div>
            ////                        </div>
            ////                    </div>
            ////                </div>
            ////                <div class="card__side card__side--back">
            ////                    <div class="card__cta">
            ////                        <div id="activeBorder" class="active-border">
            ////                            <div id="circle" class="circle">
            ////                                <span class="prec 270" id="prec">20%</span>
            ////                            </div>
            ////                        </div>
            ////                        <a href="yahoo.com" class="btn btn--white btn--animated btn__directions"> Get Directions <i class="icon-basic-geolocalize-01"></i></a>
            ////                        <a href="google.com" class="btn btn--white btn--animated btn__statistics"> See Statistics <i class="icon-ecommerce-graph2"></i></a>
            ////                    </div>
            ////                </div>
            ////            </div>
            ////        </div>
            ////        </div>
            ////    </section>
            ////<div class="popup" id="popup">
            ////    <div class="popup__content">
            ////        <div class="popup__left">

            ////        </div>
            ////        <div class="popup__right">
            ////            <a href="#popup1" class="popup__close">&times;</a>

            ////        </div>
            ////    </div>
            ////</div>