<template>
  <div class="userlist" :class="listClassName">
    <FilterItem />

    <div class="nodata" v-if="!filterItems.length">
      데이터가 없습니다.
    </div>

    <div class="list" v-if="filterItems.length">
      <ListBox v-if="!tableType" />
      <ListTable v-if="tableType" />
    </div>
  </div>
</template>

<script>
import FilterItem from '@/components/FilterItem';
import ListBox from '@/components/ListBox';
import ListTable from '@/components/ListTable';

export default {
  components: {
    FilterItem,
    ListBox,
    ListTable
  },
  data() {
    return {
      window: { width: 0, height: 0 }
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    imgType() {
      return this.$store.state.listType.img;
    },
    tableType() {
      return this.$store.state.listType.table;
    },
    collapsed() {
      return this.$store.state.listType.collapsed;
    },
    filterItems() {
      return this.$store.getters.filterItems;
    },
    listClassName() {
      let className = '';
      if (this.imgType) className = className + ' is-imgtype';
      if (this.collapsed) className = className + ' is-collapsed';
      return className;
    }
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      this.$store.commit('changeCollapsed', this.window.width < 769);
    }
  }
};
</script>
