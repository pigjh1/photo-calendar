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
      let temp = this.colorClass + ' ' + this.fontClass;
      temp = this.darkmode ? temp + ' theme-dark' : temp;
      return temp;
    }
  }
};
</script>
