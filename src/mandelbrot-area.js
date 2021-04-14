/**
 * @author Felipe Andrés Alvarez Avaria <faaa97@protonmail.com>
 * @file Module that exports a function that calculates area in mandelbrot
 * set via calculating a random number of complex numbers
 */

'use_strict';

import Mandelbrot from './mandelbrot.js';
import Complex from './complex.js';

/**
 * Returns a random number between min and max (min included, max excluded)
 *
 * @param {number} min min limit (included)
 * @param {number} max max limit (excluded)
 * @returns {number} random number
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Retuns a random complex number that falls between
 * [lowReal, highReal) for real part and [lowImaginary, highImaginary)
 * for imaginary part
 *
 * @param {number} lowReal low range for real part (included)
 * @param {number} highReal high range for real part (excluded)
 * @param {number} lowImaginary low range for imaginary part (included)
 * @param {number} highImaginary high range for imaginary part (excluded)
 * @returns {Complex} Random complex between range
 */
function generateRandomComplexPoint(
    lowReal, highReal, lowImaginary, highImaginary) {
  const real = getRandomArbitrary(lowReal, highReal);
  const imaginary = getRandomArbitrary(lowImaginary, highImaginary);
  return new Complex(real, imaginary);
}

/**
 * Retuns a list (array) of random numbers suited for mandelbrot
 * area calculation
 *
 * @param {number} points how many points to generate
 * @returns {Array<Complex>} Array of random complex numbers
 * @see generateRandomComplexPoint this is used for generation
 */
function generateRandomComplexPoints(points) {
  const REAL_LIMITS = {
    low: -2.0,
    high: 0.5,
  };
  const IMAGINARY_LIMITS = {
    low: 0.5,
    high: 1.125,
  };

  const result = [];
  for (let i = 0; i < points; i++) {
    const complex = generateRandomComplexPoint(
        REAL_LIMITS.low,
        REAL_LIMITS.high,
        IMAGINARY_LIMITS.low,
        IMAGINARY_LIMITS.high);

    result.push(complex);
  }
  return result;
}

/**
 * Test every point in argument if converges or not while applying
 * Mandelbrot iterative function. Returns how many points converges.
 *
 * @param {Array<Complex>} points random complex points to be tested
 * @param {number} iterLimit how many iterations to consider a point
 * it converges in case it not diverges first
 * @returns {number} number of random complex points that converges
 */
function getNumberOfPointsInsideMandelbrotArea(points, iterLimit) {
  let insidePoints = 0;

  const mandelbrot = new Mandelbrot(iterLimit);

  points.forEach((complexPoint) => {
    const result = mandelbrot.iterate(complexPoint);
    if (result.converges === true) {
      insidePoints++;
    }
  });

  return insidePoints;
}

/**
 * Calculates area and error from mandelbrot set, given
 * many random complex points.
 *
 * @module calculateArea
 * @returns {object<number,number>} JS object with area and error properties
 */
function calculateArea() {
  const question = 'How many points to generate to calculate area?\n' +
      '1000+ points recommended, however it can take some time';
  const totalPoints = parseInt(prompt(question));
  const iterLimit = 10000;

  const complexPointsToTest = generateRandomComplexPoints(totalPoints);
  const insidePoints =
      getNumberOfPointsInsideMandelbrotArea(complexPointsToTest, iterLimit);

  // Calculate area and error
  const area = 2 * 2.5 * 1.125 * insidePoints / totalPoints;
  const error = area / Math.sqrt(totalPoints);
  return {area: area, error: error};
}

export default {calculateArea};
