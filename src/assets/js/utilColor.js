/**
 * 색상 관련 유틸 함수
 */

export default {
  /**
   * Hex코드를 Hex코드로
   * @param {String} hexType
   * @returns {String}
   */
  hexToRgb(hexType) {
    let hex = hexType.replace('#', ''),
      value = hex.match(/[a-f\d]/gi);

    if (value.length === 3) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];

    value = hex.match(/[a-f\d]{2}/gi);

    return `${parseInt(value[0], 16)}, ${parseInt(value[1], 16)}, ${parseInt(value[2], 16)}`;
  },

  /**
   * Rgb컬러를 Hex코드로
   * @param {String} rgbType
   * @returns {String}
   */
  rgbToHex(rgbType) {
    const rgb = rgbType.replace(/[^%,.\d]/gi, '').split(','),
      toHex = function(string) {
        string = parseInt(string, 10).toString(16);
        string = (string.length === 1) ? '0' + string : string;

        return string;
      };

    for (let x = 0; x < 3; x++) {
      if (rgb[x].indexOf('%') > -1) rgb[x] = Math.round(parseFloat(rgb[x]) * 2.55);
    }

    return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
  }
};
