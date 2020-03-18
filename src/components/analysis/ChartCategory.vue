<script>
import { PolarArea } from 'vue-chartjs';

export default {
  extends: PolarArea,
  data() {
    return {
      userdata: this.$store.state.userdata
    };
  },
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
    chartOptions() {
      return this.$store.getters.chartOptions2;
    },
    labels() {
      let temp = [];
      this.userdata.forEach(({ cate }) => {
        temp.push(cate);
      });
      temp = temp.reduce((a, b) => {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
      }, []);
      return temp;
    },
    datasets() {
      const userdata = this.userdata,
        data = [];

      for (let i = 0; i < this.labels.length; i++) {
        let result = 0;

        for (let k = 0; k < userdata.length; k++) {
          if (this.labels[i] === userdata[k].cate) {
            result++;
          }
        }

        data[i] = result;
      }

      return data;
    },
    chartColor() {
      return this.$store.state.chartColor[this.$store.state.currentChartColor];
    }
  }
};
</script>
