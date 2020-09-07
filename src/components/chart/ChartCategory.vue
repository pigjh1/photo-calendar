<script>
import { PolarArea } from 'vue-chartjs';

export default {
  extends: PolarArea,
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            data: this.datasets,
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
    labels() {
      let arr = [];
      this.userItemsRange.forEach(({ cate }) => {
        cate.split('/').forEach(el => {
          el = el.replace(/^\s+|\s+$/g, '');
          arr.push(el);
        });
      });
      arr = arr.reduce((a, b) => {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);
      return arr;
    },
    datasets() {
      const items = this.userItemsRange,
        data = [];

      this.labels.forEach((el, i) => {
        let result = 0;

        items.forEach((el, k) => {
          if (items[k].cate.includes(this.labels[i])) {
            result++;
          }
        });

        data[i] = result;
      });
      return data;
    }
  }
};
</script>
