'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = randomInt;
var Defaults = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER
};

function isInt(num) {
  return num % 1 === 0;
}

// Returns a random integer between min and max, inclusive of min and max
function randomInt() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Defaults,
      _ref$min = _ref.min,
      min = _ref$min === undefined ? Defaults.min : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === undefined ? Defaults.max : _ref$max;

  if (isNaN(min) || isNaN(max)) {
    throw new TypeError('A non number value provided as argument');
  }

  if (!isInt(min) || !isInt(max)) {
    throw new TypeError('A non integer value provided as argument');
  }

  // Math.random is from 0 to 1, inclusive of 0 but exclusive of 1.
  // Therefore must add 1 to max so that randomInt can be inclusive of max.
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}