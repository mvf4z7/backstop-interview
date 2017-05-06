'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;
function isNumber(n) {
  return typeof n === 'number' && !isNaN(parseFloat(n)) && isFinite(n);
}