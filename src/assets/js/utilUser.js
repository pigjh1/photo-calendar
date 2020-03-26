/**
 * 사용자 정보 관련 유틸 함수
 */

export default {
  /**
   * 전화번호 형식 변경
   * @param  {Number} num   '-' 문자가 들어있지않은 숫자로된 전화번호
   * @param  {Number} type  0을 보내면 가운데자리를 숨겨줌
   * @return {String}
   */
  phoneFomatter(num, type) {
    var formatNum = '';

    if (num.length === 11) {
      if (type === 0) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
      } else {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
    } else if (num.length === 8) {
      formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else {
      if (num.indexOf('02') === 0) {
        if (type === 0) {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
        } else {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }
      } else {
        if (type === 0) {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
        } else {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
      }
    }

    return formatNum;
  },

  /**
   * 이름 마지막 글자 * 처리 (e.g. 홍길동 → 홍길*)
   * @param  {String} strName
   * @return {String}
   */
  maskingName(strName) {
    if (strName === undefined || strName === '') {
      return '';
    }
    var pattern = /.$/; // 정규식
    return strName.replace(pattern, '*');
  },

  /**
   * 차량번호 뒤에서 부터 3글자를 * 처리 (e.g. 12가3456 → 12가3***)
   * @param  {String} strCar
   * @return {String}
   */
  maskingCar(strCar) {
    if (strCar === undefined || strCar === '') {
      return '';
    }
    var pattern = /.{3}$/; // 정규식
    return strCar.replace(pattern, '***');
  },

  /**
   * 이메일 * 처리
   * @param  {String} email
   * @return {String}
   */
  maskingEmail(email) {
    const len = email.split('@')[0].length - 4;
    return email.replace(new RegExp('.(?=.{0,' + len + '}@)', 'g'), '*');
  }
};
