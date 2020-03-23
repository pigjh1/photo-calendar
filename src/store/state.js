import dataJson from '@/assets/data/sample.json';

export default {
  today: new Date(),
  username: '나덕후',
  userdata: dataJson,
  userItems: '',
  listType: {
    table: false,
    img: false,
    watching: false,
    collapsed: false
  },
  filtering: {
    sortType: 'date',
    sorts: [
      { text: '관람일', value: 'date' },
      { text: '제목', value: 'title' },
      { text: '장소', value: 'place' },
      { text: '가격', value: 'price' }
    ],
    search: {
      title: '',
      actor: '',
      place: ''
    },
    filters: {
      category: {},
      year: {}
    }
  },
  turning: {
    least: 3,
    title: ''
  },
  design: {
    darkmode: false,
    primaryColor: 0,
    fontFamily: 'Nanum Gothic',
    posterType: 'vertical', // vertical, horizontal
    chartIndex: 0,
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
  }
};
