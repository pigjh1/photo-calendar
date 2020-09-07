<template>
  <div class="cont">
    <input type="date" v-model="rangeFrom"> 부터
    <input type="date" v-model="rangeTo"> 까지
  </div>
</template>

<script>
export default {
  computed: {
    rangeFrom: {
      get() {
        return this.$store.state.analysis.rangeFrom;
      },
      set(value) {
        this.$store.commit('changeAnalysisRangeFrom', value);
      }
    },
    rangeTo: {
      get() {
        return this.$store.state.analysis.rangeTo;
      },
      set(value) {
        this.$store.commit('changeAnalysisRangeTo', value);
      }
    }
  }
};
</script>
