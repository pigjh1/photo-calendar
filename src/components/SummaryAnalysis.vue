<template>
  <div>
    <p>
      <b><em>{{ firstYear }}년</em></b>부터
      <b>{{ totalTitle }}개</b> 작품을
      <b>{{ userItemsLen }}번</b> 관람하는데
      <u>{{ totalPirce | formatNumberComma }}원</u>을 지출하였습니다.
    </p>
  </div>
</template>

<script>
import formatNumberComma from '@/assets/js/formatNumberComma.js';

export default {
  data() {
    return {
      userItems: this.$store.state.userItems
    };
  },
  filters: { formatNumberComma },
  computed: {
    userItemsLen() {
      return this.$store.state.userItems.length;
    },
    firstYear() {
      const data = this.$store.state.userItems,
        d = data.sort((a, b) => a.date > b.date ? 1 : -1);

      return d[0].date.substr(0, 4);
    },
    titleAll() {
      return this.userItems.map(({ title }) => title);
    },
    priceAll() {
      return this.userItems.map(({ price }) => {
        return typeof price !== 'undefined' && price !== null && price !== '' && price !== '-' ? price : 0;
      });
    },
    totalTitle() {
      let data = this.titleAll;

      data = data.sort().reduce((a, b) => {
        if (!a.some(obj => obj === b)) {
          a.push(b);
        }
        return a;
      }, []);

      return data.length;
    },
    totalPirce() {
      return this.priceAll.reduce((a, b) => parseInt(a) + parseInt(b));
    }
  }
};
</script>
