<script>
import moment from 'moment'
import { Line } from 'vue-chartjs'

export default {
    extends: Line,
    data () {
        return {
            data_start_date: moment('22012020', 'DDMMYYYY'),
            data_end_date: moment('21032020', 'DDMMYYYY'),
            data_diffs: [0, 0, 0, 0, 1, 3, 0, 0, 1, 3, 2,
            2, 0, 0, 0, 1, 0, 1, 0, 2, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 10, 19, 2, 31, 51, 29, 37, 66, 220, 188,
            129, 241, 136, 281, 451, 837, 930, 910, 1210, 1477, 1985,
            3070, 2993, 4528, 2365],
            start_date: moment('04032020', 'DDMMYYYY'),
            end_date: moment('08052020', 'DDMMYYYY'),
            today: moment().startOf('day'),
            a: 3.43598447e+00,
            b: 5.00301472e-01,
            c: 5.79478593e+04,
        };
    },
    mounted () {
        this.renderChart({
            datasets: [
                {
                    label: 'Bisheriger Verlauf',
                    backgroundColor: 'rgb(253, 122, 171)',
                    borderColor: 'rgb(253, 122, 171)',
                    data: this.getHistoricData(),
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 3,
                }, {
                    label: 'Prognose',
                    backgroundColor: 'rgb(17, 20, 255)',
                    borderColor: 'rgb(17, 20, 255, 0)',
                    data: this.getModelData(),
                    pointRadius: 0,
                    borderWidth: 3,
                }
            ]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    type: 'time',
                    distribution: 'series',
                    ticks: {
                        major: {
                            enabled: true,
                            fontStyle: 'bold'
                        },
                        source: 'data',
                        autoSkip: true,
                        autoSkipPadding: 75,
                        maxRotation: 0,
                        sampleSize: 100
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        })
    },
	methods: {
        getHistoricData() {
            var data = [];
            var date = this.data_start_date;
            var i = 0;
            while (date <= this.data_end_date) {
                if (date >= this.start_date) {
                    data.push({t: date.valueOf(), y: this.data_diffs[i]});
                }
                date = date.clone().add(1, 'day');
                i = i + 1;
            }
            return data;
        },
        getModelData() {
            var data = [];
            var date = this.start_date;
            while (date < this.end_date) {
                data.push({t: date.valueOf(), y: this.model_differential(date)});
                date = date.clone().add(1, 'day');
            }
            return data;
        },
        // Logistic model
        model_cumulative(date) {
            let days_from_today = moment.duration(date.diff(this.today)).asDays();
            // Logistic
            return this.c / (1 + Math.exp(-(days_from_today - this.b) / this.a));
        },
        model_differential(date) {
            let days_from_today = moment.duration(date.diff(this.today)).asDays();
            return Math.exp(-(days_from_today-this.b)/this.a)*this.c/(this.a*(1+Math.exp(-(days_from_today-this.b)/this.a))**2 );
        },
	}
}
</script>
