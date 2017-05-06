import { expect } from 'chai';

import Card from '../';

describe('Card', function() {
  let suit, name, rank;

  beforeEach(function() {
    suit = 'foo';
    name = 'bar';
    rank = 1;
  });

  describe('constructor', function() {
    it('should use the constructor arguments to set the suit, name and rank properties', function() {
      const card = new Card(suit, name, rank);
      expect(card.suit).to.equal(suit);
      expect(card.name).to.equal(name);
      expect(card.rank).to.equal(rank);
    });
  });

  describe('valueOf', function() {
    it('should return the rank property', function() {
      const card = new Card(suit, name, rank);
      expect(card.valueOf()).to.equal(rank);
    });
  });

  describe('toString', function() {
    it('should return a properly formatted string', function() {
      const card = new Card(suit, name, rank);
      expect(card.toString()).to.equal(`${name} of ${suit}`);
    });
  });
});