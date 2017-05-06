'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.buildCardParsingRegex = buildCardParsingRegex;

var _Card = require('../Card');

var _Card2 = _interopRequireDefault(_Card);

var _constants = require('../constants');

var _randomInt = require('../utils/randomInt');

var _randomInt2 = _interopRequireDefault(_randomInt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//  Draw, returns only a few cards
// shuffle should be in place
// compare two cards [ foo of bar , dog of baz ]
// cut, return two "decks", instances of Deck

var Defaults = {
  suits: _constants.Suits,
  ranks: _constants.Ranks,
  cards: []
};

var Deck = function () {
  function Deck() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Defaults,
        _ref$suits = _ref.suits,
        suits = _ref$suits === undefined ? Defaults.suits : _ref$suits,
        _ref$ranks = _ref.ranks,
        ranks = _ref$ranks === undefined ? Defaults.ranks : _ref$ranks,
        _ref$cards = _ref.cards,
        cards = _ref$cards === undefined ? Defaults.cards : _ref$cards;

    _classCallCheck(this, Deck);

    this.suits = suits;
    this.ranks = ranks;
    this.names = Object.keys(ranks);

    if (cards.length) {
      var parsedCards = cards.map(this._parseCard.bind(this));
      if (parsedCards.indexOf(null) !== -1) {
        throw new Error('Invalid cards argument. Unable to parse all cards');
      }
      this._cards = parsedCards;
    } else {
      this.shuffle();
    }
  }

  _createClass(Deck, [{
    key: 'shuffle',
    value: function shuffle() {
      var shuffled = [];
      var cards = this._buildCards(this.suits, this.ranks);
      while (cards.length > 0) {
        var idx = (0, _randomInt2.default)({ min: 0, max: cards.length - 1 });
        var card = cards.splice(idx, 1)[0];
        shuffled.push(card);
      }
      this._cards = shuffled;

      return this;
    }

    /*
     * Will attempt to draw num cards from the top of the deck, where the top 
     * is considered to be the card at index zero of the _cards array. If
     * num is greater than the number of remaining cards, then all of the
     * remaining cards are returned. 
     * 
     * If there are no cards remaining, then null is returned.
    */

  }, {
    key: 'draw',
    value: function draw(num) {
      if (!this._cards.length) {
        return null;
      }

      var numberToDraw = num <= this._cards.length ? num : this._cards.length;
      var drawnCards = this._cards.splice(0, numberToDraw);

      return this._mapCards(drawnCards);
    }
  }, {
    key: 'compare',


    /*
     * If returns a positive number then the first parameter has
     * higher rank.
     * If returns a negative number then the second parameter has
     * higher rank.
     * If returns zero then the two cards have the same rank.
     * If returns null, then there was an error parsing one of
     * the card strings.
    */
    value: function compare(leftCardStr, rightCardStr) {
      var leftCard = this._parseCard(leftCardStr);
      var rightCard = this._parseCard(rightCardStr);

      if (!leftCard || !rightCard) {
        return null;
      }

      return leftCard.rank - rightCard.rank;
    }
  }, {
    key: 'cut',
    value: function cut() {
      var suits = this.suits,
          ranks = this.ranks;


      if (this._cards.length <= 1) {
        return null;
      }

      var int = (0, _randomInt2.default)({ min: 0, max: this._cards.length - 1 });
      var top = this._cards.splice(0, int);
      var bottom = this._cards;

      this._cards = [];

      return [new Deck({ suits: suits, ranks: ranks, cards: this._mapCards(top) }), new Deck({ suits: suits, ranks: ranks, cards: this._mapCards(bottom) })];
    }
  }, {
    key: '_buildCards',
    value: function _buildCards(suits, ranks) {
      var names = Object.keys(ranks);
      var cards = [];
      suits.forEach(function (suit) {
        names.forEach(function (name) {
          cards.push(new _Card2.default(suit, name, ranks[name]));
        });
      });

      return cards;
    }
  }, {
    key: '_parseCard',
    value: function _parseCard(str) {
      if (!str) return null;
      var regex = buildCardParsingRegex(this.suits, this.names);
      var match = str.match(regex);

      // Should be three, with first element being the full match,
      // and the 2nd and 3rd elements being the name and suit matches, respectively.
      if (match === null || match.length !== 3) {
        return null;
      }

      var name = match[1];
      var suit = match[2];
      var rank = this.ranks[name];

      if (!rank) {
        return null;
      }

      return new _Card2.default(suit, name, rank);
    }
  }, {
    key: '_mapCards',
    value: function _mapCards(cards) {
      return cards.map(function (card) {
        return card.toString();
      });
    }
  }, {
    key: 'cards',
    get: function get() {
      return this._mapCards(this._cards);
    }
  }]);

  return Deck;
}();

exports.default = Deck;
function buildCardParsingRegex(suits, names) {
  var firstGroup = '(' + names.join('|') + ')';
  var secondGroup = '(' + suits.join('|') + ')';

  return new RegExp(firstGroup + ' of ' + secondGroup);
}