<template>
  <div>
    <div :class="splitclassName" v-if="isTextObj">
      <span v-for="(index, data) in textObj" :key="data">
        <router-link :to="`/${typeName}/${ data }`">
          {{ data }}<span v-if="isDiff">({{ index }})</span>
        </router-link>
      </span>
    </div>
    <div :class="splitclassName" v-if="!isTextObj">
      <span v-for="data in text" :key="data">
        <router-link :to="`/${typeName}/${ data }`">{{ data }}</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: String,
    type: String,
    textList: String,
    textObj: Object
  },
  computed: {
    isTextObj() {
      return this.textObj;
    },
    splitclassName() {
      const base = 'splitlist';
      return this.className ? `${base} ${this.className}` : base;
    },
    typeName() {
      const base = 'actor';
      return this.type ? this.type : base;
    },
    isDiff() {
      const arr = [];
      for (const val in this.textObj) {
        arr.push(this.textObj[val]);
      }
      return new Set(arr).size > 1;
    },
    text() {
      return this.textList.split(' / ');
    }
  }
};
</script>
