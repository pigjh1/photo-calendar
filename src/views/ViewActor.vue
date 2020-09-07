<template>
  <div class="l-wrap">
    <p>
      <em>{{ itemName }}</em> 배우의
      <b>{{ listLen }}개</b> 작품을
      <b>{{ itemsLen }}번</b> 관람하였습니다.
    </p>

    <SplitList className="borderbox" type="turning" :textList="titleText" />

    <ListBoxItems :filterItems="filterItems" />
  </div>
</template>

<script>
import ListBoxItems from '@/components/ListBoxItems';
import SplitList from '@/components/SplitList';

export default {
  props: {
    name: String
  },
  components: {
    SplitList,
    ListBoxItems
  },
  computed: {
    itemName() {
      return this.name.replace(/^\s+|\s+$/g, '');
    },
    userItems() {
      return this.$store.state.userItems;
    },
    itemsLen() {
      return this.filterItems.length;
    },
    listLen() {
      return this.titleList.length;
    },
    filterItems() {
      return this.userItems.filter(({ actor }) => {
        if (typeof actor !== 'undefined' && actor !== null && actor !== '') {
          return actor.toLowerCase().includes(this.itemName.toLowerCase());
        } else {
          return false;
        }
      });
    },
    titleList() {
      return this.filterItems.reduce((prev, now) => {
        if (!prev.some(obj => obj.title === now.title)) {
          prev.push(now);
        }
        return prev;
      }, []);
    },
    titleText() {
      return this.titleList.map(({ title }) => title).join(' / ');
    }
  }
};
</script>
