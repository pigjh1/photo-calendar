<template>
  <div class="turningview">
    <div class="turningview-header">
      <div class="turningview-poster">
        <img :src="turningItemsLast.img" :alt="turningItemsLast.title">
      </div>

      <Summary />
    </div>

    <section class="turningview-section">
      <div class="turningview-more">
        <CalendarTurning :start="this.turningItemsFirst.date" :end="this.turningItemsLast.date" />
      </div>

      <div class="turningview-listbox">
        <ListBox listType="turning" />
      </div>
    </section>
  </div>
</template>

<script>
import Summary from '@/components/SummaryTurningView';
import CalendarTurning from '@/components/CalendarTurning';
import ListBox from '@/components/ListBox';

export default {
  props: {
    name: String
  },
  components: {
    Summary,
    CalendarTurning,
    ListBox
  },
  beforeMount() {
    this.$store.commit('changeTurningTitle', this.titleName);
    this.$store.commit('changeCaldate', this.turningItemsLast.date);
  },
  computed: {
    titleName() {
      return this.name;
    },
    turningItems() {
      return this.$store.getters.turningItems;
    },
    turningLen() {
      return this.turningItems.length;
    },
    turningItemsFirst() {
      return this.turningItems[this.turningLen - 1];
    },
    turningItemsLast() {
      return this.turningItems[0];
    }
  }
};
</script>
