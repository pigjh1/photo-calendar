<template>
  <div class="userview" :class="{ 'has-hero': hasheroImg }">
    <div class="bg" v-if="hasheroImg" role="presentation">
      <div class="bg-img" :style="'background-image:url(' + item.img + ')'"></div>
      <div class="bg-mask"></div>
    </div>
    <article class="l-wrap detail">
      <div class="detail-header">
        <img src="@/assets/noimage.png" alt="" v-if="!item.img">
        <img :src="item.img" alt="" v-if="item.img">
        <h2 class="h">{{ item.title }}</h2>
      </div>

      <div class="ticket">
        <div class="ticket-left">
          <div class="seatgrade">
            {{ item.seatgrade }}
          </div>
          <div class="tit">
            {{ item.title }}
          </div>
          <div class="barcode"></div>
        </div>
        <div class="ticket-right">
          <p class="seat">{{ item.seat }}</p>
          <dl>
            <dt>일시</dt>
            <dd>{{ item.date | formatDateFull }} {{ item.time }}</dd>
            <dt v-if="item.place">장소</dt>
            <dd v-if="item.place"><router-link :to="`/place/${ item.place }`">{{ item.place }}</router-link></dd>
            <dt v-if="item.price">가격</dt>
            <dd v-if="item.price">{{ item.price | formatNumberComma }}</dd>
            <dt v-if="item.office">예매처</dt>
            <dd v-if="item.office">{{ item.office }}</dd>
          </dl>
        </div>
      </div>

      <p v-if="item.pricesale">가격할인 : {{ item.pricesale }}</p>

      <SplitList className="borderbox" :textList="item.actor" v-if="item.actor" />

      <div v-if="item.memo" class="textbox">
        <div v-html="memoHtml"></div>
      </div>
    </article>
  </div>
</template>

<script>
import formatDateFull from '@/assets/js/formatDateFull.js';
import formatNumberComma from '@/assets/js/formatNumberComma.js';
import SplitList from '@/components/SplitList';

export default {
  props: {
    id: Number
  },
  components: {
    SplitList
  },
  filters: {
    formatDateFull,
    formatNumberComma
  },
  data() {
    return {
      userItems: this.$store.state.userItems
    };
  },
  computed: {
    item() {
      const arr = this.userItems.filter(a => parseInt(a.id) === parseInt(this.id));
      if (arr.length === 1) return arr[0];
      else return {};
    },
    memoHtml() {
      const memo = this.item.memo;
      return memo ? memo.split('\n').join('<br />') : memo;
    },
    hasheroImg() {
      const img = new Image();
      img.src = this.item.img;
      return img.width > 100;
    }
  }
};
</script>
