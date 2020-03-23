<template>
  <div class="turning">
    <div>
      <select v-model="selectedItem">
        <option v-for="(active, item, index) in turninglist" :value="item" :key="index">
          {{ item }} ({{ active }})
        </option>
      </select>
    </div>
    {{ turningItems[0].title }}
    <img :src="turningItems[0].img" alt="">

    <div class="userlist" >
      <transition-group tag="div" name="list" class="box">
        <div class="item" v-for="item in turningItems" :key="item.id" :class="chkWatching(item.date)">
          <router-link :to="`/view/${ item.id }`">
            <span class="turn" v-if="item.turning > 1">#{{ item.turning }}</span>
            <dl>
              <dt>관람</dt>
              <dd>{{ item.date }} {{ item.time }}</dd>
              <dt v-if="item.actor">출연</dt>
              <dd v-if="item.actor">{{ item.actor }}</dd>
              <dt v-if="item.place">장소</dt>
              <dd v-if="item.place">{{ item.place }}</dd>
              <dt v-if="item.price">가격</dt>
              <dd v-if="item.price">{{ priceComma(item.price) }}</dd>
              <dt v-if="item.seat">좌석</dt>
              <dd v-if="item.seat">{{ item.seat }} {{ item.seatgrade }}</dd>
              <dt v-if="item.office">예매처</dt>
              <dd v-if="item.office">{{ item.office }}</dd>
            </dl>
          </router-link>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.commit('changeTurningTitle', this.selectedItem);
  },
  computed: {
    turningItems() {
      return this.$store.getters.turningItems;
    },
    selectedItem: {
      get() {
        return Object.keys(this.turninglist)[0];
      },
      set(value) {
        this.$store.commit('changeTurningTitle', value);
      }
    },
    turningLeast() {
      return this.$store.state.turning.least;
    },
    turningCate() {
      return this.$store.getters.turningCate;
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
