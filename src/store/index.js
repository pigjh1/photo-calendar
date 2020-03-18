import Vue from 'vue';
import Vuex from 'vuex';
import dataJson from '@/assets/data/sample.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '나덕후',
    userdata: dataJson,
    darkmode: false,
    currentColor: 0,
    currentFontFamily: 'Nanum Gothic',
    currentPosterType: 'vertical', // vertical, horizontal
    currentChartColor: 0,
    chartColor: [
      ['#f16e74', '#e56246', '#de9562', '#9cad50', '#348388', '#4073b2', '#4f3f7e', '#4caf50', '#cddc39', '#607d8b'],
      ['#fe4a49', '#2ab7ca', '#fed766', '#e6e6ea', '#f4f4f8', '#eee3e7', '#ead5dc', '#eec9d2', '#f4b6c2', '#f6abb6'],
      ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94', '#d11141', '#00b159', '#00aedb', '#f37735', '#ffc425'],
      ['#011f4b', '#03396c', '#005b96', '#6497b1', '#b3cde0', '#051e3e', '#251e3e', '#451e3e', '#651e3e', '#851e3e'],
      ['#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71', '#2a4d69', '#4b86b4', '#adcbe3', '#e7eff6', '#63ace5'],
      ['#fe9c8f', '#feb2a8', '#fec8c1', '#fad9c1', '#f9caa7', '#009688', '#35a79c', '#54b2a9', '#65c3ba', '#83d0c9'],
      ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf', '#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0'],
      ['#ff77aa', '#ff99cc', '#ffbbee', '#ff5588', '#ff3377', '#eeeeee', '#dddddd', '#cccccc', '#bbbbbb', '#29a8ab'],
      ['#edc951', '#eb6841', '#cc2a36', '#4f372d', '#00a0b0', '#2e003e', '#3d2352', '#3d1e6d', '#8874a3', '#e4dcf1'],
      ['#8d5524', '#c68642', '#e0ac69', '#f1c27d', '#ffdbac', '#343d46', '#4f5b66', '#65737e', '#a7adba', '#c0c5ce']
    ]
  },
  getters: {
    chartOptions1: state => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          fontFamily: state.currentFontFamily,
          labels: {
            fontFamily: state.currentFontFamily
          }
        },
        label: {
          fontFamily: state.currentFontFamily
        },
        title: {
          fontFamily: state.currentFontFamily
        },
        tooltips: {
          titleFontFamily: state.currentFontFamily,
          bodyFontFamily: state.currentFontFamily,
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel.toLocaleString();
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontFamily: state.currentFontFamily,
              userCallback: function(value) {
                return value.toLocaleString(); // , 콤마처리
              }
            }
          }],
          xAxes: [{
            ticks: {
              fontFamily: state.currentFontFamily
            }
          }]
        }
      };
    },
    chartOptions2: state => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          fontFamily: state.currentFontFamily,
          labels: {
            fontFamily: state.currentFontFamily
          }
        },
        label: {
          fontFamily: state.currentFontFamily
        },
        title: {
          fontFamily: state.currentFontFamily
        },
        tooltips: {
          titleFontFamily: state.currentFontFamily,
          bodyFontFamily: state.currentFontFamily
        }
      };
    }
  },
  mutations: {
    editData: (state) => {
      console.log(state);
    },
    changeUserName: (state, payload) => {
      state.username = payload;
    },
    changeUserdata: (state, payload) => {
      if (typeof payload !== 'undefined' && payload !== null && payload !== '') {
        state.userdata = payload;
        alert('데이터가 변경되었습니다.');
      }
    },
    changeTheme: (state, payload) => {
      state.darkmode = payload;
    },
    changeColor: (state, payload) => {
      state.currentColor = payload;
    },
    changeFontFamily: (state, payload) => {
      state.currentFontFamily = payload;
    },
    changePost: (state, payload) => {
      state.currentPosterType = payload;
    },
    changeChartColor: (state, payload) => {
      state.currentChartColor = payload;
    }
  },
  actions: {
  },
  modules: {
  }
});
