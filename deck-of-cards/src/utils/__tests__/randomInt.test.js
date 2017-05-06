import { expect } from 'chai';

import randomInt from '../randomInt';
import { nonNumberThings } from '../../testFixtures';

describe('randomInt', function() {
  it('should return a number greater than or equal to the min argument', function() {
    const nums = [ 1, 2, 3 ];
    nums.forEach( num => {
      expect(randomInt({ min: num })).to.be.least(num);
    });
  });

  it('should return a value less than or equal to the max argument', function() {
    const nums = [ 1, 2, 3 ];
    nums.forEach( num => {
      expect(randomInt({ max: num })).to.be.most(num);
    });
  });

  it('should return a number between the provided min and max values, inclusive', function() {
    var pairs = [
      [ -100, -50 ],
      [ -100, 100 ],
      [ 0, 100 ],
      [ 1, 100000 ],
      [ 1, 2]
    ];
    pairs.forEach( pair => {
      const [ min, max ] = pair;
      expect(randomInt({ min, max })).to.be.within(min, max);
    });;
  });

  it('should return the provided number if the min and max arguments are equal', function() {
    expect(randomInt({ min: 3, max: 3 })).to.equal(3);
  });

  it('should throw a TypeError if either of the min or max arguments is not an integer', function() {
    nonNumberThings.forEach( (thing, idx) => {
      // Skip undefined, as the default parameters will be used, and no
      // errors will be thrown.
      if(thing !== undefined ) {
        expect(randomInt.bind(null, { min: thing }), idx + 'min').to.throw(TypeError);
        expect(randomInt.bind(null, { max: thing }), idx + 'max').to.throw(TypeError);
        expect(randomInt.bind(null, { min: thing, max: thing }), idx+ 'minmax').to.throw(TypeError);
      }
    });
  });

  it('should throw an Error if the min argument is greater than the max', function() {
    expect(randomInt.bind(null, { min: 4, max: 3 })).to.throw(Error);
  });
});