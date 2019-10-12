import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { HorizontalBar, Bar } from 'react-chartjs-2';

Chart.defaults.global.defaultFontColor = 'black';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.ID);
        this.state = {
            labels: ['1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM'],
            one: null,
            two: null,
            three: null,
            four: null,
            five: null,
            six: null,
            seven: null,
            eight: null,
            nine: null,
            ten: null,
            eleven: null,
            twelve: null,
            thirteen: null,
            fourteen: null,
            fifteen: null,
            sixteen: null,
            seventeen: null,
            eighteen: null,
            nineteen: null,
            twenty: null,
            twentyone: null,
            twentytwo: null,
            twentyfour: null,
            twentythree: null,
            hours: []
        }
    }

    componentDidMount() {
        var total1 = 0;
        var total2 = 0;
        var total3 = 0;
        var total4 = 0;
        var total5 = 0;
        var total6 = 0;
        var total7 = 0;
        var total8 = 0;
        var total9 = 0;
        var total10 = 0;
        var total11 = 0;
        var total12 = 0;
        var total13 = 0;
        var total14 = 0;
        var total15 = 0;
        var total16 = 0;
        var total17 = 0;
        var total18 = 0;
        var total19 = 0;
        var total20 = 0;
        var total21 = 0;
        var total22 = 0;
        var total23 = 0;
        var total24 = 0;

        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;
        var count5 = 0;
        var count6 = 0;
        var count7 = 0;
        var count8 = 0;
        var count9 = 0;
        var count10 = 0;
        var count11 = 0;
        var count12 = 0;
        var count13 = 0;
        var count14 = 0;
        var count15 = 0;
        var count16 = 0;
        var count17 = 0;
        var count18 = 0;
        var count19 = 0;
        var count20 = 0;
        var count21 = 0;
        var count22 = 0;
        var count23 = 0;
        var count24 = 0;
        var hour;
        axios.get(`http://localhost:5000/ParkingLot/${this.props.ID}/SnapShots/All`)
            .then(response => {
                response.data.map((data) => {
                    //convert data.timestamp from utc to local time (-7) then get the hour
                    var utcTime = data.timestamp;
                    hour = parseInt(utcTime.substring(11, 13)) - 7 < 0 ? parseInt(utcTime.substring(11, 13)) - 7 + 24 : parseInt(utcTime.substring(11, 13)) - 7;
                    console.log(hour);
                    console.log(data.timestamp);
                    console.log(count10);
                    console.log(total10);
                    console.log(this.state.ten);
                    if (hour === 1) {
                        total1 += data.OpenParkings;
                        count1++;
                        this.setState({
                            one: total1 / count1
                        })
                    }
                    if (hour === 2) {
                        total2 += data.OpenParkings;
                        count2++;
                        this.setState({
                            two: total2 / count2
                        })
                    }
                    if (hour === 3) {
                        total3 += data.OpenParkings;
                        count3++;
                        this.setState({
                            three: total3 / count3
                        })
                    }
                    if (hour === 4) {
                        total4 += data.OpenParkings;
                        count4++;
                        this.setState({
                            four: total4 / count4
                        })
                    }
                    if (hour === 5) {
                        total5 += data.OpenParkings;
                        count5++;
                        this.setState({
                            five: total5 / count5
                        })
                    }
                    if (hour === 6) {
                        total6 += data.OpenParkings;
                        count6++;
                        this.setState({
                            six: total6 / count6
                        })
                    }
                    if (hour === 7) {
                        total7 += data.OpenParkings;
                        count7++;
                        this.setState({
                            seven: total7 / count7
                        })
                    }
                    if (hour === 8) {
                        total8 += data.OpenParkings;
                        count8++;
                        this.setState({
                            eight: total8 / count8
                        })
                    }
                    if (hour === 9) {
                        total9 += data.OpenParkings;
                        count9++;
                        this.setState({
                            nine: total9 / count9
                        })
                    }
                    if (hour === 10) {
                        total10 += data.OpenParkings;
                        count10++;
                        this.setState({
                            ten: total10 / count10
                        })
                        console.log(total10);
                    }
                    if (hour === 11) {
                        total11 += data.OpenParkings;
                        count11++;
                        this.setState({
                            eleven: total11 / count11
                        })
                    }
                    if (hour === 12) {
                        total12 += data.OpenParkings;
                        count12++;
                        this.setState({
                            twelve: total12 / count12
                        })
                    }
                    if (hour === 13) {
                        total13 += data.OpenParkings;
                        count13++;
                        this.setState({
                            thirteen: total13 / count13
                        })
                    }
                    if (hour === 14) {
                        total14 += data.OpenParkings;
                        count14++;
                        this.setState({
                            fourteen: total14 / count14
                        })
                    }
                    if (hour === 15) {
                        total15 += data.OpenParkings;
                        count15++;
                        this.setState({
                            fifteen: total15 / count15
                        })
                    }
                    if (hour === 16) {
                        total16 += data.OpenParkings;
                        count16++;
                        this.setState({
                            sixteen: total16 / count16
                        })
                    }
                    if (hour === 17) {
                        total17 += data.OpenParkings;
                        count17++;
                        this.setState({
                            seventeen: total17 / count17
                        })
                    }
                    if (hour === 18) {
                        total18 += data.OpenParkings;
                        count18++;
                        this.setState({
                            eighteen: total18 / count18
                        })
                    }
                    if (hour === 19) {
                        total19 += data.OpenParkings;
                        count19++;
                        this.setState({
                            nineteen: total19 / count19
                        })
                    }
                    if (hour === 20) {
                        total20 += data.OpenParkings;
                        count20++;
                        this.setState({
                            twenty: total20 / count20
                        })
                    }
                    if (hour === 21) {
                        total21 += data.OpenParkings;
                        count21++;
                        this.setState({
                            twentyone: total21 / count21
                        })
                    }
                    if (hour === 22) {
                        total22 += data.OpenParkings;
                        count22++;
                        this.setState({
                            twentytwo: total22 / count22
                        })
                    }
                    if (hour === 23) {
                        total23 += data.OpenParkings;
                        count23++;
                        this.setState({
                            twentythree: total23 / count23
                        })
                    }
                    if (hour === 24) {
                        total24 += data.OpenParkings;
                        count24++;
                        this.setState({
                            twentyfour: total24 / count24
                        })
                    }
                })
            })
    }

    render() {
        return (
            <div className="dashboard">
                <Bar
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                label: "Average Availability Per Hour",
                                data: [
                                    this.state.one, this.state.two, this.state.three, this.state.four, this.state.five, this.state.six, this.state.seven,
                                    this.state.eight, this.state.nine, this.state.ten, this.state.eleven, this.state.twelve, this.state.thirteen, this.state.fourteen,
                                    this.state.fifteen, this.state.sixteen, this.state.seventeen, this.state.eighteen, this.state.nineteen, this.state.twenty, this.state.twentyone,
                                    this.state.twentytwo, this.state.twentythree, this.state.twentyfour]
                            }]
                    }}
                    options={{
                        legend: {
                            labels: {
                                fontColor: "black"
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "black",
                                    fontSize: 18,
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "black",
                                    fontSize: 14,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Dashboard;