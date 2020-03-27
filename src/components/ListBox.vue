<template>
  <transition-group tag="div" name="list" class="listbox">
    <div class="item" v-for="item in filterItems" :key="item.id" :class="chkWatching(item.date)">
      <router-link :to="`/view/${ item.id }`">
        <span class="turn" v-if="item.turning > 1">#{{ item.turning }}</span>
        <img src="@/assets/noimage.png" alt="" v-if="item.img === ''">
        <img :src="item.img" :alt="item.title" v-if="item.img !== ''">
        <dl>
          <dt class="a11y">제목</dt>
          <dd class="h">{{ item.title }}</dd>
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
      return new Date(val) > new Date() ? 'item--watching' : '';
    }
  }
};
</script>
