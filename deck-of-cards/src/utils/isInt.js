import isNumber from './isNumber';

export default function isInt(num) {
  return (
    isNumber(num) &&
    num % 1 === 0
  );
}