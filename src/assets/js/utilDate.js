/**
 * 날짜,시간 관련 유틸 함수
 */

export default {
  /**
   * Validates a date object
   * @param {Date} date - an object instantiated with the new Date constructor
   * @return {Boolean}
   */
  isValidDate(date) {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return false;
    }
    return !isNaN(date.getTime());
  },

  /**
   * Return abbreviated week day name
   * @param {Date}
   * @param {Array}
   * @return {String}
   */
  getDayNameAbbr(date, days) {
    if (typeof date !== 'object') {
      throw TypeError('Invalid Type');
    }
    return days[date.getDay()];
  },

  /**
   * Return 2 digit format of the month
   * @param {Date}
   * @return {String}
   */
  getMonthNumber(date) {
    const m = date.getMonth() + 1;
    return m < 10 ? '0' + m : '' + m;
  },

  /**
   * Return name of the month
   * @param {Number|Date}
   * @param {Array}
   * @return {String}
   */
  getMonthName(month, months) {
    if (!months) {
      throw Error('missing 2nd parameter Months array');
    }
    if (typeof month === 'object') {
      return months[month.getMonth()];
    }
    if (typeof month === 'number') {
      return months[month];
    }
    throw TypeError('Invalid type');
  },

  /**
   * Return an abbreviated version of the month
   * @param {Number|Date}
   * @return {String}
   */
  getMonthNameAbbr(month, monthsAbbr) {
    if (!monthsAbbr) {
      throw Error('missing 2nd paramter Months array');
    }
    if (typeof month === 'object') {
      return monthsAbbr[month.getMonth()];
    }
    if (typeof month === 'number') {
      return monthsAbbr[month];
    }
    throw TypeError('Invalid type');
  },

  /**
   * Alternative get total number of days in month
   * @param {Number} year
   * @param {Number} m
   * @return {Number}
   */
  daysInMonth(year, month) {
    return /8|3|5|10/.test(month) ? 30 : month === 1 ? (!(year % 4) && year % 100) || !(year % 400) ? 29 : 28 : 31;
  },

  /**
   * Get nth suffix for date
   * @param {Number} day
   * @return {String}
   */
  getNthSuffix(day) {
    switch (day) {
    case 1:
    case 21:
    case 31:
      return 'st';
    case 2:
    case 22:
      return 'nd';
    case 3:
    case 23:
      return 'rd';
    default:
      return 'th';
    }
  },

  /**
   * Formats date object
   * @param {Date}
   * @param {String}
   * @return {String}
   */
  formatDate(date, format) {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'],
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      gdate = date.getDate(),
      day = daysOfWeek[date.getDay()],
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();

    return format
      .replace(/dd/, ('0' + gdate).slice(-2))
      .replace(/d/, gdate)
      .replace(/yyyy/, year)
      .replace(/yy/, String(year).slice(2))
      .replace(/MM/, ('0' + month).slice(-2))
      .replace(/M(?!a|ä)/, month)
      .replace(/DAY/, day)
      .replace(/su/, this.getNthSuffix(gdate))
      .replace(/HH/, ('0' + hours).slice(-2))
      .replace(/H/, hours)
      .replace(/TT/, ('0' + minutes).slice(-2))
      .replace(/T/, minutes)
      .replace(/SS/, ('0' + seconds).slice(-2))
      .replace(/S/, seconds);
  },

  /**
   * Creates an array of dates for each day in between two dates.
   * @param {Date} start
   * @param {Date} end
   * @return {Array}
   */
  createDateArray(start, end) {
    const dates = [];
    while (start <= end) {
      dates.push(new Date(start));
      start = new Date(start).setDate(new Date(start).getDate() + 1);
    }
    return dates;
  },

  /**
   * 시작일 구하기
   * @param {Number} month - 월
   * @param {Array} day - 요일
   * @return {Number} result - 해당하는 날짜
   */
  getStartDay(month, day) {
    const firstResult = this.getMondayOfMonth(month, day[0]),
      maxResult = this.getMondayOfMonth(month, 6);
    let newResult,
      result = 0;

    for (let i = 0; i < day.length; i++) {
      newResult = this.getMondayOfMonth(month, parseInt(day[i]));

      if (newResult > result && newResult < maxResult) {
        result = newResult;
      }
    }

    if (result === 0) result = firstResult;

    return result;
  },

  /**
   * 원하는 달의 원하는 요일의 첫 날짜 구하기 (e.g. 10월 수요일의 첫 날짜 구하기)
   * @param {Number} month - 월
   * @param {Number} day - 요일
   * @return {Number} result - 해당하는 날짜
   */
  getMondayOfMonth(month, day) {
    const date = new Date();
    let newYear, result;

    if (month >= 12) {
      newYear = date.getFullYear() + 1;
      month = month % 12;
    }

    for (let j = 0; j < 12; j++) {
      if (j === (month)) {
        for (let i = 1; i < 31; i++) {
          if (newYear) {
            date.setYear(newYear);
          }
          date.setMonth(j);
          date.setDate(i);
          if (date.getDay() === day) {
            result = date.getDate();
            break;
          }
        }
      }
    }
    return result;
  },

  /**
   * 월의 마지막날 구하기
   */
  getEndOfDay(year, month) {
    switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
        return 29;
      } else {
        return 28;
      }
    default:
      console.log('unknown month ' + month);
      return 0;
    }
  },

  /**
   * 날짜 포맷팅
   * @param {String} year, month, day
   * @returns {String} YYYY-MM-DD
   */
  getDateFormat(year, month, day) {
    const m = parseInt(month) < 10 ? '0' + month : month,
      d = parseInt(day) < 10 ? '0' + day : day;

    return `${year}-${m}-${d}`;
  },

  /**
   * 시간 포맷팅
   * @param {String} hours, minutes
   * @returns {String} HH:MM
   */
  getTimeFormat(hours, minutes) {
    const h = parseInt(hours) < 10 ? '0' + hours : hours,
      m = parseInt(minutes) < 10 ? '0' + minutes : minutes;

    return `${h}:${m}`;
  }
};
