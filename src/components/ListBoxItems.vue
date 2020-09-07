<template>
  <div class="listbox">
    <div class="item" v-for="item in filterItems" :key="item.id">
      <dl class="is-flex">
        <dt>제목</dt>
        <dd><router-link :to="`/view/${ item.id }`">{{ item.title }}</router-link></dd>
        <dt>관람</dt>
        <dd>{{ item.date | formatDateFull }} {{ item.time }}</dd>
        <dt>출연</dt>
        <dd><SplitList :textList="item.actor" /></dd>
        <dt>장소</dt>
        <dd><router-link :to="`/place/${ item.place }`">{{ item.place }}</router-link></dd>
      </dl>
    </div>
  </div>
</template>

<script>
import formatDateFull from '@/assets/js/formatDateFull.js';
import SplitList from '@/components/SplitList';

export default {
  props: {
    filterItems: Array
  },
  components: {
    SplitList
  },
  filters: {
    formatDateFull
  }
};
</script>
