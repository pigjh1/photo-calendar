<template>
  <div id="app" :class="className">
    <h1 class="a11y">Photo Calendar</h1>
    <Header />
    <main class="main">
      <transition name="view">
        <router-view />
      </transition>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" src="@/assets/scss/style.scss"></style>

<script>
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default {
  components: {
    Header,
    Footer
  },
  beforeMount() {
    this.$store.commit('setupItem', this.userItems);
  },
  computed: {
    darkmode() {
      return this.$store.state.design.darkmode;
    },
    colorClass() {
      return 'cset-' + (this.$store.state.design.primaryColor + 1);
    },
    fontClass() {
      return 'ff-' + this.$store.state.design.fontFamily.toLowerCase().replace(/ /gi, '-');
    },
    className() {
      let val = this.colorClass + ' ' + this.fontClass;
      val = this.darkmode ? val + ' theme-dark' : val;
      return val;
    },
    sortItems() {
      return this.$store.getters.sortItems;
    },
    turningCate() {
      return this.$store.getters.turningCate;
    },
    userItems() {
      const turning = this.turningCate;

      return this.sortItems.map((obj) => {
        const newObj = {};

        newObj.id = obj.id;
        newObj.img = obj.img;
        newObj.cate = obj.cate;
        newObj.title = obj.title;
        newObj.date = obj.date;
        newObj.time = obj.time;
        newObj.actor = obj.actor;
        newObj.place = obj.place;
        newObj.price = obj.price;
        newObj.office = obj.office;
        newObj.datayear = obj.date.replace('-', '').substr(0, 4);

        for (const key in this.turningCate) {
          if (key === obj.title) {
            newObj.turning = turning[key];
            turning[key]--;
          }
        }
        return newObj;
      });
    }
  }
};
</script>
