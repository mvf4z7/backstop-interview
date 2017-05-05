export default class Card {
  constructor(suit, name, rank) {
    this.suit = suit;
    this.name = name;
    this.rank = rank;
  }

  valueOf() {
    return this.rank;
  }

  toString() {
    return `${this.name} of ${this.suit}`;
  }
}
