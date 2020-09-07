export default {
  // List
  // -----------------------------------------------------------------------------

  // List > Data Setup
  setupItem: (state, payload) => {
    state.userItems = payload.sort((a, b) => {
      return a.date > b.date ? -1 : 1;
    }).sort((a, b) => {
      if (a.date === b.date) {
        return a.time > b.time ? 1 : -1;
      }
    });
  },
  setupFilters: (state, payload) => {
    if (Object.values(state.filtering.filters.category).length === 0) {
      state.filtering.filters = payload;
    }
  },
  resetFilters: (state) => {
    state.filtering.category = {};
    state.filtering.year = {};
  },

  // List > Data Change
  changeTableType: (state, payload) => {
    state.listType.table = payload;
  },
  changeImgType: (state, payload) => {
    state.listType.img = payload;
  },
  changeWatchingType: (state, payload) => {
    state.listType.watching = payload;
  },
  changeCollapsed: (state, payload) => {
    if (payload) payload = !state.listType.collapsed;
    state.listType.collapsed = payload;
  },

  changeSortType: (state, payload) => {
    state.filtering.sortType = payload;
  },
  changeSorts: (state, payload) => {
    state.filtering.sorts = payload;
  },
  changeFilters: (state, payload) => {
    state.filtering.filters = payload;
  },
  changeSearchTitle: (state, payload) => {
    state.filtering.search.title = payload;
  },
  changeSearchActor: (state, payload) => {
    state.filtering.search.actor = payload;
  },
  changeSearchPlace: (state, payload) => {
    state.filtering.search.place = payload;
  },
  clearAllFilters: (state) => {
    state.listType.img = false;
    state.listType.table = false;
    state.listType.watching = false;
    state.filtering.sortType = 'date';
    state.filtering.search.title = '';
    state.filtering.search.actor = '';
    state.filtering.search.place = '';
  },

  // Turning
  // -----------------------------------------------------------------------------
  changeTurningLeast: (state, payload) => {
    state.turning.least = payload;
  },
  changeTurningTitle: (state, payload) => {
    state.turning.title = payload;
  },
  changeCaldate: (state, payload) => {
    state.turning.caldate = payload;
  },
  changeTurningOrderByDate: (state, payload) => {
    state.turning.orderByDate = payload;
  },
  changeTurningBlackMode: (state, payload) => {
    state.turning.blackMode = payload;
  },

  // Analysis
  // -----------------------------------------------------------------------------
  changeAnalysisRangeFrom: (state, payload) => {
    state.analysis.rangeFrom = payload;
  },
  changeAnalysisRangeTo: (state, payload) => {
    state.analysis.rangeTo = payload;
  },

  // Setting
  // -----------------------------------------------------------------------------
  changeYearType: (state, payload) => {
    state.yearType = payload;
  },

  // Setting > Data
  changeUserName: (state, payload) => {
    state.username = payload;
  },
  changeUserData: (state, payload) => {
    if (typeof payload !== 'undefined' && payload !== null && payload !== '') {
      state.userData = payload;
      alert('데이터가 변경되었습니다.');
    }
  },

  // Setting > Design
  changeTheme: (state, payload) => {
    document.body.classList.toggle('theme-dark');
    state.design.darkmode = payload;
  },
  changeFontFamily: (state, payload) => {
    state.design.fontFamily = payload;
  },
  changePoster: (state, payload) => {
    state.design.posterType = payload;
  },
  changePrimaryColor: (state, payload) => {
    state.design.primaryColor = payload;
  },
  changeChartColor: (state, payload) => {
    state.design.chartIndex = payload;
  }
};
