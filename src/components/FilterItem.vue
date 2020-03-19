<template>
  <aside class="filter">
    <div class="item">
      <span class="t">테이블 타입</span>
      <label for="table" class="toggle">
        <input type="checkbox" id="table" v-model="tableType">
        <span class="toggle-slider"></span>
      </label>
    </div>
    <div class="item">
      <span class="t">정렬</span>
      <select v-model="sortType">
        <option v-for="item in sorts" :value="item.value" :key="item.value">{{ item.text }}</option>
      </select>
    </div>
    <div class="item" v-for="(active, menu, index) in menus" :key="menu">
      <span class="t" v-if="index === 0">분류</span>
      <span class="t" v-if="index === 1">연도</span>
      <div v-for="(options, filter) in filters" :key="filter">
        <span v-if="menu === filter">
          <button class="btn btn--sm" v-for="(active, option) in options" :key="option"
            :class="{ 'btn--em': active }"
            @click="setFilter(filter, option)">{{ option }}</button>
        </span>
      </div>
    </div>
    <div class="item">
      <span class="t">검색</span>
      <label class="a11y">제목 검색</label>
      <input type="text" v-model="searchTitle" placeholder="제목 검색">
      <label class="a11y">출연자 검색</label>
      <input type="text" v-model="searchActor" placeholder="출연자 검색">
      <label class="a11y">장소 검색</label>
      <input type="text" v-model="searchPlace" placeholder="장소 검색">
    </div>
    <div class="item">
      <input type="checkbox" id="c1" v-model="imgType">
      <label for="c1">포스터만 보기</label>
      <input type="checkbox" id="c2" v-model="watchingType">
      <label for="c2">관람예정작만 보기</label>
    </div>
    <div class="item">
      <button class="btn btn--em btn--block" @click="clearAllFilters">검색 초기화</button>
    </div>
    <button class="filter-toggle" @click="changeFilterCollapsed">
      <img src="@/assets/icon/left-arrow.svg" alt="">
    </button>
  </aside>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      newItems: this.$store.state.newItems,
      menus: { category: false, year: false },
      pageFilters: { category: {}, year: {} }
    };
  },
  beforeMount() {
    this.newItems.forEach(({ cate, datayear }, index) => {
      cate.split('/').forEach(el => {
        el = el.replace(/^\s+|\s+$/g, '');
        this.$set(this.pageFilters.category, el, false);
      });
      this.$set(this.pageFilters.year, datayear, false);
    });

    this.$store.commit('setupFilters', this.pageFilters);
  },
  computed: {
    filters() {
      return this.$store.state.filtering.filters;
    },
    imgType: {
      get() {
        return this.$store.state.filtering.imgType;
      },
      set(value) {
        this.$store.commit('changeImgType', value);
      }
    },
    tableType: {
      get() {
        return this.$store.state.filtering.tableType;
      },
      set(value) {
        this.$store.commit('changeTableType', value);
      }
    },
    watchingType: {
      get() {
        return this.$store.state.filtering.watchingType;
      },
      set(value) {
        this.$store.commit('changeWatchingType', value);
      }
    },
    sortType: {
      get() {
        return this.$store.state.filtering.sortType;
      },
      set(value) {
        this.$store.commit('changeSortType', value);
      }
    },
    sorts: {
      get() {
        return this.$store.state.filtering.sorts;
      },
      set(value) {
        this.$store.commit('changeSorts', value);
      }
    },
    searchTitle: {
      get() {
        return this.$store.state.filtering.search.title;
      },
      set(value) {
        this.$store.commit('changeSearchTitle', value);
      }
    },
    searchActor: {
      get() {
        return this.$store.state.filtering.search.actor;
      },
      set(value) {
        this.$store.commit('changeSearchActor', value);
      }
    },
    searchPlace: {
      get() {
        return this.$store.state.filtering.search.place;
      },
      set(value) {
        this.$store.commit('changeSearchPlace', value);
      }
    }
  },
  methods: {
    ...mapMutations(['changeFilterCollapsed']),
    ...mapMutations({
      changeFilterCollapsed: 'changeFilterCollapsed'
    }),
    setFilter(filter, option) {
      if (filter === 'category') {
        this.pageFilters[filter][option] = !this.pageFilters[filter][option];
      } else {
        setTimeout(() => {
          this.clearFilter(filter, option, this.pageFilters[filter][option]);
        }, 100);
      }

      setTimeout(() => {
        this.$store.commit('changeFilters', this.pageFilters);
      }, 200);
    },
    clearFilter(filter, except, active) {
      Object.keys(this.filters[filter]).forEach(option => {
        this.filters[filter][option] = (except === option && !active);
      });
    },
    clearAllFilters() {
      Object.keys(this.menus).forEach(this.clearFilter);
      this.$store.commit('clearAllFilters');
    }
  }
};
</script>
