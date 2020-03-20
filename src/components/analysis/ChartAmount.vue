<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  data() {
    return {
      userdata: this.$store.state.userdata,
      gradient: []
    };
  },
  mounted() {
    this.setupGradient();
    this.renderChart(
      {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: this.datasets
      },
      this.chartOptions
    );
  },
  computed: {
    chartOptions() {
      return this.$store.getters.chartOptions1;
    },
    chartColor() {
      return this.$store.state.design.chartColor[this.$store.state.design.chartIndex];
    },
    datasets() {
      const userdata = this.userdata,
        newdata = [];
      let data = [], idx = 0;

      for (let i = 0; i < userdata.length; i++) {
        const date = userdata[i].date.substr(0, 4);
        data = data.concat(date);
      }

      data = data.reduce((x, y) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});

      for (const key in data) {
        const obj = {
          label: `${key}년`,
          data: this.mAmount(key),
          backgroundColor: this.gradient[idx]
        };
        newdata[idx] = obj;
        idx++;
      }

      return newdata;
    }
  },
  methods: {
    mAmount(year) {
      const userdata = this.userdata,
        data = [];

      for (let i = 0; i < 12; i++) {
        const resI = i + 1,
          diffYear = year.toString(),
          diffMonth = i < 9 ? '0' + resI : resI.toString();

        let result = 0;

        for (let k = 0; k < userdata.length; k++) {
          const year = userdata[k].date.replace('-', '').substr(0, 4),
            month = userdata[k].date.replace('-', '').substr(4, 2),
            price = parseInt(userdata[k].price);

          if (!isNaN(price) && year === diffYear && month === diffMonth) {
            result = result + price;
          }
        }

        data[i] = result;
      }
      return data;
    },
    setupGradient() {
      for (let i = 0; i < 10; i++) {
        const color = this.hexToRgb(this.chartColor[i]);
        this.gradient[i] = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
        this.gradient[i].addColorStop(0, `rgba(${color}, 0.8)`);
        this.gradient[i].addColorStop(0.5, `rgba(${color}, 0.5)`);
        this.gradient[i].addColorStop(1, `rgba(${color}, 0)`);
      }
    },
    hexToRgb(hexType) {
      let hex = hexType.replace('#', ''),
        value = hex.match(/[a-f\d]/gi);

      if (value.length === 3) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];

      value = hex.match(/[a-f\d]{2}/gi);

      return parseInt(value[0], 16) + ', ' + parseInt(value[1], 16) + ', ' + parseInt(value[2], 16);
    }
  }
};
</script>
