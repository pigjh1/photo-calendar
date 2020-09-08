import UtilColor from '@/assets/js/utilColor.js';

export default {
  // List
  // -----------------------------------------------------------------------------
  sortItems: state => {
    return state.userData.sort((a, b) => {
      return a.date > b.date ? -1 : 1;
    }).sort((a, b) => {
      if (a.date === b.date) {
        return a.time > b.time ? -1 : 1;
      }
    });
  },

  filterItems: state => {
    const activeTitle = state.filtering.search.title,
      activeActor = state.filtering.search.actor,
      activePlace = state.filtering.search.place,
      activeCategory = state.filtering.filters.category,
      activeYaer = state.filtering.filters.year,
      category = Object.keys(activeCategory).filter(c => activeCategory[c]),
      year = Object.keys(activeYaer).filter(c => activeYaer[c]);
    let items = state.userItems;

    // sort
    items = items.sort((a, b) => {
      switch (state.filtering.sortType) {
      case 'title':
        return a.title > b.title ? 1 : -1;
      case 'place':
        return a.place > b.place ? 1 : -1;
      case 'price':
        if (b.price) {
          return b.price - a.price;
        } else {
          return 1;
        }
      default:
        return a.date > b.date ? -1 : 1;
      }
    }).sort((a, b) => {
      if (a.date === b.date) {
        return a.time > b.time ? -1 : 1;
      }
    });

    // filter
    items = items.filter(({
      title,
      actor,
      place,
      cate,
      dateyear,
      date
    }) => {
      if (activeTitle) {
        if (!~title.toLowerCase().indexOf(activeTitle.toLowerCase())) return false;
      }

      if (activeActor) {
        if (typeof actor !== 'undefined' && actor !== null && actor !== '') {
          if (!~actor.toLowerCase().indexOf(activeActor.toLowerCase())) return false;
        } else {
          return false;
        }
      }

      if (activePlace) {
        if (typeof place !== 'undefined' && place !== null && place !== '') {
          if (!~place.toLowerCase().indexOf(activePlace.toLowerCase())) return false;
        } else {
          return false;
        }
      }

      if (category.length) {
        if (cate.includes('/')) {
          let st = true;
          for (const key in category) {
            if (st) {
              st = !~cate.indexOf(category[key]);
            }
            return !st;
          }
        } else {
          if (!~category.indexOf(cate)) return false;
        }
      }

      if (state.listType.watching) {
        if (new Date(date) < state.today) return false;
      }

      return (
        !year.length || year.every(a => ~dateyear.indexOf(a))
      );
    });

    // 이미지 타입 : 제목 중복 제거
    if (state.listType.img) {
      items = items.reduce((prev, now) => {
        if (!prev.some(obj => obj.title === now.title)) {
          prev.push(now);
        }
        return prev;
      }, []);
    }

    return items;
  },

  turningCate: state => {
    const items = state.userData;

    return items.map(({
      title
    }) => title.replace(/^\s+|\s+$/g, ''))
      .reduce((x, y) => {
        x[y] = ++x[y] || 1;
        return x;
      }, {});
  },

  turningItems: state => {
    let items = state.userItems;

    if (state.turning.title) {
      items = items.filter(obj => {
        return obj.title === state.turning.title;
      });
    }

    return items;
  },

  // Analysis
  // -----------------------------------------------------------------------------
  userItemsRange: state => {
    const items = state.userItems,
      rangeFrom = state.analysis.rangeFrom.replace(/-/g, ''),
      rangeTo = state.analysis.rangeTo.replace(/-/g, '');

    return items.filter(obj => {
      const date = obj.date.replace(/\./g, '');

      return date >= rangeFrom && date <= rangeTo;
    });
  },

  // Setting
  // -----------------------------------------------------------------------------
  chartColor1: state => {
    const color = state.design.colorList[state.design.primaryColor],
      colorRgb = UtilColor.hexToRgb(color).split(','),
      arr = [];

    for (let i = 1; i < 11; i++) {
      const last = parseInt(colorRgb[1]) + (i * 8),
        newColor = `${colorRgb[0]}, ${last},${colorRgb[2]}`,
        idx = i - 1;

      arr[idx] = UtilColor.rgbToHex(newColor);
    }

    return arr;
  },

  chartColor2: state => {
    return state.design.chartColor[state.design.chartIndex];
  },

  chartOptions1: state => {
    const font = state.design.fontFamily;

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'top',
        fontFamily: font,
        labels: {
          fontFamily: font
        }
      },
      label: {
        fontFamily: font
      },
      title: {
        fontFamily: font
      },
      tooltips: {
        titleFontFamily: font,
        bodyFontFamily: font,
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.yLabel.toLocaleString();
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontFamily: font,
            userCallback: function(value) {
              return value.toLocaleString();
            }
          }
        }],
        xAxes: [{
          ticks: {
            fontFamily: font
          }
        }]
      }
    };
  },
  chartOptions2: state => {
    const font = state.design.fontFamily;

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right',
        fontFamily: font,
        labels: {
          fontFamily: font
        }
      },
      label: {
        fontFamily: font
      },
      title: {
        fontFamily: font
      },
      tooltips: {
        titleFontFamily: font,
        bodyFontFamily: font
      }
    };
  }
};
