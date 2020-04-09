<template>
  <transition-group tag="div" name="list" class="listbox">
    <div class="item" v-for="item in filterItems" :key="item.id" :class="chkWatching(item.date)">
      <router-link :to="`/view/${ item.id }`">
        <span class="turn" v-if="isTurning || item.turning > 1">#{{ item.turning }}</span>

        <div class="img" v-if="!isTurning">
          <img src="@/assets/noimage.png" alt="" v-if="item.img === ''">
          <img :src="item.img" alt="" v-if="item.img !== ''">
        </div>

        <dl v-if="isTurning">
          <dt class="a11y">관람</dt>
          <dd>{{ item.date }} {{ item.time }}</dd>
          <dt class="a11y" v-if="item.actor">출연</dt>
          <dd v-if="item.actor">{{ item.actor }}</dd>
          <dt class="a11y" v-if="item.seat">좌석</dt>
          <dd v-if="item.seat">{{ item.seat }} {{ item.seatgrade }}</dd>
        </dl>

        <dl v-if="!isTurning">
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
  props: {
    listType: String
  },
  computed: {
    isTurning() {
      return this.listType === 'turning';
    },
    filterItems() {
      return this.isTurning
        ? this.$store.getters.turningItems
        : this.$store.getters.filterItems;
    }
  },
  methods: {
    chkWatching(val) {
      return new Date(val) > new Date() ? 'item--watching' : '';
    }
  }
};
</script>
