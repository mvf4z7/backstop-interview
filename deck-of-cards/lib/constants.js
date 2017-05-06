'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Ranks;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Suits = exports.Suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

var Names = exports.Names = {
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  ten: '10',
  jack: 'Jack',
  queen: 'Queen',
  king: 'King',
  ace: 'Ace'
};

var Ranks = exports.Ranks = (_Ranks = {}, _defineProperty(_Ranks, Names.two, 2), _defineProperty(_Ranks, Names.three, 3), _defineProperty(_Ranks, Names.four, 4), _defineProperty(_Ranks, Names.five, 5), _defineProperty(_Ranks, Names.six, 6), _defineProperty(_Ranks, Names.seven, 7), _defineProperty(_Ranks, Names.eight, 8), _defineProperty(_Ranks, Names.nine, 9), _defineProperty(_Ranks, Names.ten, 10), _defineProperty(_Ranks, Names.jack, 11), _defineProperty(_Ranks, Names.queen, 12), _defineProperty(_Ranks, Names.king, 13), _defineProperty(_Ranks, Names.ace, 14), _Ranks);