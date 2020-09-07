<template>
  <div id="app" :class="className">
    <h1 class="a11y">Photo Calendar</h1>
    <Header />
    <main class="main">
      <transition name="fade">
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
    if (this.darkmode) {
      document.body.classList.add('theme-dark');
    }
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
      return 'ff-' + this.$store.state.design.fontFamily.toLowerCase().replace(/ /g, '-');
    },
    className() {
      return this.colorClass + ' ' + this.fontClass;
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
        const newObj = Object.assign({}, obj);

        newObj.dateyear = obj.date.substr(0, 4);

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
