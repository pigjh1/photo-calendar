<template>
  <div class="wordcloud">
    <span v-for="(index, data) in itemList" :key="data" :class="wordClass(index)">{{ data }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  data() {
    return {
      userdata: this.$store.state.userdata
    };
  },
  computed: {
    turningLeast() {
      return this.$store.state.turning.least;
    },
    itemList() {
      const userdata = this.userdata;
      let data = [], newdata = [];

      for (let i = 0; i < userdata.length; i++) {
        let item = userdata[i].actor;

        switch (this.type) {
        case 'place':
          item = userdata[i].place;
          break;
        case 'office':
          item = userdata[i].office;
          break;
        }

        if (typeof item !== 'undefined' && item !== null && item !== '') {
          if (this.type === 'actor') {
            item = item.split('/');
          }

          data = data.concat(item);
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
      let i = parseInt(val) * 0.3,
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
