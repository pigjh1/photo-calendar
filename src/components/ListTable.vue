<template>
  <div class="table-wrap">
    <table class="table">
      <colgroup>
        <col class="table-cell-1of13">
        <col class="table-cell-1of6">
        <col class="table-cell-1of8">
        <col>
        <col class="table-cell-1of8">
      </colgroup>
      <thead>
        <tr>
          <th>분류</th>
          <th>제목</th>
          <th>관람</th>
          <th>출연</th>
          <th>장소</th>
        </tr>
      </thead>
      <tbody>
        <tr class="item" v-for="item in filterItems" :key="item.id">
          <td>{{ item.cate }}</td>
          <td> <router-link :to="`/view/${ item.id }`">{{ item.title }}</router-link></td>
          <td>{{ item.date }} {{ item.time }}</td>
          <td>{{ item.actor }}</td>
          <td>{{ item.place }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    filterItems() {
      return this.$store.getters.filterItems;
    }
  }
};
</script>
