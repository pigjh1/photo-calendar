<template>
  <div class="cont">
    <div class="colorset">
      <div class="item" v-for="(item, index) in chartColor" :key="index">
        <input type="radio" :id="'s-color' + index" :value="index" v-model="chartIndex" @change="changeChartColor(index)">
        <label :for="'s-color' + index">{{ index + 1}}</label>
        <span v-for="(options, filter) in item" :key="filter" :style="setStyle(options)">
          {{options}}
        </span>
      </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      chartIndex: this.$store.state.design.chartIndex,
      chartColor: this.$store.state.design.chartColor
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
