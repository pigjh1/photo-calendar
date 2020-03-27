<template>
  <div>
    <select v-model="selectedFont">
      <option v-for="(item, index) in fontList"
        :value="item.text" :key="index">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontList: [
        { text: 'Nanum Gothic', value: 'nanum-gothic' },
        { text: 'Nanum Myeongjo', value: 'nanum-myeongjo' },
        { text: 'Nanum Pen Script', value: 'nanum-pen-script' },
        { text: 'Cute Font', value: 'cute-font' },
        { text: 'Poor Story', value: 'poor-story' },
        { text: 'Hi Melody', value: 'hi-melody' }
      ]
    };
  },
  computed: {
    selectedFont: {
      get() {
        return this.$store.state.design.fontFamily;
      },
      set(value) {
        this.$store.commit('changeFontFamily', value);
      }
    }
  }
};
</script>
