'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _chai = require('chai');

var _randomInt = require('../randomInt');

var _randomInt2 = _interopRequireDefault(_randomInt);

var _testFixtures = require('../../testFixtures');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('randomInt', function () {
  it('should return a number greater than or equal to the min argument', function () {
    var nums = [1, 2, 3];
    nums.forEach(function (num) {
      (0, _chai.expect)((0, _randomInt2.default)({ min: num })).to.be.least(num);
    });
  });

  it('should return a value less than or equal to the max argument', function () {
    var nums = [1, 2, 3];
    nums.forEach(function (num) {
      (0, _chai.expect)((0, _randomInt2.default)({ max: num })).to.be.most(num);
    });
  });

  it('should return a number between the provided min and max values, inclusive', function () {
    var pairs = [[-100, -50], [-100, 100], [0, 100], [1, 100000], [1, 2]];
    pairs.forEach(function (pair) {
      var _pair = _slicedToArray(pair, 2),
          min = _pair[0],
          max = _pair[1];

      (0, _chai.expect)((0, _randomInt2.default)({ min: min, max: max })).to.be.within(min, max);
    });;
  });

  it('should return the provided number if the min and max arguments are equal', function () {
    (0, _chai.expect)((0, _randomInt2.default)({ min: 3, max: 3 })).to.equal(3);
  });

  it('should throw a TypeError if either of the min or max arguments is not an integer', function () {
    _testFixtures.nonNumberThings.forEach(function (thing, idx) {
      // Skip undefined, as the default parameters will be used, and no
      // errors will be thrown.
      if (thing !== undefined) {
        (0, _chai.expect)(_randomInt2.default.bind(null, { min: thing }), idx + 'min').to.throw(TypeError);
        (0, _chai.expect)(_randomInt2.default.bind(null, { max: thing }), idx + 'max').to.throw(TypeError);
        (0, _chai.expect)(_randomInt2.default.bind(null, { min: thing, max: thing }), idx + 'minmax').to.throw(TypeError);
      }
    });
  });

  it('should throw an Error if the min argument is greater than the max', function () {
    (0, _chai.expect)(_randomInt2.default.bind(null, { min: 4, max: 3 })).to.throw(Error);
  });
});