import dataJson from '@/assets/sample.json';

export default {
  today: new Date(),
  weekNames: ['월', '화', '수', '목', '금', '토', '일'],
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
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
    least: 5,
    title: '',
    caldate: ''
  },
  design: {
    darkmode: false,
    primaryColor: 0,
    colorList: [
      '#f3a683', '#f7d794', '#778beb', '#e77f67', '#cf6a87',
      '#f19066', '#f5cd79', '#546de5', '#e15f41', '#c44569',
      '#786fa6', '#f8a5c2', '#63cdda', '#ea8685', '#596275',
      '#574b90', '#f78fb3', '#3dc1d3', '#e66767', '#303952'
    ],
    fontFamily: 'Nanum Gothic',
    posterType: 'vertical', // vertical, horizontal
    chartIndex: 0,
    chartColor: [
      ['#f16e74', '#e56246', '#de9562', '#9cad50', '#348388', '#4073b2', '#4f3f7e', '#4caf50', '#cddc39', '#607d8b'],
      ['#fe4a49', '#2ab7ca', '#fed766', '#e6e6ea', '#f4f4f8', '#d11141', '#00b159', '#00aedb', '#f37735', '#ffc425'],
      ['#eee3e7', '#ead5dc', '#eec9d2', '#f4b6c2', '#f6abb6', '#ffbbee', '#ff99cc', '#ff77aa', '#ff5588', '#ff3377'],
      ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94', '#fe9c8f', '#feb2a8', '#fec8c1', '#fad9c1', '#f9caa7'],
      ['#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf', '#2a4d69', '#4b86b4', '#adcbe3', '#63ace5', '#e7eff6'],
      ['#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0', '#edc951', '#eb6841', '#cc2a36', '#4f372d', '#00a0b0'],
      ['#009688', '#35a79c', '#54b2a9', '#65c3ba', '#83d0c9', '#2e003e', '#3d2352', '#3d1e6d', '#8874a3', '#e4dcf1'],
      ['#011f4b', '#03396c', '#005b96', '#6497b1', '#b3cde0', '#051e3e', '#251e3e', '#451e3e', '#651e3e', '#851e3e']
    ]
  }
};
