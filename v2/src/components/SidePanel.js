import React from 'react';

class SidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showList: this.props.Data
        }
        console.log(this.props.Data);
    }

    onSidePanelToggle() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
      
        return (
            <div className="menu">
                <div className={(this.state.show ? "side-panel__show " : " ") + "side-panel always-visible"}>
                        <ul>
                            {this.state.showList.map(data => {
                            return (
                                <li className={this.state.show ? "list-show" : " "}>
                                        {data.Name}
                             </li>
                                )
                            })}
                        </ul>
                </div>
                <div className="menu-button">
                    <button onClick={this.onSidePanelToggle.bind(this)} className="always-visible"> <h1 className="always-visible"> > </h1> </button>
                </div>
            </div>
        )

    }
}

export default SidePanel;