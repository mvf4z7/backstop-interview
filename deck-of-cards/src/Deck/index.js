import Card from '../Card';
import { Suits, Ranks } from '../constants';
import randomInt from '../randomInt';

// Todo, pass in cards as a parameter, default to [],
// If populated, then 

export default class Deck {
  constructor(suits = Suits, ranks = Ranks) {
    this.suits = suits;
    this.ranks = ranks;
    this.names = Object.keys(ranks);
    this._cards = this._buildCards();

    this.shuffle();
  }

  shuffle() {
    const shuffled = [];
    while(this._cards.length > 0) {
      const idx = randomInt({ min: 0, max: this._cards.length - 1 });
      const card = this._cards.splice(idx, 1)[0];
      shuffled.push(card);
    }
    this._cards = shuffled;

    return this.cards();
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

  copy() {
    // works!
    return new Deck(this.suits, this.ranks);
  }

  _mapCards(cards) {
    return cards.map( card => card.toString() );
  }
}

function buildCardParsingRegex(suits, names) {
  const firstGroup = `(${names.join('|')})`;
  const secondGroup = `(${suits.join('|')})`;

  return new RegExp(`${firstGroup} of ${secondGroup}`);
}

