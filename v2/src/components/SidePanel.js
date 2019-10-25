import React from 'react';

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
      
        return (
            <div className="menu">
                <div className={(this.state.show ? "side-panel__show " : " ") + "side-panel always-visible"}>
                        <div className="ui relaxed divided list">
                            {this.state.showList.map(data => {
                            return (
                                <div className={(this.state.show ? "list-show " : " ") + "item"} onClick={this.props.onListItemClick.bind(this, data.Lat, data.Lng)}>
                                    <img className="ui top aligned tiny image" src={data.Image}/>
                                    <div className="content">
                                        <div className="header">
                                            {data.Name}
                                        </div>
                                    </div>
                             </div>
                                )
                            })}
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