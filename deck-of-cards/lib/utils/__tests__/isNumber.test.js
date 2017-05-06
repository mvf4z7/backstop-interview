'use strict';

var _chai = require('chai');

var _isNumber = require('../isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _testFixtures = require('../../testFixtures');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('isNumber', function () {
  it('should return false for non-number things', function () {
    _testFixtures.nonNumberThings.forEach(function (thing, idx) {
      (0, _chai.expect)((0, _isNumber2.default)(thing), idx).to.be.false;
    });
  });

  it('should return true if an integer number is provided', function () {
    (0, _chai.expect)((0, _isNumber2.default)(33)).to.be.true;
  });

  it('should return true if a floating point number is provided', function () {
    (0, _chai.expect)((0, _isNumber2.default)(3.14159)).to.be.true;
  });
});