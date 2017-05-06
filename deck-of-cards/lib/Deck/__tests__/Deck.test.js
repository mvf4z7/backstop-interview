'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _Card = require('../../Card');

var _Card2 = _interopRequireDefault(_Card);

var _constants = require('../../constants');

var _testFixtures = require('../../testFixtures');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validSeedDeck = [_testFixtures.standardDeck[0], _testFixtures.standardDeck[24], _testFixtures.standardDeck[38]];
var invalidSeedDeck = [_testFixtures.standardDeck[18], 'Foo Bar', _testFixtures.standardDeck[21], _testFixtures.standardDeck[47]];
var invalidCardStrings = ['foo', '2 of spades', 'two of spades', 'two of Spades'];

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
      (0, _chai.expect)(drawn).to.be.null;
    });
  });

  describe('_parseCard', function () {
    it('should return null if argument is falsy', function () {
      var deck = new _2.default();
      _testFixtures.falsyThings.forEach(function (thing) {
        (0, _chai.expect)(deck._parseCard(thing)).to.be.null;
      });
    });

    it('should return null if the passed string is not a valid card string', function () {
      var invalidCardStrings = ['foo', '2 of spades', 'two of spades', 'two of Spades'];
      var deck = new _2.default();
      invalidCardStrings.forEach(function (str) {
        (0, _chai.expect)(deck._parseCard(str)).to.be.null;
      });
    });

    it('should return a properly initialized Card instance if a valid card str is passed in', function () {
      var deck = new _2.default();
      _testFixtures.standardDeck.forEach(function (cardStr) {
        var card = deck._parseCard(cardStr);
        (0, _chai.expect)(card).to.be.instanceOf(_Card2.default);
        (0, _chai.expect)(card.suit).to.be.oneOf(_constants.Suits);
        (0, _chai.expect)(card.name).to.be.oneOf(Object.values(_constants.Names));
        (0, _chai.expect)(card.rank).to.equal(_constants.Ranks[card.name]);
      });
    });
  });

  describe('compare', function () {
    it('should return null if non parseable card strings are provided', function () {
      var deck = new _2.default();
      (0, _chai.expect)(deck.compare()).to.be.null;
      (0, _chai.expect)(deck.compare(invalidCardStrings[0])).to.be.null;
      (0, _chai.expect)(deck.compare(invalidCardStrings[0], invalidCardStrings[1])).to.be.null;
      (0, _chai.expect)(deck.compare(_testFixtures.standardDeck[0])).to.be.null;
      (0, _chai.expect)(deck.compare(invalidCardStrings[0], _testFixtures.standardDeck[1])).to.be.null;
      (0, _chai.expect)(deck.compare(_testFixtures.standardDeck[0], invalidCardStrings[0])).to.be.null;
    });

    it('should should return the difference of the ranks of the two cards', function () {
      var rankFour = new _Card2.default(_constants.Suits[0], _constants.Names.four, _constants.Ranks[_constants.Names.four]);
      var rankEight = new _Card2.default(_constants.Suits[0], _constants.Names.eight, _constants.Ranks[_constants.Names.eight]);
      var deck = new _2.default();
      (0, _chai.expect)(deck.compare(rankFour.toString(), rankEight.toString())).to.equal(4 - 8);
      (0, _chai.expect)(deck.compare(rankEight.toString(), rankFour.toString())).to.equal(8 - 4);
      (0, _chai.expect)(deck.compare(rankFour.toString(), rankFour.toString())).to.equal(0);
    });
  });

  describe('cut', function () {
    it('should return null if the deck only has one card remaining', function () {
      var cards = _testFixtures.standardDeck.slice(0, 1);
      var deck = new _2.default({ cards: cards });
      (0, _chai.expect)(deck.cut()).to.be.null;
    });

    it('should return an array of two new Deck instances if the deck can be cut', function () {
      var deck = new _2.default();
      var cuts = deck.cut();
      (0, _chai.expect)(cuts).to.have.length(2);
      (0, _chai.expect)(cuts[0]).to.be.instanceOf(_2.default);
      (0, _chai.expect)(cuts[1]).to.be.instanceOf(_2.default);
    });

    it('should split the original deck\'s cards between the two new decks', function () {
      var deck = new _2.default();
      var originalCards = deck.cards();
      var cuts = deck.cut();
      var cutOneCards = cuts[0].cards();
      var cutTwoCards = cuts[1].cards();

      (0, _chai.expect)(cutOneCards.length + cutTwoCards.length).to.equal(originalCards.length);
      (0, _chai.expect)(originalCards).to.include.members(cutOneCards);
      (0, _chai.expect)(originalCards).to.include.members(cutTwoCards);
      cutOneCards.forEach(function (card) {
        (0, _chai.expect)(card).to.not.be.oneOf(cutTwoCards);
      });
      cutTwoCards.forEach(function (card) {
        (0, _chai.expect)(card).to.not.be.oneOf(cutOneCards);
      });
    });

    it('should render the cut deck empty', function () {
      var deck = new _2.default();
      deck.cut();
      (0, _chai.expect)(deck.cards()).to.have.length(0);
    });
  });

  describe('_buildCards', function () {
    it('should use the provided Suits and Ranks config to build a deck', function () {
      var cards = _2.default.prototype._buildCards(_constants.Suits, _constants.Ranks);
      (0, _chai.expect)(cards).to.have.length(_testFixtures.standardDeck.length);

      var stringifiedCards = cards.map(function (card) {
        return card.toString();
      });
      _testFixtures.standardDeck.forEach(function (cardStr) {
        (0, _chai.expect)(cardStr).to.be.oneOf(stringifiedCards);
      });
    });
  });
});