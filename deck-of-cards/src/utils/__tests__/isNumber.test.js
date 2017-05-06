import { expect } from 'chai';

import isNumber from '../isNumber';
import { nonNumberThings } from '../../testFixtures';

describe('isNumber', function() {
  it('should return false for non-number things', function() {
    nonNumberThings.forEach( (thing, idx) => {
      expect(isNumber(thing), idx).to.be.false;
    });
  });

  it('should return true if an integer number is provided', function() {
    expect(isNumber(33)).to.be.true;
  });

  it('should return true if a floating point number is provided', function() {
    expect(isNumber(3.14159)).to.be.true;
  });
});