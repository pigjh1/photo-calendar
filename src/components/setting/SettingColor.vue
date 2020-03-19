<template>
  <div class="colorset">
    <button class="item" v-for="(item, index) in type" :key="index"
      :class="{ 'is-active': index === color }"
      @click="changePrimaryColor(index)">
      {{ item.text }}
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      type: [
        { text: 'Red' },
        { text: 'Pink' },
        { text: 'Purple' },
        { text: 'Deep Purple' },
        { text: 'Indigo' },
        { text: 'Blue' },
        { text: 'Light Blue' },
        { text: 'Cyan' },
        { text: 'Teal' },
        { text: 'Green' },
        { text: 'Light Green' },
        { text: 'Lime' },
        { text: 'Yellow' },
        { text: 'Amber' }
      ]
    };
  },
  computed: {
    color() {
      return this.$store.state.design.primaryColor;
    }
  },
  methods: {
    ...mapMutations(['changePrimaryColor']),
    ...mapMutations({
      changePrimaryColor: 'changePrimaryColor'
    })
  }
};
</script>
