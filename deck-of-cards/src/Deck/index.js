import Card from '../Card';
import { Suits, Ranks } from '../constants';
import randomInt from '../randomInt';

//  Draw, returns only a few cards
// shuffle should be in place
// compare two cards [ foo of bar , dog of baz ]
// cut, return two "decks", instances of Deck

const Defaults = {
  suits: Suits,
  ranks: Ranks,
  cards: []
};

export default class Deck {
  constructor({
    suits = Defaults.suits,
    ranks = Defaults.ranks,
    cards = Defaults.cards 
  } = Defaults) {
    this.suits = suits;
    this.ranks = ranks;
    this.names = Object.keys(ranks);

    if(cards.length) {
      if(!this._validateCards(cards)) {
        throw new Error('Invalid card array provided to constructor.');
      }
      this._cards = cards;
    } else {
      this.shuffle();
    }
  }

  shuffle() {
    const shuffled = [];
    const cards = this._buildCards();
    while(cards.length > 0) {
      const idx = randomInt({ min: 0, max: cards.length - 1 });
      const card = cards.splice(idx, 1)[0];
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
  draw(num) {
    if(!this._cards.length) {
      return null;
    }

    let numberToDraw = num <= this._cards.length ? num : this._cards.length;
    const cards = this._cards.splice(0, numberToDraw);

    return this._mapCards(cards);
  }

  cards() {
    return this._mapCards(this._cards);
  }

  /*
   * If returns a positive number then the first parameter has
   * higher rank.
   * If returns a negative number then the second parameter has
   * higher rank.
   * If returns zero then the two cards have the same rank.
   * If returns null, then there was an error parsing one of
   * the card strings.
  */
  compare(leftCardStr, rightCardStr) {
    const leftCard = this._parseCard(leftCardStr);
    const rightCard = this._parseCard(rightCardStr);

    if(!leftCard || !rightCard) {
      return null;
    }

    return leftCard.rank - rightCard.rank;
  }

  cut() {
     const { suits, ranks } = this;

    if(this._cards.length <= 1) {
      return null;
    }

    const int = randomInt({ min: 0, max: this._cards.length - 1 });
    const top = this._cards.splice(0, int);
    const bottom = this._cards;

    this._cards = [];

    return [
      new Deck({ suits, ranks, cards: this._mapCards(top) }),
      new Deck({ suits, ranks, cards: this._mapCards(bottom) })
    ];
  }

  _buildCards() {
    const cards = [];
    this.suits.forEach( suit => {
      this.names.forEach( name => {
        cards.push(new Card(suit, name, this.ranks[name]));
      });
    });

    return cards;
  }

  _parseCard(str) {
    const regex = buildCardParsingRegex(this.suits, this.names);
    const match = str.match(regex);

    // Should be three, with first element being the full match,
    // and the 2nd and 3rd elements being the name and suit, respectively.
    if(match === null || match.length !== 3) {
      return null;
    }

    const name = match[1];
    const suit = match[2];
    const rank = this.ranks[name];

    if(!rank) {
      return null;
    }

    return new Card(suit, name, rank);
  }

  _mapCards(cards) {
    return cards.map( card => card.toString() );
  }

  _validateCards(cards) {
    return cards.every( cardStr => this._parseCard(cardStr) !== null );
  }
}

function buildCardParsingRegex(suits, names) {
  const firstGroup = `(${names.join('|')})`;
  const secondGroup = `(${suits.join('|')})`;

  return new RegExp(`${firstGroup} of ${secondGroup}`);
}

