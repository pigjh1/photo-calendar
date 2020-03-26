<template>
  <div class="userview" :class="{ 'has-hero': hasheroImg }">
    <div class="bg" v-if="hasheroImg" role="presentation">
      <div class="bg-img" :style="'background-image:url(' + item.img + ')'"></div>
      <div class="bg-mask"></div>
    </div>
    <article class="detail">
      <div class="detail-header">
        <img src="@/assets/noimage.png" alt="" v-if="item.img === ''">
        <img :src="item.img" alt="" v-if="item.img !== ''">
        <h2 class="h">{{ item.title }}</h2>
      </div>

      <dl>
        <dt>관람</dt>
        <dd>{{ item.date }} {{ item.time }}</dd>
        <dt v-if="item.cate">분류</dt>
        <dd v-if="item.cate">{{ item.cate }}</dd>
        <dt v-if="item.actor">출연</dt>
        <dd v-if="item.actor">{{ item.actor }}</dd>
        <dt v-if="item.place">장소</dt>
        <dd v-if="item.place">{{ item.place }}</dd>
        <dt v-if="item.price">가격</dt>
        <dd v-if="item.price">{{ item.price | formatNumberComma }}</dd>
        <dt v-if="item.seat">좌석</dt>
        <dd v-if="item.seat">{{ item.seat }} {{ item.seatgrade }}</dd>
        <dt v-if="item.office">예매처</dt>
        <dd v-if="item.office">{{ item.office }}</dd>
      </dl>

      <div v-if="item.memo" class="textbox">
        <div v-html="memoHtml"></div>
      </div>
    </article>
  </div>
</template>

<script>
import formatNumberComma from '@/assets/js/formatNumberComma.js';

export default {
  props: {
    id: Number
  },
  filters: { formatNumberComma },
  data() {
    return {
      userdata: this.$store.state.userdata
    };
  },
  computed: {
    item() {
      const arr = this.userdata.filter(a => parseInt(a.id) === parseInt(this.id));
      if (arr.length === 1) return arr[0];
      else return {};
    },
    memoHtml() {
      return this.item.memo.split('\n').join('<br />');
    },
    hasheroImg() {
      const img = new Image();
      img.src = this.item.img;
      return img.width > 100;
    }
  }
};
</script>
