<template>
  <transition-group tag="div" name="list" class="box">
    <div class="item" v-for="item in filterItems" :key="item.id" :class="chkWatching(item.date)">
      <router-link :to="`/view/${ item.id }`">
        <img src="@/assets/noimage.png" alt="" v-if="item.img === ''">
        <img :src="item.img" :alt="item.title" v-if="item.img !== ''">
        <p class="h">{{ item.title }}</p>
        <dl>
          <dt>관람</dt>
          <dd>{{ item.date }}</dd>
          <dt v-if="item.place">장소</dt>
          <dd v-if="item.place">{{ item.place }}</dd>
        </dl>
      </router-link>
    </div>
  </transition-group>
</template>

<script>
export default {
  computed: {
    filterItems() {
      return this.$store.getters.filterItems;
    }
  },
  methods: {
    chkWatching(val) {
      const valData = new Date(val);
      return valData > this.$store.state.today ? 'item--watching' : '';
    }
  }
};
</script>
