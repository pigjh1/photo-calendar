<template>
  <div>
    <label for="mode" class="toggle">
      <input type="checkbox" id="mode" v-model="darkmode">
      <span class="toggle-slider"></span>
    </label>
  </div>
</template>

<script>
export default {
  computed: {
    darkmode: {
      get() {
        return this.$store.state.design.darkmode;
      },
      set(value) {
        this.$store.commit('changeTheme', value);
      }
    }
  }
};
</script>
