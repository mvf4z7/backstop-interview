'use strict';

var _chai = require('chai');

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Card', function () {
  var suit = void 0,
      name = void 0,
      rank = void 0;

  beforeEach(function () {
    suit = 'foo';
    name = 'bar';
    rank = 1;
  });

  describe('constructor', function () {
    it('should use the constructor arguments to set the suit, name and rank properties', function () {
      var card = new _2.default(suit, name, rank);
      (0, _chai.expect)(card.suit).to.equal(suit);
      (0, _chai.expect)(card.name).to.equal(name);
      (0, _chai.expect)(card.rank).to.equal(rank);
    });
  });

  describe('valueOf', function () {
    it('should return the rank property', function () {
      var card = new _2.default(suit, name, rank);
      (0, _chai.expect)(card.valueOf()).to.equal(rank);
    });
  });

  describe('toString', function () {
    it('should return a properly formatted string', function () {
      var card = new _2.default(suit, name, rank);
      (0, _chai.expect)(card.toString()).to.equal(name + ' of ' + suit);
    });
  });
});