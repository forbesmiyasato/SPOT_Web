import React from 'react';

class SidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    onSidePanelToggle() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {

        if (this.state.show) {
            return (
                <div>
                    <button onClick={this.onSidePanelToggle.bind(this)} className="always-visible"> <h1 className="always-visible"> > </h1> </button>
                    <h1> 11111111111111 </h1>
                </div>
            )
        }
        else {
            return <button onClick={this.onSidePanelToggle.bind(this)} className="always-visible"> <h1 className="always-visible"> > </h1> </button>
        }
    }
}

export default SidePanel;