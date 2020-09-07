<template>
  <transition-group tag="div" name="list" class="listbox">
    <div class="item" v-for="item in filterItems" :key="item.id" :class="chkWatching(item.date)">
      <router-link :to="`/view/${ item.id }`">
        <span class="turn" v-if="isTurning || item.turning > 1">#{{ item.turning }}</span>

        <div class="img" v-if="!isTurning">
          <img src="@/assets/noimage.png" alt="" v-if="!item.img">
          <img :src="item.img" alt="" v-if="item.img">
        </div>

        <div class="dday" v-if="dday(item.date) > 0">D-{{ dday(item.date )}}</div>

        <dl v-if="isTurning">
          <dt class="a11y">관람</dt>
          <dd>{{ item.date | formatDateFull }} {{ item.time }}</dd>
          <dt class="a11y" v-if="item.actor">출연</dt>
          <dd v-if="item.actor"><SplitList :textList="item.actor" /></dd>
          <dt class="a11y" v-if="item.seat">좌석</dt>
          <dd v-if="item.seat">{{ item.seat }} {{ item.seatgrade }}</dd>
        </dl>

        <dl v-if="!isTurning">
          <dt class="a11y">제목</dt>
          <dd class="h">{{ item.title }}</dd>
          <dt>관람</dt>
          <dd>{{ item.date | formatDateFull }} {{ item.time }}</dd>
          <dt v-if="item.place">장소</dt>
          <dd v-if="item.place"><router-link :to="`/place/${ item.place }`">{{ item.place }}</router-link></dd>
        </dl>
      </router-link>
    </div>
  </transition-group>
</template>

<script>
import formatDateFull from '@/assets/js/formatDateFull.js';
import SplitList from '@/components/SplitList';

export default {
  props: {
    listType: String
  },
  components: {
    SplitList
  },
  filters: {
    formatDateFull
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
    chkWatching(value) {
      const newdate = new Date(value.replace(/\./g, '-'));
      return newdate > new Date() ? 'item--watching' : '';
    },
    dday(value) {
      const newdate = new Date(value.replace(/\./g, '-')),
        gap = new Date().getTime() - new Date(newdate).getTime();
      return Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
    }
  }
};
</script>
