<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  mounted() {
    this.renderChart(
      {
        labels: this.$store.state.weekNames,
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
    userItemsRange() {
      return this.$store.getters.userItemsRange;
    },
    chartOptions() {
      return this.$store.getters.chartOptions2;
    },
    chartColor() {
      return this.$store.getters.chartColor2;
    },
    viewingDay() {
      const items = this.userItemsRange,
        data = [];

      for (let i = 0; i < 7; i++) {
        let result = 0;

        items.forEach((el, k) => {
          const diffDay = new Date(items[k].date.replace(/\./g, '-')).getDay();

          if (i === diffDay) {
            result++;
          }
        });

        // 일요일은 0
        if (i === 0) {
          data[6] = result;
        } else {
          data[i - 1] = result;
        }
      }
      return data;
    }
  }
};
</script>
