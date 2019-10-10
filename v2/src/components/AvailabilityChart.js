
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js';



class AvailabilityChart extends Component {
    constructor(props) {

        super(props);
        var openParkings = parseInt(this.props.OpenParkings);
        var unavailableParkings = parseInt(this.props.UnavailableParkings);
        var totalParkings = openParkings + unavailableParkings;
        var percent = openParkings / totalParkings;
        var display = percent.toString() + "%";

        this.state = {
            labels: ['Open Parking', 'UnavailableParkings'],
            datasets: [{
                data: [this.props.OpenParkings, this.props.UnavailableParkings],
                backgroundColor: ['green', 'red'],

            }],
            text: display
        }
        var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
        Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
            draw: function () {
                originalDoughnutDraw.apply(this, arguments);

                var chart = this.chart;
                var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;

                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";

                var sum = 0;
                for (var i = 0; i < chart.config.data.datasets[0].data.length; i++) {
                    sum += chart.config.data.datasets[0].data[i];
                }

                var text = chart.config.data.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        });
    }
    render() {
        return (
            <div>
                <Doughnut
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets,
                        text: this.state.text
                    }}
                />
            </div>
        )
    }

}

export default AvailabilityChart;