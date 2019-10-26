import React from 'react';
import AvailabilityChart from './AvailabilityChart';
import Dashboard from './Dashboard';

class SidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showList: this.props.Data
        }
        console.log(this.props.onListItemClick);
    }

    onSidePanelToggle() {
        this.setState({
            show: !this.state.show
        })
        //setTimeout(function () {
        //    $(formMessages).removeClass('error');
        //    //....and whatever else you need to do
        //}, 3000);
    }

    render() {
        var showData = this.props.showData;
        return (
            <div className="menu">
                <div className={(this.state.show || this.props.showData ? "side-panel__show " : " ") + "side-panel always-visible"}>
                    <div className="ui relaxed divided list">
                        {this.state.showList.map(data => {
                            return (<>
                                {this.props.showingList ?
                                    <div className={(this.state.show ? "list-show " : " ") + "item"} onClick={this.props.onListItemClick.bind(this, data)}>
                                        <img className="ui top aligned tiny image" src={data.Image} />
                                        <div className="content">
                                            <div className="header">
                                                <h3>{data.Name}</h3>
                                                <div className="description">
                                                    <h4>Open Parkings: {data.OpenParkings}</h4>
                                                    <h4>Distance: {data.Distance} Miles</h4>
                                                    <h4>Duration: {data.Duration} {data.TimeUnit}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                            </>
                            )
                        })}
                        {!this.props.showingList ?
                            <div className="list-show item">
                                <div class="ui blue buttons">
                                    <button class="ui labeled icon button" onClick={this.props.onBack.bind(this)}>
                                        <i class="left chevron icon"></i>
                                        Back
                                    </button>
                                </div>
                                <img className="ui fluid image" src={showData.Image} />
                                    <div className="content">
                                        <div className="header">
                                            <h3>{showData.Name}</h3>
                                            <div className="description">
                                                <h4>Open Parkings: {showData.OpenParkings}</h4>
                                                <h4>Distance: {showData.Distance} Miles</h4>
                                                <h4>Duration: {showData.Duration} {showData.TimeUnit}</h4>
                                            </div>
                                    </div>
                                    <button className="ui button list-direction" onClick={this.props.handleClick.bind(this, showData.Lat, showData.Lng)}>
                                        Get Directions
                                        <i class="icon-basic-geolocalize-01"/>
                                    </button>
                                </div>
                                <Dashboard ID={showData._id} />
                                <AvailabilityChart key={showData._id} UnavailableParkings={showData.TotalParkings - showData.OpenParkings} OpenParkings={showData.OpenParkings} color="#777"/>
                                </div>
                                :
                                null
                            }
                    </div>
                </div>
                <div className={(this.state.show ? "menu-button__clicked " : " ") + "menu-button"}>
                            <button onClick={this.onSidePanelToggle.bind(this)} className="slide-button">  <i class="right chevron icon"></i> </button>
                        </div>
                    </div>
                    )
            
                }
            }
            
export default SidePanel;