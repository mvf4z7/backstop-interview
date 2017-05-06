import { expect } from 'chai';

import isInt from '../isInt';
import { nonNumberThings } from '../../testFixtures';

describe('isInt', function() {
  it('should return false for non-number things', function() {
    nonNumberThings.forEach( thing => {
      expect(isInt(thing)).to.be.false;
    });
  });

  it('should return false if a floating point number is passed in', function() {
    expect(isInt(3.14159)).to.be.false;
  });

  it('should return true if an integer is passed in', function() {
    expect(isInt(33)).to.be.true;
  });
});