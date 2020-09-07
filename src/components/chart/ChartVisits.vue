<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: this.$store.state.monthNames,
        datasets: this.datasets
      },
      this.chartOptions
    );
  },
  computed: {
    userItemsRange() {
      return this.$store.getters.userItemsRange;
    },
    chartOptions() {
      return this.$store.getters.chartOptions1;
    },
    chartColor() {
      return this.$store.getters.chartColor1;
    },
    datas() {
      return this.userItemsRange.map(({ date }) => {
        return date.substr(0, 4);
      }).reduce((x, y) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});
    },
    datasets() {
      const data = this.datas,
        dataLen = Object.keys(data).length,
        newdata = [];
      let idx = 0, colorIdx = 0;

      for (const key in data) {
        newdata[idx] = {
          label: `${key}년`,
          data: this.mVisits(key),
          backgroundColor: this.chartColor[colorIdx],
          hidden: !(idx === dataLen - 1)
        };
        idx++;
        colorIdx = dataLen > 5 ? colorIdx + 1 : colorIdx + 2;
        colorIdx = colorIdx > 9 ? colorIdx - 10 : colorIdx;
      }

      return newdata;
    }
  },
  methods: {
    mVisits(year) {
      const items = this.userItemsRange,
        data = [];

      for (let i = 0; i < 12; i++) {
        const resI = i + 1,
          diffYear = year.toString(),
          diffMonth = i < 9 ? '0' + resI : resI.toString();

        let result = 0;

        items.forEach((el, k) => {
          const year = items[k].date.substr(0, 4),
            month = items[k].date.substr(5, 2);

          if (year === diffYear && month === diffMonth) {
            result++;
          }
        });

        data[i] = result;
      }
      return data;
    }
  }
};
</script>
