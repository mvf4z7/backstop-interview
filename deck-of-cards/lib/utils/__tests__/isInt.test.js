'use strict';

var _chai = require('chai');

var _isInt = require('../isInt');

var _isInt2 = _interopRequireDefault(_isInt);

var _testFixtures = require('../../testFixtures');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('isInt', function () {
  it('should return false for non-number things', function () {
    _testFixtures.nonNumberThings.forEach(function (thing) {
      (0, _chai.expect)((0, _isInt2.default)(thing)).to.be.false;
    });
  });

  it('should return false if a floating point number is passed in', function () {
    (0, _chai.expect)((0, _isInt2.default)(3.14159)).to.be.false;
  });

  it('should return true if an integer is passed in', function () {
    (0, _chai.expect)((0, _isInt2.default)(33)).to.be.true;
  });
});