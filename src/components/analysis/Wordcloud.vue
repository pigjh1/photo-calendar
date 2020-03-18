<template>
  <div class="wordcloud">
    <span v-for="(index, data) in item" :key="data" :class="wordClass(index)">{{ data }}</span>
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
    item() {
      return this.type === 'actor' ? this.actorAll : this.placeAll;
    },
    actorAll() {
      const userdata = this.userdata;
      let data = [];

      for (let i = 0; i < userdata.length; i++) {
        let actor = userdata[i].actor;

        if (typeof actor !== 'undefined' && actor !== null && actor !== '') {
          actor = actor.split('/');

          data = data.concat(actor);
        }
      }

      return this.dataProcessing(data);
    },
    placeAll() {
      const userdata = this.userdata;
      let data = [];

      for (let i = 0; i < userdata.length; i++) {
        const place = userdata[i].place;

        if (typeof place !== 'undefined' && place !== null && place !== '') {
          data = data.concat(place);
        }
      }
      return this.dataProcessing(data);
    }
  },
  methods: {
    wordClass(val) {
      let i = parseInt(val) * 0.1,
        className = '';

      i = Math.floor(i);

      if (i > 0) {
        className = `word-${i}`;
        if (i > 7) {
          className = 'word-big';
        }
      }

      return className;
    },
    dataProcessing(data) {
      let newdata = [];
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

      // 2개 이하인 경우 제거
      for (var key in newdata) {
        if (newdata[key] < 2) {
          delete newdata[key];
        }
      }
      return newdata;
    }
  }
};
</script>
