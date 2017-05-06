import { expect } from 'chai';
import sinon from 'sinon';

import Deck from '../';
import { Suits, Ranks } from '../../constants';
import { standardDeck } from '../../testFixtures';

const validSeedDeck = [ standardDeck[0], standardDeck[24], standardDeck[38] ];
const invalidSeedDeck = [ standardDeck[18], 'Foo Bar', standardDeck[21], standardDeck[47] ];

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
      expect(deck.cards()).to.have.length(standardDeck.length);
      expect(deck.cards()).to.include.members(standardDeck);

      let deck = new Deck({ cards: validSeedDeck });
      expect(deck.cards()).to.have.length(3);
      expect(deck.cards()).to.include.members(validSeedDeck);
    });
  });

  describe('shuffle', function() {
    it('should return a reference to the deck', function() {
      const deck = new Deck();
      expect(deck.shuffle()).to.equal(deck);
    });

    it('should rebuild a full deck, regardless of the current state of the deck', function() {
      const deck = new Deck({ cards: validSeedDeck });
      expect(deck.cards()).to.have.length(validSeedDeck.length);

      deck.shuffle();
      expect(deck.cards()).to.have.length(standardDeck.length);
      expect(deck.cards()).to.include.members(standardDeck);
    });

    it('should reorder the cards in the deck', function() {
      const deck = new Deck();
      const initialOrder = deck.cards();
      const newOrder = deck.shuffle().cards();

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
      expect(deck.cards()).to.have.length(standardDeck.length - numberToDraw);
      expect(deck.cards()).to.not.include.members(drawn);
    });

    it('should return all of the remaining cards if more cards were requested than what are available in the deck', function() {
      const numberToDraw = validSeedDeck.length + 1;
      const deck = new Deck({ cards: validSeedDeck });
      const drawn = deck.draw(numberToDraw);

      expect(drawn).to.have.length(validSeedDeck.length);
      expect(deck.cards()).to.have.length(0);
    });

    it('should return null if called on an empty deck', function() {
      const deck = new Deck({ cards: [ standardDeck[0] ] });
      let drawn = deck.draw(1);
      expect(deck.cards()).to.have.length(0);
      drawn = deck.draw(1);
      expect(drawn).to.equal(null);
    });
  });

  describe('compare', function() {
    
  });

  describe('cut', function() {

  });

  describe('_buildCards', function() {

  });

  describe('_parseCard', function() {

  });
});