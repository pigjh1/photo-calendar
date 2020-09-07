<template>
  <div class="wordcloud">
    <span v-for="(index, data) in itemList" :key="data">
      <router-link :to="`/actor/${ data }`" v-if="isActor">
        <span :class="wordClass(index)">{{ data }}</span>
      </router-link>
      <router-link :to="`/place/${ data }`" v-if="isPlace">
        <span :class="wordClass(index)">{{ data }}</span>
      </router-link>
      <span :class="wordClass(index)" v-if="!isActor && !isPlace">{{ data }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  computed: {
    isActor() {
      return this.type === 'actor';
    },
    isPlace() {
      return this.type === 'place';
    },
    userItemsRange() {
      return this.$store.getters.userItemsRange;
    },
    turningLeast() {
      return this.$store.state.turning.least;
    },
    itemList() {
      let data = [], newdata = [];

      data = this.userItemsRange.map(({ actor, place, office }) => {
        let item = actor;

        switch (this.type) {
        case 'place':
          item = place;
          break;
        case 'office':
          item = office;
          break;
        }

        if (typeof item !== 'undefined' && item !== null && item !== '') {
          return item;
        } else {
          return '';
        }
      });

      if (this.isActor) {
        data = data.join('/').split('/');
      }

      data.forEach(el => {
        el = el.replace(/^\s+|\s+$/g, '');
        newdata.push(el);
      });

      newdata = newdata.sort().reduce((x, y) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});

      // 조건 이하인 경우 제거
      for (const key in newdata) {
        if (newdata[key] < this.turningLeast) {
          delete newdata[key];
        }
      }

      return newdata;
    }
  },
  methods: {
    wordClass(val) {
      let i = parseInt(val) * 0.4,
        className = '';

      i = Math.floor(i);

      if (i > 0) {
        className = `word-${i}`;
        if (i > 7) {
          className = 'word-big';
        }
      }

      return className;
    }
  }
};
</script>
