import isInt from './isInt';

const Defaults = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
};

// Returns a random integer between min and max, inclusive of min and max
export default function randomInt({ min = Defaults.min, max = Defaults.max } = Defaults) {
  if(!isInt(min) || !isInt(max)) {
    throw new TypeError('A non integer value provided as argument');
  }
  
  if( min > max ) {
    throw new Error('Invalid arguments. The min argument must be less than or equal to the max argument.');
  }

  // Math.random is from 0 to 1, inclusive of 0 but exclusive of 1.
  // Therefore must add 1 to max so that randomInt can be inclusive of max.
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

