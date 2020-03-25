<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data() {
    return {
      userdata: this.$store.getters.sortItems
    };
  },
  mounted() {
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
      return this.$store.getters.chartColor1;
    },
    datas() {
      const userdata = this.userdata;
      let data = [];

      for (let i = 0; i < userdata.length; i++) {
        const date = userdata[i].date.substr(0, 4);
        data = data.concat(date);
      }

      data = data.reduce((x, y) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});

      return data;
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
          backgroundColor: this.chartColor[colorIdx]
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
