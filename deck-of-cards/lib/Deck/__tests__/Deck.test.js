'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _constants = require('../../constants');

var _testFixtures = require('../../testFixtures');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Deck', function () {
  describe('constructor', function () {
    it('should default the suits, names and ranks properties to the standard playing card suits, ranks, and names', function () {
      var deck = new _2.default();
      (0, _chai.expect)(deck.suits).to.deep.equal(_constants.Suits);
      (0, _chai.expect)(deck.ranks).to.deep.equal(_constants.Ranks);

      var names = Object.keys(_constants.Ranks);
      (0, _chai.expect)(deck.names).to.have.length(names.length);
      (0, _chai.expect)(deck.names).to.include.members(names);
    });

    it('should shuffle the cards if a seed deck is not provided', function () {
      var spy = _sinon2.default.spy(_2.default.prototype, 'shuffle');
      var deck = new _2.default();
      (0, _chai.expect)(deck.shuffle.calledOnce).to.be.true;
      spy.restore();
    });

    it('should validate a seed deck if one is provided', function () {
      var spy = _sinon2.default.spy(_2.default.prototype, '_validateCards');
      var cards = _testFixtures.standardDeck.slice(0, 1);
      var deck = new _2.default({ cards: cards });
      (0, _chai.expect)(deck._validateCards.calledOnce).to.be.true;
      (0, _chai.expect)(deck._validateCards.calledWith(cards)).to.be.true;
      spy.restore();
    });

    it('should throw an error if the provided seed deck is not valid', function () {
      var spy = _sinon2.default.stub(_2.default.prototype, '_validateCards', function () {
        return false;
      });

      var shouldThrow = function shouldThrow() {
        var cards = _testFixtures.standardDeck.slice(0, 1);
        var deck = new _2.default({ cards: cards });
      };
      (0, _chai.expect)(shouldThrow).to.throw(Error);
      spy.restore();
    });

    it('should set the _cards property equal to the seed deck ');
  });
});