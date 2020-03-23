<template>
  <div class="userlist" :class="listClassName">
    <filter-item />

    <div class="nodata" v-if="!filterItems.length">
      <img src="@/assets/icon/smileys/expressions.svg" alt="" >
      데이터가 없습니다.
    </div>

    <div class="list" v-if="filterItems.length">
      <list-box v-if="!tableType" />
      <Table v-if="tableType" />
    </div>
  </div>
</template>

<script>
import FilterItem from '@/components/list/FilterItem';
import ListBox from '@/components/list/ListBox';
import Table from '@/components/list/Table';

export default {
  components: {
    FilterItem,
    ListBox,
    Table
  },
  data() {
    return {
      window: { width: 0, height: 0 }
    };
  },
  beforeMount() {
    this.$store.commit('setupItem', this.userItems);
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    sortItems() {
      return this.$store.getters.sortItems;
    },
    filterItems() {
      return this.$store.getters.filterItems;
    },
    imgType() {
      return this.$store.state.listType.img;
    },
    tableType() {
      return this.$store.state.listType.table;
    },
    collapsed() {
      return this.$store.state.listType.collapsed;
    },
    listClassName() {
      let className = '';
      if (this.imgType) className = className + 'is-imgtype';
      if (this.collapsed) className = className + 'is-collapsed';
      return className;
    },
    userItems() {
      const turning = this.turningItems;

      return this.sortItems.map((obj) => {
        const newObj = {};

        newObj.id = obj.id;
        newObj.img = obj.img;
        newObj.cate = obj.cate;
        newObj.title = obj.title;
        newObj.date = obj.date;
        newObj.time = obj.time;
        newObj.actor = obj.actor;
        newObj.place = obj.place;
        newObj.price = obj.price;
        newObj.office = obj.office;
        newObj.datayear = obj.date.replace('-', '').substr(0, 4);

        for (const key in turning) {
          if (key === obj.title) {
            newObj.turning = turning[key];
            turning[key]--;
          }
        }
        return newObj;
      });
    },
    turningItems() {
      const sortItems = this.sortItems;
      let data = [], newdata = [];

      for (let i = 0; i < sortItems.length; i++) {
        const title = sortItems[i].title;

        data = data.concat(title);
      }

      data.forEach(el => {
        el = el.replace(/^\s+|\s+$/g, '');
        newdata.push(el);
      });

      newdata = newdata.sort().reduce((x, y) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});

      return newdata;
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
