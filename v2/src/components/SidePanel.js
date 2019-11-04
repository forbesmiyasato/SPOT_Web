import React from 'react';
import AvailabilityChart from './AvailabilityChart';
import Dashboard from './Dashboard';

class SidePanel extends React.Component {

    render() {
        var showData = this.props.showData;
        return (
            <div className="menu">
                <div className={(this.props.showSidePanel ? "side-panel__show " : " ") + "side-panel always-visible"}>
                    <div className="ui relaxed divided list">
                        {this.props.Data.map((data, i) => {
                            return (<React.Fragment key={i}>
                                {this.props.showingList ?
                                    <div className={(this.props.showSidePanel ? "list-show " : " ") + "item"} onClick={this.props.onListItemClick.bind(this, data)}
                                        onMouseEnter={this.props.onHover.bind(this, data)} onMouseLeave={this.props.onLeave.bind(this, data)}
                                        style={(this.props.highlightedItem === data._id ? { backgroundColor: "#eaeaea" } : null )}>
                                        <img alt={data.Name} className="ui top aligned tiny image" src={data.Image} />
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
                            </React.Fragment>
                    )
                })}
                        {!this.props.showingList ?
                        <div className={(this.props.showSidePanel ? "list-show " : " ") + "item"}>
                            <div className="ui blue buttons">
                                <button className="ui labeled icon button" onClick={this.props.onBack.bind(this)}>
                                    <i className="left chevron icon"></i>
                                    Back
                                    </button>
                            </div>
                            <img alt={showData.Name} className="ui fluid image" src={showData.Image} />
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
                                        <i className="icon-basic-geolocalize-01" />
                                </button>
                            </div>
                            <Dashboard ID={showData._id} />
                            <AvailabilityChart key={showData._id} UnavailableParkings={showData.TotalParkings - showData.OpenParkings} OpenParkings={showData.OpenParkings} color="#777" />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
            <div className={(this.props.showSidePanel ? "menu-button__clicked " : " ") + "menu-button"}>
                <button onClick={this.props.onSidePanelToggle} className="slide-button">  <i className="right chevron icon"></i> </button>
            </div>
            </div >
        )

    }
}

export default SidePanel;