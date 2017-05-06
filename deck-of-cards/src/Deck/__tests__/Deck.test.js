import { expect } from 'chai';
import sinon from 'sinon';

import Deck from '../';
import { Suits, Ranks } from '../../constants';
import { standardDeck } from '../../testFixtures';

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

    it('should validate a seed deck if one is provided', function() {
      const spy = sinon.spy(Deck.prototype, '_validateCards');
      const cards = standardDeck.slice(0, 1);
      const deck = new Deck({ cards });
      expect(deck._validateCards.calledOnce).to.be.true;
      expect(deck._validateCards.calledWith(cards)).to.be.true;
      spy.restore();
    });

    it('should throw an error if the provided seed deck is not valid', function() {
      const spy = sinon.stub(Deck.prototype, '_validateCards', () => false );
  
      const shouldThrow = () => {
        const cards = standardDeck.slice(0, 1);
        const deck = new Deck({ cards });
      }
      expect(shouldThrow).to.throw(Error);
      spy.restore();
    });

    it('should set the _cards property equal to the seed deck ')
  });



});