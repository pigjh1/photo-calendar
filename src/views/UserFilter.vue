<template>
  <div class="userfilter">
    <router-link to="/list" class="btn btn--sm">목록으로</router-link>
    <div class="l-wrap">
      <FilterItem />
    </div>
  </div>
</template>

<script>
import FilterItem from '@/components/FilterItem';

export default {
  components: {
    FilterItem
  }
};
</script>
