<template>
  <div>
    <div class="item" v-for="(item, index) in chartColor" :key="index" >
      <input type="radio" :id="'s-color' + index" :value="index" v-model="currentChartColor" @change="changeChartColor(index)">
      <label :for="'s-color' + index">{{ index + 1}}</label>
      <span v-for="(options, filter) in item" :key="filter" :style="setStyle(options)">
        {{options}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      currentChartColor: this.$store.state.currentChartColor,
      chartColor: this.$store.state.chartColor
    };
  },
  methods: {
    ...mapMutations(['changeChartColor']),
    ...mapMutations({
      changeChartColor: 'changeChartColor'
    }),
    setChecked(index) {
      return index === 0 ? 'checked' : '';
    },
    setStyle(val) {
      return `background-color: ${val}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 10px;
  label {
    display: inline-block;
    width: 20px;
  }
  span {
    display: inline-block;
    text-align: center;
    width: 40px;
    font-size: 10px;
    padding: 4px 10px;
  }
}
</style>
