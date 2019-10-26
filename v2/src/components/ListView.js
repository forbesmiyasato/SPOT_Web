import React from 'react'
import AvailabilityChart from './AvailabilityChart'

class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: []
        }
        console.log(this.props);
    }
    componentDidMount() {
        console.log(this.props.showList);
        this.setState(
            {
                showList: this.props.showList
            }
        )
    }

    render() {
        return (
            <main>
                <div className="ui stackable four column grid">
                    {this.props.showList.map((data) => {
                        return (
                            <div className="column">
                                <div className="card" id="popup1">
                                    <div className="card__side card__side--front">
                                        <div className="card__picture card__picture--3">
                                            <img alt="Parking lot" src={data.Image} />
                                        </div>
                                        <h4 className="card__heading">
                                            <span className="card__heading-span">{data.Name}</span>
                                        </h4>
                                        <div className="card__details">
                                            <div className="row">
                                                <div className="col-1-of-2">
                                                    <h3>Parkings</h3>
                                                    <h3 className="card__details--parkings">{data.OpenParkings}</h3>
                                                </div>
                                                <div className="col-1-of-2">
                                                    <h3>Distance</h3>
                                                    <h3 className="card__details--distance">{data.Distance}</h3>
                                                    <h4 className="utility-center">Miles</h4>
                                                    <h3>Approximately</h3>
                                                    <h3 className="card__details--distance">{data.Duration}</h3>
                                                    <h4 className="utility-center">{data.TimeUnit}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card__side card__side--back">
                                        <div className="card__cta">
                                            <AvailabilityChart key={data._id} UnavailableParkings={data.TotalParkings - data.OpenParkings} OpenParkings={data.OpenParkings} color="#fff"/>
                                            <button onClick={this.props.handleClick.bind(this, data.Lat, data.Lng)} className="btn btn--white btn--animated btn__directions"> Get Directions <i className="icon-basic-geolocalize-01"></i></button>
                                            <button onClick={this.props.togglePopup.bind(this, data._id)} className="btn btn--white btn--animated btn__statistics"> See Statistics <i className="icon-ecommerce-graph2"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </main>
            )
    }
}

export default ListView;