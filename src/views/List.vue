<template>
  <div class="userlist" :class="listClassName">
    <aside class="filter">
      <div class="item">
        <span class="t">테이블 타입</span>
        <label for="table" class="toggle">
          <input type="checkbox" id="table" v-model="filtering.tableType">
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="item">
        <span class="t">정렬</span>
        <select v-model="filtering.sortType">
          <option v-for="item in filtering.sorts" :value="item.value" :key="item.value">{{ item.text }}</option>
        </select>
      </div>
      <div class="item" v-for="(active, menu, index) in filtering.menus" :key="menu">
        <span class="t" v-if="index === 0">분류</span>
        <span class="t" v-if="index === 1">연도</span>
        <div v-for="(options, filter) in filtering.filters" :key="filter">
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
        <input type="text" v-model="filtering.search.title" placeholder="제목 검색">
        <label class="a11y">출연자 검색</label>
        <input type="text" v-model="filtering.search.actor" placeholder="출연자 검색">
        <label class="a11y">장소 검색</label>
        <input type="text" v-model="filtering.search.place" placeholder="장소 검색">
      </div>
      <div class="item">
        <input type="checkbox" id="c1" v-model="filtering.imgType">
        <label for="c1">포스터만 보기</label>
        <input type="checkbox" id="c2" v-model="filtering.watchingType">
        <label for="c2">관람예정작만 보기</label>
      </div>
      <div class="item">
        <button class="btn btn--em btn--block" @click="clearAllFilters">검색 초기화</button>
      </div>
      <button class="filter-toggle" @click="changeFilterCollapsed">
        <img src="@/assets/icon/left-arrow.svg" alt="">
      </button>
    </aside>

    <div class="nodata" v-if="!filterItems.length">
      <img src="@/assets/icon/smileys/expressions.svg" alt="" >
      데이터가 없습니다.
    </div>

    <div class="list" v-if="filterItems.length">
      <div class="box" v-if="!filtering.tableType">
        <div class="item" v-for="(item, index) in filterItems" :key="index" :class="chkWatching(item.date)">
          <router-link :to="`/view/${ item.id }`">
            <img src="@/assets/noimage.png" alt="" v-if="item.img === ''">
            <img :src="item.img" :alt="item.title" v-if="item.img !== ''">
            <p class="h">{{ item.title }}</p>
            <dl>
              <dt>관람</dt>
              <dd>{{ item.date }}</dd>
              <dt v-if="item.place">장소</dt>
              <dd v-if="item.place">{{ item.place }}</dd>
            </dl>
          </router-link>
        </div>
      </div>

      <table class="table" v-else>
        <colgroup>
          <col class="table-cell-1of8">
          <col class="table-cell-1of4">
          <col class="table-cell-1of10">
          <col>
          <col class="table-cell-1of8">
          <col class="table-cell-1of10">
        </colgroup>
        <thead>
          <tr>
            <th>분류</th>
            <th>제목</th>
            <th>관람</th>
            <th>출연</th>
            <th>장소</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="(item, index) in filterItems" :key="index">
            <td>{{ item.cate }}</td>
            <td> <router-link :to="`/view/${ item.id }`">{{ item.title }}</router-link></td>
            <td>{{ item.date }} {{ item.time }}</td>
            <td>{{ item.actor }}</td>
            <td>{{ item.place }}</td>
            <td>{{ priceComma(item.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userdata: this.$store.state.userdata,
      today: new Date(),
      window: { width: 0, height: 0 },
      filtering: {
        imgType: false,
        tableType: false,
        watchingType: false,
        sortType: 'date',
        sorts: [
          { text: '관람일', value: 'date' },
          { text: '제목', value: 'title' },
          { text: '장소', value: 'place' },
          { text: '가격', value: 'price' }
        ],
        search: { title: '', actor: '', place: '' },
        filters: { category: {}, year: {} },
        menus: { category: false, year: false },
        filterCollapsed: false
      }
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  beforeMount() {
    this.newItems.forEach(({ cate, datayear }, index) => {
      cate.split('/').forEach(el => {
        el = el.replace(/^\s+|\s+$/g, '');
        this.$set(this.filtering.filters.category, el, false);
      });
      this.$set(this.filtering.filters.year, datayear, false);
    });
  },
  computed: {
    newItems() {
      return this.userdata.map((obj) => {
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

        return newObj;
      });
    },
    filterItems() {
      const { category, year } = this.activeFilters;
      let items = this.newItems;

      // 정렬
      items = items.sort((a, b) => {
        switch (this.filtering.sortType) {
        case 'title':
          return a.title > b.title ? 1 : -1;
        case 'place':
          return a.place > b.place ? 1 : -1;
        case 'price':
          if (b.price) {
            return b.price - a.price;
          } else {
            return -1;
          }
        default:
          return a.date > b.date ? -1 : 1;
        }
      });

      // 분류
      items = items.filter(({ cate, datayear }) => {
        if (category.length) {
          if (cate.includes('/')) {
            let st = true;
            for (const key in category) {
              if (st) {
                st = !~cate.indexOf(category[key]);
              }
              return !st;
            }
          } else {
            if (!~category.indexOf(cate)) return false;
          }
        }
        return (
          !year.length || year.every(cat => ~datayear.indexOf(cat))
        );
      });

      // 검색어
      if (this.filtering.search.title) {
        items = items.filter(obj => {
          return obj.title.toLowerCase().includes(this.filtering.search.title.toLowerCase());
        });
      }

      if (this.filtering.search.actor) {
        items = items.filter(obj => {
          const item = obj.actor;

          if (typeof item !== 'undefined' && item !== null && item !== '') {
            return item.toLowerCase().includes(this.filtering.search.actor.toLowerCase());
          } else {
            return false;
          }
        });
      }

      if (this.filtering.search.place) {
        items = items.filter(obj => {
          const item = obj.place;

          if (typeof item !== 'undefined' && item !== null && item !== '') {
            return item.toLowerCase().includes(this.filtering.search.place.toLowerCase());
          } else {
            return false;
          }
        });
      }

      // 이미지 타입 : 제목 중복 제거
      if (this.filtering.imgType) {
        items = items.reduce((prev, now) => {
          if (!prev.some(obj => obj.title === now.title)) {
            prev.push(now);
          }
          return prev;
        }, []);
      }

      // 관람 예정작만 보기
      if (this.filtering.watchingType) {
        items = items.filter(obj => {
          return new Date(obj.date) >= this.today;
        });
      }

      return items;
    },
    activeFilters() {
      const { category, year } = this.filtering.filters;

      return {
        category: Object.keys(category).filter(c => category[c]),
        year: Object.keys(year).filter(c => year[c])
      };
    },
    listClassName() {
      let temp = '';
      if (this.filtering.imgType) temp = temp + 'is-imgtype';
      if (this.filtering.filterCollapsed) temp = temp + 'is-collapsed';
      return temp;
    }
  },
  methods: {
    priceComma(val) {
      if (val) {
        return parseInt(val).toLocaleString();
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      this.filtering.filterCollapsed = this.window.width < 769;
    },
    chkWatching(val) {
      const valData = new Date(val);
      return valData > this.today ? 'item--watching' : '';
    },
    changeFilterCollapsed() {
      this.filtering.filterCollapsed = !this.filtering.filterCollapsed;
    },
    setFilter(filter, option) {
      if (filter === 'category') {
        this.filtering.filters[filter][option] = !this.filtering.filters[filter][option];
      } else {
        setTimeout(() => {
          this.clearFilter(filter, option, this.filtering.filters[filter][option]);
        }, 100);
      }
    },
    clearFilter(filter, except, active) {
      Object.keys(this.filtering.filters[filter]).forEach(option => {
        this.filtering.filters[filter][option] = (except === option && !active);
      });
    },
    clearAllFilters() {
      Object.keys(this.filtering.menus).forEach(this.clearFilter);
      this.filtering.imgType = false;
      this.filtering.tableType = false;
      this.filtering.watchingType = false;
      this.filtering.search.title = '';
      this.filtering.search.actor = '';
      this.filtering.search.place = '';
      this.filtering.sortType = 'date';
    }
  }
};
</script>
