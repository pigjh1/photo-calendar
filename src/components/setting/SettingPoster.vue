<template>
  <div class="cont">
    <span class="item" v-for="(item, index) in type" :key="index">
      <input type="radio" name="s-poster"
        :id="'s-poster' + index" :value="item.value"
        v-model="posterType"
        @change="changePoster(item.value)">
      <label :for="'s-poster' + index">{{ item.text }}</label>
    </span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      type: [
        { text: '전체보기', value: '' },
        { text: '세로보기', value: 'vertical' },
        { text: '가로보기', value: 'horizontal' }
      ]
    };
  },
  computed: {
    posterType: {
      get() {
        return this.$store.state.design.posterType;
      },
      set(value) {
        this.$store.commit('changePoster', value);
      }
    }
  },
  methods: {
    ...mapMutations(['changePoster']),
    ...mapMutations({
      changePoster: 'changePoster'
    })
  }
};
</script>
