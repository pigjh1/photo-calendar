<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  data() {
    return {
      userdata: this.$store.state.userdata
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
          {
            data: this.viewingDay,
            backgroundColor: this.chartColor
          }
        ]
      },
      this.chartOptions
    );
  },
  computed: {
    chartOptions() {
      return this.$store.getters.chartOptions2;
    },
    viewingDay() {
      const userdata = this.userdata,
        data = [];

      for (let i = 0; i < 7; i++) {
        let result = 0;

        for (let k = 0; k < userdata.length; k++) {
          const diffDay = new Date(userdata[k].date).getDay();

          if (i === diffDay) {
            result++;
          }
        }

        // 일요일은 0
        if (i === 0) {
          data[6] = result;
        } else {
          data[i - 1] = result;
        }
      }
      return data;
    },
    chartColor() {
      return this.$store.state.chartColor[this.$store.state.currentChartColor];
    }
  }
};
</script>
