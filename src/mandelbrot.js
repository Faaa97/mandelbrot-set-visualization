/** *
 * @author Felipe Andrés Alvarez Avaria <faaa97@protonmail.com>
 * @file Module that exports a class which handles mandelbrot set
 * calculation.
 * @tutorial https://en.wikipedia.org/wiki/Mandelbrot_set
 */

'use strict';

import Complex from './complex.js';

/**
 * Class which handles calculation of mandelbrot set.
 * Canvas friendly.
 *
 * @module Mandelbrot
 * @class Mandelbrot
 */
export default class Mandelbrot {
  #limit;
  /**
   * Creates an instance of Mandelbrot.
   *
   * @param {number} limit Number of iterations to be performed as max
   * @memberof Mandelbrot
   */
  constructor(limit) {
    this.#limit = limit;
  };

  /**
   * How many iterations to be performed (limit) getter
   *
   * @readonly
   * @returns {number} iterations
   * @memberof Mandelbrot
   */
  get limit() {
    return this.#limit;
  };

  /**
   * Iterate Z{n+1} = Z{n}^2 + C
   * Where Z{0} = Complex(0, 0) and C = Complex(x, y)
   * x and y are random integers.
   *
   * @param {Complex} complex Complex number "C" in mandelbrot equation.
   * @returns {object<boolean,number>} Returns object with boolean "converges"
   * indicating whether or not this iteration converges into something and
   * "iterations", how many iterations where needed to take this result
   * @memberof Mandelbrot
   */
  iterate(complex) {
    let current = complex.clone();
    let iteration = 0;
    let diverges = false;
    const modulusLimit = 2;
    const exponent = 2;

    while (diverges === false && iteration < this.limit) {
      current = current.power(exponent);
      current = current.sum(complex); // Z{n+1} = Z{n}^2 + C
      if (current.modulus() > modulusLimit) {
        diverges = true;
      }
      iteration++;
    }
    return {converges: !diverges, iterations: iteration};
  }
};
