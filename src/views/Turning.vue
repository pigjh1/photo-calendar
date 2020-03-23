<template>
  <div class="turning">
    <div class="turning-summary">
      <select v-model="selectedItem">
        <option v-for="(active, item, index) in turninglist" :value="item" :key="index">
          {{ item }} ({{ active }})
        </option>
      </select>
      {{ turningItemsFirst.date }}부터
      {{ turningItemsLast.date }}까지
      {{ turningLen }}번 관람하였습니다.
    </div>

    <div class="flex">
      <div class="turning-poster">
        <img :src="turningItemsLast.img" :alt="turningItemsLast.title">
      </div>

      <Calendar />
    </div>

    <div class="userlist" >
      <div class="box">
        <div class="item" v-for="item in turningItems" :key="item.id" :class="chkWatching(item.date)">
          <router-link :to="`/view/${ item.id }`">
            <span class="turn" v-if="item.turning > 1">#{{ item.turning }}</span>
            <dl>
              <dt>관람</dt>
              <dd>{{ item.date }} {{ item.time }}</dd>
              <dt v-if="item.actor">출연</dt>
              <dd v-if="item.actor">{{ item.actor }}</dd>
              <dt v-if="item.price">가격</dt>
              <dd v-if="item.price">{{ priceComma(item.price) }}</dd>
              <dt v-if="item.seat">좌석</dt>
              <dd v-if="item.seat">{{ item.seat }} {{ item.seatgrade }}</dd>
            </dl>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/turning/Calendar';

export default {
  components: {
    Calendar
  },
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
    turningItems() {
      return this.$store.getters.turningItems;
    },
    turningItemsFirst() {
      return this.turningItems[this.turningLen - 1];
    },
    turningItemsLast() {
      return this.turningItems[0];
    },
    turningLeast() {
      return this.$store.state.turning.least;
    },
    turningCate() {
      return this.$store.getters.turningCate;
    },
    turningLen() {
      return this.turningItems.length;
    },
    turninglist() {
      const data = this.turningCate;

      if (this.turningLeast < 1) return;

      for (const key in data) {
        if (data[key] < this.turningLeast) {
          delete data[key];
        }
      }
      return data;
    }
  },
  methods: {
    chkWatching(val) {
      return new Date(val) > new Date() ? 'item--watching' : '';
    },
    priceComma(val) {
      if (val) {
        return parseInt(val).toLocaleString();
      }
    }
  }
};
</script>
