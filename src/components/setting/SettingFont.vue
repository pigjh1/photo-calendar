<template>
  <div class="cont">
    <select v-model="selectedFont" id="fontfamily">
      <option v-for="(item, index) in fontList"
        :value="item.text" :key="index">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontList: [
        {
          url: '//fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap',
          text: 'Noto Sans KR',
          value: 'noto-sans-kr'
        }, {
          url: '//fonts.googleapis.com/css?family=Nanum+Gothic',
          text: 'Nanum Gothic',
          value: 'nanum-gothic'
        }, {
          url: '//fonts.googleapis.com/css?family=Nanum+Myeongjo',
          text: 'Nanum Myeongjo',
          value: 'nanum-myeongjo'
        }, {
          url: '//fonts.googleapis.com/css?family=Nanum+Pen+Script',
          text: 'Nanum Pen Script',
          value: 'nanum-pen-script'
        }, {
          url: '//fonts.googleapis.com/css?family=Cute+Font',
          text: 'Cute Font',
          value: 'cute-font'
        }, {
          url: '//fonts.googleapis.com/css?family=Poor+Story',
          text: 'Poor Story',
          value: 'poor-story'
        }, {
          url: '//fonts.googleapis.com/css?family=Hi+Melody',
          text: 'Hi Melody',
          value: 'hi-melody'
        }, {
          url: '//fonts.googleapis.com/css?family=Yeon+Sung',
          text: 'Yeon Sung',
          value: 'yeon-sung'
        }, {
          url: '//fonts.googleapis.com/css?family=Gamja+Flower',
          text: 'Gamja Flower',
          value: 'gamja-flower'
        }
      ]
    };
  },
  computed: {
    selectedFont: {
      get() {
        return this.$store.state.design.fontFamily;
      },
      set(value) {
        this.loadCSS();
        this.$store.commit('changeFontFamily', value);
      }
    }
  },
  methods: {
    loadCSS(part) {
      const link = document.createElement('link'),
        head = document.getElementsByTagName('head')[0],
        getIndex = document.getElementById('fontfamily').selectedIndex,
        getFont = this.fontList[getIndex].url;

      let styleId = this.selectedFont,
        tmp = {};

      styleId = styleId.replace(/\s/g, '').toLowerCase();

      // css를 이미 불러온 경우 다시 불러오지 않는다.
      if (!document.getElementById(styleId)) {
        link.rel = 'stylesheet';
        link.id = styleId;
        link.type = 'text/css';

        tmp = link.cloneNode(true);
        tmp.href = getFont;
        head.appendChild(tmp);
      }
    }
  }
};
</script>
