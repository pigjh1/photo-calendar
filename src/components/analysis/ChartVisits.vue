<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data() {
    return {
      userdata: this.$store.state.userdata
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [
          {
            label: '2018년',
            data: this.mVisits(2018),
            backgroundColor: this.chartColor[4]
          },
          {
            label: '2019년',
            data: this.mVisits(2019),
            backgroundColor: this.chartColor[2]
          },
          {
            label: '2020년',
            data: this.mVisits(2020),
            backgroundColor: this.chartColor[0]
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
      return this.$store.state.design.chartColor[this.$store.state.design.chartIndex];
    }
  },
  methods: {
    mVisits(year) {
      const userdata = this.userdata,
        data = [];

      for (let i = 0; i < 12; i++) {
        const resI = i + 1,
          diffYear = year.toString(),
          diffMonth = i < 9 ? '0' + resI : resI.toString();

        let result = 0;

        for (let k = 0; k < userdata.length; k++) {
          const year = userdata[k].date.replace('-', '').substr(0, 4),
            month = userdata[k].date.replace('-', '').substr(4, 2);

          if (year === diffYear && month === diffMonth) {
            result++;
          }
        }

        data[i] = result;
      }
      return data;
    }
  }
};
</script>
