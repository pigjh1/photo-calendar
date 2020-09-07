<template>
  <div class="turninglist">
    <div class="nodata" v-if="turninglistLen === 0">
      {{ turningLeast }}번 이상 관람한 작품이 없습니다.
    </div>

    <ul v-if="turninglistLen > 0">
      <li v-for="(active, item, index) in turninglist" :key="index">
        <router-link :to="`/turning/${ item }`">
          <div class="turninglist-poster">
            <img :src="getPoster(item)" alt="">
          </div>
          <div class="turninglist-name">
           {{ item }} ({{ active }})
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    turningLeast() {
      return this.$store.state.turning.least;
    },
    turningOrder() {
      return this.$store.state.turning.orderByDate;
    },
    userItems() {
      return this.$store.state.userItems;
    },
    turningCate() {
      return this.$store.getters.turningCate;
    },
    turninglistLen() {
      return Object.keys(this.turninglist).length;
    },
    turninglist() {
      const data = this.turningCate;

      if (this.turningLeast < 1) return;

      for (const key in data) {
        if (data[key] < this.turningLeast) {
          delete data[key];
        }
      }

      if (this.turningOrder) {
        return data;
      } else {
        return Object.fromEntries(
          Object.entries(data).sort((a, b) => b[1] - a[1])
        );
      }
    }
  },
  methods: {
    getPoster(title) {
      let items = this.userItems;

      items = items.filter(obj => {
        return obj.title === title;
      });

      return items[0].img;
    }
  }
};
</script>
