import React from 'react';
import Chart from 'chart.js';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.ID);
    }

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div className="dashboard">
                Dashboard
            </div>
        )
    }
}

export default Dashboard;