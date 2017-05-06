'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = randomInt;

var _isInt = require('./isInt');

var _isInt2 = _interopRequireDefault(_isInt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Defaults = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER
};

// Returns a random integer between min and max, inclusive of min and max
function randomInt() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Defaults,
      _ref$min = _ref.min,
      min = _ref$min === undefined ? Defaults.min : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === undefined ? Defaults.max : _ref$max;

  if (!(0, _isInt2.default)(min) || !(0, _isInt2.default)(max)) {
    throw new TypeError('A non integer value provided as argument');
  }

  if (min > max) {
    throw new Error('Invalid arguments. The min argument must be less than or equal to the max argument.');
  }

  // Math.random is from 0 to 1, inclusive of 0 but exclusive of 1.
  // Therefore must add 1 to max so that randomInt can be inclusive of max.
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}