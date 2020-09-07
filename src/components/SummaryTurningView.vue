<template>
  <div class="turningview-desc">
    <p class="p">
      <b><em>{{ itemsFirst.title }}</em></b>을
      {{ itemsFirst.date }}부터
      {{ itemsLast.date }}까지
      <em>{{ turningLen }}번</em> 관람하는데
      {{ totalPirce | formatNumberComma }}원을 지출하였습니다.
    </p>

    <SplitList className="borderbox" :textObj="actorAll" />

    <div v-if="memoHtml" class="textbox">
      <div v-html="memoHtml"></div>
    </div>
  </div>
</template>

<script>
import formatNumberComma from '@/assets/js/formatNumberComma.js';
import SplitList from '@/components/SplitList';

export default {
  filters: { formatNumberComma },
  components: {
    SplitList
  },
  computed: {
    items() {
      return this.$store.getters.turningItems;
    },
    turningLen() {
      return this.items.length;
    },
    itemsFirst() {
      return this.items[this.turningLen - 1];
    },
    itemsLast() {
      return this.items[0];
    },
    priceAll() {
      return this.items.map(({ price }) => {
        return typeof price !== 'undefined' && price !== null && price !== '' && price !== '-' ? price : 0;
      });
    },
    totalPirce() {
      return this.priceAll.reduce((a, b) => parseInt(a) + parseInt(b));
    },
    actorAll() {
      const items = this.items;
      let data = [], newdata = [];

      data = items.map(({ actor }) => {
        if (typeof actor !== 'undefined' && actor !== null && actor !== '') {
          return actor;
        }
      }).join('/').split('/');

      data.forEach(el => {
        el = el.replace(/^\s+|\s+$/g, '');
        if (el) newdata.push(el);
      });

      newdata = newdata.reduce((x, y) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});

      return Object.fromEntries(
        Object.entries(newdata).sort((a, b) => b[1] - a[1])
      );
    },
    memoHtml() {
      const memo = this.itemsLast.memo;
      return memo ? memo.split('\n').join('<br />') : memo;
    }
  }
};
</script>
