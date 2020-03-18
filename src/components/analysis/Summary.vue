<template>
  <div>
    <p>{{ firstYear }}년 부터 {{ total }}개 작품을 {{ userdataLen }}번 관람하는데 {{ priceComma(totalPirce) }}원을 지출하였습니다.</p>
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
    userdataLen() {
      return this.$store.state.userdata.length;
    },
    firstYear() {
      const data = this.$store.state.userdata,
        d = data.sort((a, b) => a.date > b.date ? 1 : -1);

      return d[0].date.substr(0, 4);
    },
    total() {
      let data = this.titleAll;

      data = data.sort().reduce((a, b) => {
        if (!a.some(obj => obj === b)) {
          a.push(b);
        }
        return a;
      }, []);

      return data.length;
    },
    totalPirce() {
      return this.priceAll.reduce((a, b) => parseInt(a) + parseInt(b));
    },
    titleAll() {
      const userdata = this.userdata;
      let data = [];

      for (let i = 0; i < this.userdataLen; i++) {
        const title = userdata[i].title;

        if (typeof title !== 'undefined' && title !== null && title !== '') {
          data = data.concat(title);
        }
      }

      return data;
    },
    priceAll() {
      const userdata = this.userdata;
      let data = [];

      for (let i = 0; i < this.userdataLen; i++) {
        const price = userdata[i].price;

        if (typeof price !== 'undefined' && price !== null && price !== '' && price !== '-') {
          data = data.concat(price);
        }
      }

      return data;
    }
  },
  methods: {
    priceComma(val) {
      if (val) {
        return parseInt(val).toLocaleString();
      }
    }
  }
};
</script>
