import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
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
            twentythree: null,
            twentyfour: null,
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
                    var openParkings = parseInt(data.OpenParkings);
                    if (hour === 1) {
                        total1 += openParkings;
                        count1++;
                        this.setState({
                            one: (total1 / count1).toFixed(2)
                        })
                    }
                    if (hour === 2) {
                        total2 += openParkings;
                        count2++;
                        this.setState({
                            two: (total2 / count2).toFixed(2)
                        })
                    }
                    if (hour === 3) {
                        total3 += openParkings;
                        count3++;
                        this.setState({
                            three: (total3 / count3).toFixed(2)
                        })
                    }
                    if (hour === 4) {
                        total4 += openParkings;
                        count4++;
                        this.setState({
                            four: (total4 / count4).toFixed(2)
                        })
                    }
                    if (hour === 5) {
                        total5 += openParkings;
                        count5++;
                        this.setState({
                            five: (total5 / count5).toFixed(2)
                        })
                    }
                    if (hour === 6) {
                        total6 += openParkings;
                        count6++;
                        this.setState({
                            six: (total6 / count6).toFixed(2)
                        })
                    }
                    if (hour === 7) {
                        total7 += openParkings;
                        count7++;
                        this.setState({
                            seven: (total7 / count7).toFixed(2)
                        })
                    }
                    if (hour === 8) {
                        total8 += openParkings;
                        count8++;
                        this.setState({
                            eight: (total8 / count8).toFixed(2)
                        })
                    }
                    if (hour === 9) {
                        total9 += openParkings;
                        count9++;
                        this.setState({
                            nine: (total9 / count9).toFixed(2)
                        })
                    }
                    if (hour === 10) {
                        total10 += openParkings;
                        count10++;
                        this.setState({
                            ten: (total10 / count10).toFixed(2)
                        })
                    }
                    if (hour === 11) {
                        total11 += openParkings;
                        count11++;
                        this.setState({
                            eleven: (total11 / count11).toFixed(2)
                        })
                    }
                    if (hour === 12) {
                        total12 += openParkings;
                        count12++;
                        this.setState({
                            twelve: (total12 / count12).toFixed(2)
                        })
                    }
                    if (hour === 13) {
                        total13 += openParkings;
                        count13++;
                        this.setState({
                            thirteen: (total13 / count13).toFixed(2)
                        })
                    }
                    if (hour === 14) {
                        total14 += openParkings;
                        count14++;
                        this.setState({
                            fourteen: (total14 / count14).toFixed(2)
                        })
                    }
                    if (hour === 15) {
                        total15 += openParkings;
                        count15++;
                        this.setState({
                            fifteen: (total15 / count15).toFixed(2)
                        })
                    }
                    if (hour === 16) {
                        total16 += openParkings;
                        count16++;
                        this.setState({
                            sixteen: (total16 / count16).toFixed(2)
                        })
                    }
                    if (hour === 17) {
                        total17 += openParkings;
                        count17++;
                        this.setState({
                            seventeen: (total17 / count17).toFixed(2)
                        })
                    }
                    if (hour === 18) {
                        total18 += openParkings;
                        count18++;
                        this.setState({
                            eighteen: (total18 / count18).toFixed(2)
                        })
                    }
                    if (hour === 19) {
                        total19 += openParkings;
                        count19++;
                        this.setState({
                            nineteen: (total19 / count19).toFixed(2)
                        })
                    }
                    if (hour === 20) {
                        total20 += openParkings;
                        count20++;
                        this.setState({
                            twenty: (total20 / count20).toFixed(2)
                        })
                    }
                    if (hour === 21) {
                        total21 += openParkings;
                        count21++;
                        this.setState({
                            twentyone: (total21 / count21).toFixed(2)
                        })
                    }
                    if (hour === 22) {
                        total22 += openParkings;
                        count22++;
                        this.setState({
                            twentytwo: (total22 / count22).toFixed(2)
                        })  
                    }       
                    if (hour === 23) {
                        total23 += openParkings;
                        count23++;
                        this.setState({
                            twentythree: (total23 / count23).toFixed(2)
                        })
                    }
                    if (hour === 0) {
                        total24 += openParkings;
                        count24++;
                        this.setState({
                            twentyfour: (total24 / count24).toFixed(2)
                        })
                    }
                    return data;
                })
            })
    }

    render() {
        const data = (bar) => {
            const ctx = bar.getContext("2d")
            const gradientStroke = ctx.createLinearGradient(500, 0, 100, 400);
            gradientStroke.addColorStop(0, "#B1E9D3");
            gradientStroke.addColorStop(0.2, "#9DE3C8");
            gradientStroke.addColorStop(0.5, "#85DCBA");
            gradientStroke.addColorStop(1, "#6AB095");
            return {
                labels: this.state.labels,
                datasets: [
                    {
                        label: "Average Availability Per Hour",
                        backgroundColor: gradientStroke,
                        data: [
                            this.state.one, this.state.two, this.state.three, this.state.four, this.state.five, this.state.six, this.state.seven,
                            this.state.eight, this.state.nine, this.state.ten, this.state.eleven, this.state.twelve, this.state.thirteen, this.state.fourteen,
                            this.state.fifteen, this.state.sixteen, this.state.seventeen, this.state.eighteen, this.state.nineteen, this.state.twenty, this.state.twentyone,
                            this.state.twentytwo, this.state.twentythree, this.state.twentyfour]
                    }]
            }
        }

        return (
            <div className="dashboard">
                <Bar
                    id="myChart"
                    data={data}
                    options={{
                        legend: {
                            labels: {
                                fontColor: "#777"
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "#777",
                                    fontSize: 18,
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "#777",
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