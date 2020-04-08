<template>
  <div class="turning">
    <div class="nodata" v-if="turninglistLen === 0">
      {{ turningLeast }}번 이상 관람한 작품이 없습니다.
    </div>

    <div v-if="turninglistLen > 0">
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
              <span v-for="(index, data) in actorAll" :key="data">{{ data }} ({{ index }})</span>
            </div>
          </div>

          <div v-if="memoHtml" class="textbox">
            <div v-html="memoHtml"></div>
          </div>
        </div>
      </div>

      <div class="l-flex">
        <div class="turning-cal">
          <div v-for="(value, index) in calDate" :key="index" >
            <Calendar :start="calDate[index]" calType="dot" calSize="sm" />
          </div>
        </div>

        <div class="turning-list" >
          <ListBox listType="turning" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UtilDate from '@/assets/js/utilDate.js';
import formatNumberComma from '@/assets/js/formatNumberComma.js';
import Calendar from '@/components/Calendar';
import ListBox from '@/components/ListBox';

export default {
  components: {
    Calendar,
    ListBox
  },
  filters: { formatNumberComma },
  beforeMount() {
    this.$store.commit('changeTurningTitle', Object.keys(this.turninglist)[0]);
    this.$store.commit('changeCaldate', this.turningItemsLast.date);
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
    turninglistLen() {
      return Object.keys(this.turninglist).length;
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
    turningGap() {
      const a = this.turningItemsFirst.date.split('-'),
        b = this.turningItemsLast.date.split('-'),
        aYear = parseInt(a[0]),
        bYear = parseInt(b[0]),
        aMonth = parseInt(a[1]),
        bMonth = parseInt(b[1]);
      let diff = this.turningLeast;

      if (aYear < bYear) {
        diff = ((bYear - aYear) * 12) + bMonth - aMonth;
      } else {
        diff = bMonth - aMonth;
      }

      return diff + 1;
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
    calDate() {
      const date = this.turningItemsFirst.date,
        newDate = [];

      for (let i = 0; i < this.turningGap; i++) {
        const year = date.substr(0, 4),
          month = date.substr(5, 2),
          day = date.substr(8, 2);
        let newYear = parseInt(year),
          newMonth = parseInt(month) + i;

        newMonth = newMonth > 0 ? newMonth : 12 - newMonth;

        if (newMonth > 12) {
          newYear = newYear + Math.ceil(newMonth / 12) - 1;
        }

        newMonth = newMonth % 12;
        newMonth = newMonth === 0 ? 12 : newMonth;

        newDate[i] = UtilDate.getDateFormat(newYear, newMonth, day);
      }

      return newDate;
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
  }
};
</script>
