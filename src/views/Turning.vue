<template>
  <div class="turning">
    <aside class="filter">
      <select v-model="selectedItem" @change="turningChange()">
        <option v-for="(active, item, index) in turninglist" :value="item" :key="index">
          {{ item }}
        </option>
      </select>

      <div class="item">
        <span class="t">빈 캘린더 제외</span>
        <label for="mode" class="toggle">
          <input type="checkbox" id="mode" v-model="turningBlackmode">
          <span class="toggle-slider"></span>
        </label>
      </div>
    </aside>

    <div class="l-flex">
      <div class="turning-poster">
        <img :src="turningItemsLast.img" :alt="turningItemsLast.title">
      </div>

      <div class="turning-desc">
        <p>
          <b><em>{{ turningItemsFirst.title }}</em></b>을
          {{ turningItemsFirst.date }}부터
          {{ turningItemsLast.date }}까지
          {{ turningLen }}번 관람하는데
          {{ totalPirce | formatNumberComma }}원을 지출하였습니다.
        </p>

        <div class="actorlist">
          <div v-if="!isDiffActor">
            <span v-for="(index, data) in actorAll" :key="data">{{ data }}</span>
          </div>
          <div v-if="isDiffActor">
            <span v-for="(index, data) in actorAll" :key="data">
              <button @click="setAactor(data)">
                {{ data }} ({{ index }})
              </button>
            </span>
          </div>
        </div>

        <div v-if="memoHtml" class="textbox">
          <div v-html="memoHtml"></div>
        </div>
      </div>
    </div>

    <div class="l-flex">
      <TurningCalendar />

      <div class="turning-list" >
        <transition-group tag="div" name="list" class="listbox">
          <div class="item" v-for="item in filterItems" :key="item.id" :class="chkWatching(item.date)">
            <router-link :to="`/view/${ item.id }`">
              <span class="turn">#{{ item.turning }}</span>
              <dl>
                <dt class="a11y">관람</dt>
                <dd>{{ item.date }} {{ item.time }}</dd>
                <dt class="a11y" v-if="item.actor && isDiffActor">출연</dt>
                <dd v-if="item.actor && isDiffActor">{{ item.actor }}</dd>
                <dt class="a11y" v-if="item.seat">좌석</dt>
                <dd v-if="item.seat">{{ item.seat }} {{ item.seatgrade }}</dd>
              </dl>
            </router-link>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import formatNumberComma from '@/assets/js/formatNumberComma.js';
import TurningCalendar from '@/components/TurningCalendar';

export default {
  components: {
    TurningCalendar
  },
  filters: { formatNumberComma },
  beforeMount() {
    this.$store.commit('changeTurningTitle', Object.keys(this.turninglist)[0]);
    this.$store.commit('changeCaldate', this.turningItemsLast.date);
  },
  data() {
    return {
      selectedActor: ''
    };
  },
  computed: {
    selectedItem: {
      get() {
        return this.$store.state.turning.title;
      },
      set(value) {
        this.$store.commit('changeTurningTitle', value);
        this.$store.commit('changeCaldate', this.turningItemsLast.date);
      }
    },
    turningBlackmode: {
      get() {
        return this.$store.state.turning.blackmode;
      },
      set(value) {
        this.$store.commit('changeTurningBlackmode', value);
      }
    },
    turningLeast() {
      return this.$store.state.turning.least;
    },
    turningCate() {
      return this.$store.getters.turningCate;
    },
    turningItems() {
      return this.$store.getters.turningItems;
    },
    turningLen() {
      return this.turningItems.length;
    },
    turningItemsFirst() {
      return this.turningItems[this.turningLen - 1];
    },
    turningItemsLast() {
      return this.turningItems[0];
    },
    turninglist() {
      const data = this.turningCate;

      if (this.turningLeast < 1) return;

      for (const key in data) {
        if (data[key] < this.turningLeast) {
          delete data[key];
        }
      }

      return Object.fromEntries(
        Object.entries(data).sort((a, b) => b[1] - a[1])
      );
    },
    filterItems() {
      let items = this.turningItems;
      if (this.selectedActor) {
        items = items.filter(obj => {
          return obj.actor.includes(this.selectedActor);
        });
      }

      return items;
    },
    priceAll() {
      const userdata = this.turningItems;
      let data = [];

      for (let i = 0; i < userdata.length; i++) {
        const price = userdata[i].price;

        if (typeof price !== 'undefined' && price !== null && price !== '' && price !== '-') {
          data = data.concat(price);
        }
      }
      return data;
    },
    totalPirce() {
      return this.priceAll.reduce((a, b) => parseInt(a) + parseInt(b));
    },
    actorAll() {
      const userdata = this.turningItems;
      let data = [], newdata = [];

      for (let i = 0; i < userdata.length; i++) {
        let actor = userdata[i].actor;

        if (typeof actor !== 'undefined' && actor !== null && actor !== '') {
          actor = actor.split('/');

          data = data.concat(actor);
        }
      }

      // 문자열 앞뒤공백 제거
      data.forEach(el => {
        el = el.replace(/^\s+|\s+$/g, '');
        newdata.push(el);
      });

      // 정렬, 중복값 확인
      newdata = newdata.sort().reduce((x, y) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});

      return Object.fromEntries(
        Object.entries(newdata).sort((a, b) => b[1] - a[1])
      );
    },
    isDiffActor() {
      let items = this.turningItems;

      items = items.reduce((prev, now) => {
        if (!prev.some(obj => obj.actor === now.actor)) {
          prev.push(now);
        }
        return prev;
      }, []);

      return items.length > 1;
    },
    memoHtml() {
      const memo = this.turningItemsLast.memo;
      return memo ? memo.split('\n').join('<br />') : memo;
    }
  },
  methods: {
    setAactor(val) {
      this.selectedActor = val;
    },
    turningChange() {
      this.selectedActor = '';
    },
    chkWatching(val) {
      return new Date(val) > new Date() ? 'item--watching' : '';
    }
  }
};
</script>
