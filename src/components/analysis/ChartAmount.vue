<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  data() {
    return {
      userdata: this.$store.state.userdata,
      gradient1: null,
      gradient2: null,
      gradient3: null
    };
  },
  mounted() {
    const bgColor1 = this.hexToRgb(this.chartColor[5]),
      bgColor2 = this.hexToRgb(this.chartColor[3]),
      bgColor3 = this.hexToRgb(this.chartColor[1]);

    this.gradient1 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
    this.gradient1.addColorStop(0, `rgba(${bgColor1}, 0.8)`);
    this.gradient1.addColorStop(0.5, `rgba(${bgColor1}, 0.5)`);
    this.gradient1.addColorStop(1, `rgba(${bgColor1}, 0)`);

    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
    this.gradient2.addColorStop(0, `rgba(${bgColor2}, 0.8)`);
    this.gradient2.addColorStop(0.5, `rgba(${bgColor2}, 0.5)`);
    this.gradient2.addColorStop(1, `rgba(${bgColor2}, 0)`);

    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
    this.gradient3.addColorStop(0, `rgba(${bgColor3}, 0.8)`);
    this.gradient3.addColorStop(0.5, `rgba(${bgColor3}, 0.5)`);
    this.gradient3.addColorStop(1, `rgba(${bgColor3}, 0)`);

    this.renderChart(
      {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [
          {
            label: '2018년',
            data: this.mAmount(2018),
            backgroundColor: this.gradient1
          },
          {
            label: '2019년',
            data: this.mAmount(2019),
            backgroundColor: this.gradient2
          },
          {
            label: '2020년',
            data: this.mAmount(2020),
            backgroundColor: this.gradient3
          }
        ]
      },
      this.chartOptions
    );
  },
  computed: {
    chartOptions() {
      return this.$store.getters.chartOptions1;
    },
    chartColor() {
      return this.$store.state.chartColor[this.$store.state.currentChartColor];
    }
  },
  methods: {
    hexToRgb(hexType) {
      let hex = hexType.replace('#', ''),
        value = hex.match(/[a-f\d]/gi);

      if (value.length === 3) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];

      value = hex.match(/[a-f\d]{2}/gi);

      return parseInt(value[0], 16) + ', ' + parseInt(value[1], 16) + ', ' + parseInt(value[2], 16);
    },
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
    }
  }
};
</script>
