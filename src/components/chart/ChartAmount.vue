<script>
import UtilColor from '@/assets/js/utilColor.js';
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  data() {
    return {
      gradient: []
    };
  },
  mounted() {
    this.setupGradient();
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
          data: this.mAmount(key),
          backgroundColor: this.gradient[colorIdx],
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
    mAmount(year) {
      const items = this.userItemsRange,
        data = [];

      for (let i = 0; i < 12; i++) {
        const resI = i + 1,
          diffYear = year.toString(),
          diffMonth = i < 9 ? '0' + resI : resI.toString();

        let result = 0;

        for (let k = 0; k < items.length; k++) {
          const year = items[k].date.substr(0, 4),
            month = items[k].date.substr(5, 2),
            price = parseInt(items[k].price);

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
        const color = UtilColor.hexToRgb(this.chartColor[i]);
        this.gradient[i] = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450);
        this.gradient[i].addColorStop(0, `rgba(${color}, 0.8)`);
        this.gradient[i].addColorStop(0.5, `rgba(${color}, 0.5)`);
        this.gradient[i].addColorStop(1, `rgba(${color}, 0)`);
      }
    }
  }
};
</script>
