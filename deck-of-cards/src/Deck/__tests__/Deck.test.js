import { expect } from 'chai';
import sinon from 'sinon';

import Deck from '../';
import Card from '../../Card';
import { Suits, Ranks, Names } from '../../constants';
import { standardDeck, falsyThings } from '../../testFixtures';

const validSeedDeck = [ standardDeck[0], standardDeck[24], standardDeck[38] ];
const invalidSeedDeck = [ standardDeck[18], 'Foo Bar', standardDeck[21], standardDeck[47] ];
const invalidCardStrings = [
  'foo',
  '2 of spades',
  'two of spades',
  'two of Spades',
];

describe('Deck' , function() {
  describe('constructor', function() {
    it('should default the suits, names and ranks properties to the standard playing card suits, ranks, and names', function() {
      const deck = new Deck();
      expect(deck.suits).to.deep.equal(Suits);
      expect(deck.ranks).to.deep.equal(Ranks);

      const names = Object.keys(Ranks);
      expect(deck.names).to.have.length(names.length);
      expect(deck.names).to.include.members(names);
    });

    it('should shuffle the cards if a seed deck is not provided', function() {
      const spy = sinon.spy(Deck.prototype, 'shuffle');
      const deck = new Deck();
      expect(deck.shuffle.calledOnce).to.be.true;
      spy.restore();
    });

    it('should throw an error if the provided seed deck is not able to be parsed', function() {
      const shouldThrow = () => {
        const deck = new Deck({ cards: invalidSeedDeck });
      }
      expect(shouldThrow).to.throw(Error);
    });

    it('should set the _cards property to the parsed cards if the provided cards are valid', function() {
      const deck = new Deck({ cards: validSeedDeck });
      expect(deck._cards).to.have.length(validSeedDeck.length);
      deck._cards.forEach( card => {
        expect(card.toString()).to.be.oneOf(validSeedDeck);
      });
    });
  });

  describe('cards', function() {
    it('should return the string representation of all the cards currently in the deck', function() {
      deck = new Deck();
      expect(deck.cards).to.have.length(standardDeck.length);
      expect(deck.cards).to.include.members(standardDeck);

      let deck = new Deck({ cards: validSeedDeck });
      expect(deck.cards).to.have.length(3);
      expect(deck.cards).to.include.members(validSeedDeck);
    });
  });

  describe('shuffle', function() {
    it('should return a reference to the deck', function() {
      const deck = new Deck();
      expect(deck.shuffle()).to.equal(deck);
    });

    it('should rebuild a full deck, regardless of the current state of the deck', function() {
      const deck = new Deck({ cards: validSeedDeck });
      expect(deck.cards).to.have.length(validSeedDeck.length);

      deck.shuffle();
      expect(deck.cards).to.have.length(standardDeck.length);
      expect(deck.cards).to.include.members(standardDeck);
    });

    it('should reorder the cards in the deck', function() {
      const deck = new Deck();
      const initialOrder = deck.cards;
      const newOrder = deck.shuffle().cards;

      expect(newOrder).to.include.members(initialOrder);
      expect(newOrder).to.not.deep.equal(initialOrder);
    });
  });

  describe('draw', function() {
    it('should return an array with the number of requested cards, given that there are enough cards remaining in the deck', function() {
      const numberToDraw = 3;
      const deck = new Deck();
      const drawn = deck.draw(numberToDraw);

      expect(drawn).to.have.length(numberToDraw);
      expect(standardDeck).to.include.members(drawn);
      expect(deck.cards).to.have.length(standardDeck.length - numberToDraw);
      expect(deck.cards).to.not.include.members(drawn);
    });

    it('should return all of the remaining cards if more cards were requested than what are available in the deck', function() {
      const numberToDraw = validSeedDeck.length + 1;
      const deck = new Deck({ cards: validSeedDeck });
      const drawn = deck.draw(numberToDraw);

      expect(drawn).to.have.length(validSeedDeck.length);
      expect(deck.cards).to.have.length(0);
    });

    it('should return null if called on an empty deck', function() {
      const deck = new Deck({ cards: [ standardDeck[0] ] });
      let drawn = deck.draw(1);
      expect(deck.cards).to.have.length(0);
      drawn = deck.draw(1);
      expect(drawn).to.be.null
    });
  });

  describe('_parseCard', function() {
    it('should return null if argument is falsy', function() {
      const deck = new Deck();
      falsyThings.forEach( thing => {
        expect(deck._parseCard(thing)).to.be.null;  
      });
    });

    it('should return null if the passed string is not a valid card string', function() {
      const invalidCardStrings = [
        'foo',
        '2 of spades',
        'two of spades',
        'two of Spades',
      ];
      const deck = new Deck();
      invalidCardStrings.forEach( str => {
        expect(deck._parseCard(str)).to.be.null;
      });
    });

    it('should return a properly initialized Card instance if a valid card str is passed in', function() {
      const deck = new Deck();
      standardDeck.forEach( cardStr => {
        const card = deck._parseCard(cardStr);
        expect(card).to.be.instanceOf(Card);
        expect(card.suit).to.be.oneOf(Suits);
        expect(card.name).to.be.oneOf(Object.values(Names));
        expect(card.rank).to.equal(Ranks[card.name]);
      });
    });
  });

  describe('compare', function() {
    it('should return null if non parseable card strings are provided', function() {
      const deck = new Deck();
      expect(deck.compare()).to.be.null;
      expect(deck.compare(invalidCardStrings[0])).to.be.null;
      expect(deck.compare(invalidCardStrings[0], invalidCardStrings[1])).to.be.null;
      expect(deck.compare(standardDeck[0])).to.be.null;
      expect(deck.compare(invalidCardStrings[0], standardDeck[1])).to.be.null;
      expect(deck.compare(standardDeck[0], invalidCardStrings[0])).to.be.null;
    });

    it('should should return the difference of the ranks of the two cards', function() {
      const rankFour = new Card(Suits[0], Names.four, Ranks[Names.four]);
      const rankEight = new Card(Suits[0], Names.eight, Ranks[Names.eight]);
      const deck = new Deck();
      expect(deck.compare(rankFour.toString(), rankEight.toString())).to.equal(4 - 8);
      expect(deck.compare(rankEight.toString(), rankFour.toString())).to.equal(8 - 4);
      expect(deck.compare(rankFour.toString(), rankFour.toString())).to.equal(0);
    });
  });

  describe('cut', function() {
    it('should return null if the deck only has one card remaining', function() {
      const cards = standardDeck.slice(0, 1);
      const deck = new Deck({ cards });
      expect(deck.cut()).to.be.null;
    });

    it('should return an array of two new Deck instances if the deck can be cut', function() {
      const deck = new Deck();
      const cuts = deck.cut();
      expect(cuts).to.have.length(2);
      expect(cuts[0]).to.be.instanceOf(Deck);
      expect(cuts[1]).to.be.instanceOf(Deck);
    });

    it('should split the original deck\'s cards between the two new decks', function() {
      const deck = new Deck();
      const originalCards = deck.cards;
      const cuts = deck.cut();

      expect(cuts[0].cards.length + cuts[1].cards.length).to.equal(originalCards.length);
      expect(originalCards).to.include.members(cuts[0].cards);
      expect(originalCards).to.include.members(cuts[1].cards);
      cuts[0].cards.forEach( card => {
        expect(card).to.not.be.oneOf(cuts[1].cards);
      });
      cuts[1].cards.forEach( card => {
        expect(card).to.not.be.oneOf(cuts[0].cards);
      });
    });

    it('should render the cut deck empty', function() {
      const deck = new Deck();
      deck.cut();
      expect(deck.cards).to.have.length(0);
    });
  });

  describe('_buildCards', function() {
    it('should use the provided Suits and Ranks config to build a deck', function() {
      const cards = Deck.prototype._buildCards(Suits, Ranks);
      expect(cards).to.have.length(standardDeck.length);
      
      const stringifiedCards = cards.map( card => card.toString() );
      standardDeck.forEach( cardStr => {
        expect(cardStr).to.be.oneOf(stringifiedCards);
      });
    });
  });
});