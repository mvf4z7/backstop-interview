'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _constants = require('../../constants');

var _testFixtures = require('../../testFixtures');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validSeedDeck = [_testFixtures.standardDeck[0], _testFixtures.standardDeck[24], _testFixtures.standardDeck[38]];
var invalidSeedDeck = [_testFixtures.standardDeck[18], 'Foo Bar', _testFixtures.standardDeck[21], _testFixtures.standardDeck[47]];

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

    it('should throw an error if the provided seed deck is not able to be parsed', function () {
      var shouldThrow = function shouldThrow() {
        var deck = new _2.default({ cards: invalidSeedDeck });
      };
      (0, _chai.expect)(shouldThrow).to.throw(Error);
    });

    it('should set the _cards property to the parsed cards if the provided cards are valid', function () {
      var deck = new _2.default({ cards: validSeedDeck });
      (0, _chai.expect)(deck._cards).to.have.length(validSeedDeck.length);
      deck._cards.forEach(function (card) {
        (0, _chai.expect)(card.toString()).to.be.oneOf(validSeedDeck);
      });
    });
  });

  describe('cards', function () {
    it('should return the string representation of all the cards currently in the deck', function () {
      deck = new _2.default();
      (0, _chai.expect)(deck.cards()).to.have.length(_testFixtures.standardDeck.length);
      (0, _chai.expect)(deck.cards()).to.include.members(_testFixtures.standardDeck);

      var deck = new _2.default({ cards: validSeedDeck });
      (0, _chai.expect)(deck.cards()).to.have.length(3);
      (0, _chai.expect)(deck.cards()).to.include.members(validSeedDeck);
    });
  });

  describe('shuffle', function () {
    it('should return a reference to the deck', function () {
      var deck = new _2.default();
      (0, _chai.expect)(deck.shuffle()).to.equal(deck);
    });

    it('should rebuild a full deck, regardless of the current state of the deck', function () {
      var deck = new _2.default({ cards: validSeedDeck });
      (0, _chai.expect)(deck.cards()).to.have.length(validSeedDeck.length);

      deck.shuffle();
      (0, _chai.expect)(deck.cards()).to.have.length(_testFixtures.standardDeck.length);
      (0, _chai.expect)(deck.cards()).to.include.members(_testFixtures.standardDeck);
    });

    it('should reorder the cards in the deck', function () {
      var deck = new _2.default();
      var initialOrder = deck.cards();
      var newOrder = deck.shuffle().cards();

      (0, _chai.expect)(newOrder).to.include.members(initialOrder);
      (0, _chai.expect)(newOrder).to.not.deep.equal(initialOrder);
    });
  });

  describe('draw', function () {
    it('should return an array with the number of requested cards, given that there are enough cards remaining in the deck', function () {
      var numberToDraw = 3;
      var deck = new _2.default();
      var drawn = deck.draw(numberToDraw);

      (0, _chai.expect)(drawn).to.have.length(numberToDraw);
      (0, _chai.expect)(_testFixtures.standardDeck).to.include.members(drawn);
      (0, _chai.expect)(deck.cards()).to.have.length(_testFixtures.standardDeck.length - numberToDraw);
      (0, _chai.expect)(deck.cards()).to.not.include.members(drawn);
    });

    it('should return all of the remaining cards if more cards were requested than what are available in the deck', function () {
      var numberToDraw = validSeedDeck.length + 1;
      var deck = new _2.default({ cards: validSeedDeck });
      var drawn = deck.draw(numberToDraw);

      (0, _chai.expect)(drawn).to.have.length(validSeedDeck.length);
      (0, _chai.expect)(deck.cards()).to.have.length(0);
    });

    it('should return null if called on an empty deck', function () {
      var deck = new _2.default({ cards: [_testFixtures.standardDeck[0]] });
      var drawn = deck.draw(1);
      (0, _chai.expect)(deck.cards()).to.have.length(0);
      drawn = deck.draw(1);
      (0, _chai.expect)(drawn).to.equal(null);
    });
  });

  describe('compare', function () {});

  describe('cut', function () {});

  describe('_buildCards', function () {});

  describe('_parseCard', function () {});
});