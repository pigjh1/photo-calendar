<template>
  <div>
    <span class="item" v-for="(item, index) in type" :key="index" >
      <input type="radio" name="s-poster"
        :id="'s-poster' + index" :value="item.value"
        v-model="currentPosterType"
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
        { text: '세로', value: 'vertical' },
        { text: '가로', value: 'horizontal' }
      ]
    };
  },
  computed: {
    currentPosterType: {
      get() {
        return this.$store.state.currentPosterType;
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
