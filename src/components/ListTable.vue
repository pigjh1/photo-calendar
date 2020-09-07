<template>
  <div class="table-wrap">
    <table class="table">
      <caption class="a11y">작품 목록</caption>
      <colgroup>
        <col class="table-cell-1of7">
        <col class="table-cell-1of6">
        <col>
        <col class="table-cell-1of6">
        <col class="table-cell-1of8">
      </colgroup>
      <thead>
        <tr>
          <th>제목</th>
          <th>관람</th>
          <th>출연</th>
          <th>장소</th>
          <th>가격</th>
        </tr>
      </thead>
      <tbody>
        <tr class="item" v-for="item in filterItems" :key="item.id">
          <td><router-link :to="`/view/${ item.id }`">{{ item.title }}</router-link></td>
          <td>{{ item.date | formatDateFull }} {{ item.time }}</td>
          <td><SplitList :textList="item.actor" /></td>
          <td><router-link :to="`/place/${ item.place }`">{{ item.place }}</router-link></td>
          <td>{{ item.price | formatNumberComma }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import formatDateFull from '@/assets/js/formatDateFull.js';
import formatNumberComma from '@/assets/js/formatNumberComma.js';
import SplitList from '@/components/SplitList';

export default {
  computed: {
    filterItems() {
      return this.$store.getters.filterItems;
    }
  },
  components: {
    SplitList
  },
  filters: {
    formatDateFull,
    formatNumberComma
  }
};
</script>
