<template>
  <div class="turning">
    <div class="turning-summary">
      <select v-model="selectedItem">
        <option v-for="(active, item, index) in turninglist" :value="item" :key="index">
          {{ item }} ({{active}})
        </option>
      </select>
      {{ turningItemsFirst.date }}부터
      {{ turningItemsLast.date }}까지
      {{ turningLen }}번 관람하는데
      {{ totalPirce | formatNumberComma }}원을 지출하였습니다.
    </div>

    <div class="flex">
      <div class="turning-poster">
        <img :src="turningItemsLast.img" :alt="turningItemsLast.title">
      </div>

      <div class="actorlist">
        <div v-if="!isDiffActor">
          출연 : {{ turningItemsLast.actor}}
        </div>

        <ActorList v-if="isDiffActor" />
      </div>
    </div>

    <Calendar />

    <div class="userlist" >
      <div class="box">
        <div class="item" v-for="item in turningItems" :key="item.id" :class="chkWatching(item.date)">
          <router-link :to="`/view/${ item.id }`">
            <span class="turn" v-if="item.turning > 1">#{{ item.turning }}</span>
            <dl>
              <dt>관람</dt>
              <dd>{{ item.date }} {{ item.time }}</dd>
              <dt v-if="item.actor && isDiffActor">출연</dt>
              <dd v-if="item.actor && isDiffActor">{{ item.actor }}</dd>
              <dt v-if="item.price">가격</dt>
              <dd v-if="item.price">{{ item.price | formatNumberComma }}</dd>
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
import formatNumberComma from '@/assets/js/formatNumberComma.js';
import Calendar from '@/components/turning/Calendar';
import ActorList from '@/components/turning/ActorList';

export default {
  components: {
    Calendar,
    ActorList
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
      return data;
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
    isDiffActor() {
      let items = this.turningItems;

      items = items.reduce((prev, now) => {
        if (!prev.some(obj => obj.actor === now.actor)) {
          prev.push(now);
        }
        return prev;
      }, []);

      return items.length > 1;
    }
  },
  methods: {
    chkWatching(val) {
      return new Date(val) > new Date() ? 'item--watching' : '';
    }
  }
};
</script>
