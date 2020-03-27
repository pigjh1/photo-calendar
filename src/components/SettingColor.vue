<template>
  <div class="colorset">
    <button v-for="(item, index) in type" :key="index"
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
        { text: 'Creamy Peach' },
        { text: 'Rosy Highlight' },
        { text: 'Soft Blue' },
        { text: 'Brewed Mustard' },
        { text: 'Old Geranium' },
        { text: 'Sawtooth Aak' },
        { text: 'Summertime' },
        { text: 'Cornflower' },
        { text: 'Tigerlily' },
        { text: 'Deep Rose' },
        { text: 'Purple Mountain Majesty' },
        { text: 'Rogue Pink' },
        { text: 'Squeaky' },
        { text: 'Apple Valley' },
        { text: 'Pencil Lead' },
        { text: 'Purple Corallite' },
        { text: 'Flamingo Pink' },
        { text: 'Blue Curacao' },
        { text: 'Porcelain Rose' },
        { text: 'Biscay' }
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
