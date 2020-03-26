<template>
  <div>
    <ul>
      <li v-for="(index, data) in item" :key="data">{{ data }} : {{ index }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userdata: this.$store.state.userdata
    };
  },
  computed: {
    turningTitle() {
      return this.$store.state.turning.title;
    },
    item() {
      const userdata = this.userdata.filter(obj => {
        return obj.title.includes(this.turningTitle);
      });
      let data = [];

      for (let i = 0; i < userdata.length; i++) {
        let actor = userdata[i].actor;

        if (typeof actor !== 'undefined' && actor !== null && actor !== '') {
          actor = actor.split('/');

          data = data.concat(actor);
        }
      }

      return this.dataProcessing(data);
    }
  },
  methods: {
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

      return newdata;
    }
  }
};
</script>
