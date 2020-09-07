<template>
  <div class="cont">
    <input type="number" min="2" v-model="turningLeast"> 회 이상 본 작품을
    <select v-model="turningOrder">
      <option v-for="(item, index) in orderby"
        :value="item.value" :key="index">
        {{ item.text }}
      </option>
    </select>
    으로 보여줍니다.
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderby: [
        {
          text: '날짜순',
          value: true
        }, {
          text: '관람순',
          value: false
        }
      ]
    };
  },
  computed: {
    turningLeast: {
      get() {
        return this.$store.state.turning.least;
      },
      set(value) {
        this.$store.commit('changeTurningLeast', value);
      }
    },
    turningOrder: {
      get() {
        return this.$store.state.turning.orderByDate;
      },
      set(value) {
        this.$store.commit('changeTurningOrderByDate', value);
      }
    }
  }
};
</script>
