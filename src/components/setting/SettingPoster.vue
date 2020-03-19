<template>
  <div>
    <span class="item" v-for="(item, index) in type" :key="index" >
      <input type="radio" name="s-poster"
        :id="'s-poster' + index" :value="item.value"
        v-model="posterType"
        @change="changePost(item.value)">
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
        { text: '전체보기 (Defult)', value: '' },
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
        this.$store.commit('changePost', value);
      }
    }
  },
  methods: {
    ...mapMutations(['changePost']),
    ...mapMutations({
      changePost: 'changePost'
    })
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-right: 20px;
}
</style>
