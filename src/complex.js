/**
 * @author Felipe Andrés Alvarez Avaria <faaa97@protonmail.com>
 * @file Module that exports a class which handles complex numbers
 * @tutorial https://en.wikipedia.org/wiki/Complex_number
 */

'use strict';

/**
 * Class which represent a complex number and provides some
 * methods to operate with it.
 *
 * @module Complex
 * @class Complex
 */
export default class Complex {
  #real;
  #imaginary;
  /**
   * Creates an instance of a Complex number.
   *
   * @param {number} real real part of a complex number
   * @param {number} imaginary imaginary part of a complex number
   * @memberof Complex
   */
  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
  };

  /**
   * Real part getter
   *
   * @readonly
   * @returns {number} real part of complex number
   * @memberof Complex
   */
  get real() {
    return this.#real;
  };

  /**
   * Imaginary part getter
   *
   * @readonly
   * @returns {number} imaginary part of complex number
   * @memberof Complex
   */
  get imaginary() {
    return this.#imaginary;
  };

  /**
   * Sums two Complex numbers and returns its result.
   * Left operand is this.
   *
   * @param {Complex} right Right operand of sum
   * @returns {Complex} Result of this + right
   * @memberof Complex
   */
  sum(right) {
    const realResult = this.real + right.real;
    const imaginaryResult = this.imaginary + right.imaginary;

    return new Complex(realResult, imaginaryResult);
  };

  /**
   * Substracts two Complex numbers and returns its result.
   * Left operand is this.
   *
   * @param {Complex} right Right operand of substraction
   * @returns {Complex} Result of this - right
   * @memberof Complex
   */
  substraction(right) {
    const realResult = this.real - right.real;
    const imaginaryResult = this.imaginary - right.imaginary;

    return new Complex(realResult, imaginaryResult);
  };

  /**
   * Multiplies two Complex numbers and returns its result.
   * Left operand is this.
   *
   * @param {Complex} right Right operand of multiplication
   * @returns {Complex} Result of this - right
   * @memberof Complex
   */
  multiplication(right) {
    const realResult = this.real * right.real -
        this.imaginary * right.imaginary;
    const imaginaryResult = this.real * right.imaginary +
        this.imaginary * right.real;

    return new Complex(realResult, imaginaryResult);
  };

  /**
   * Returns 'complex' to the power of 'exponent'.
   * 'this' is the base in this operation
   * Internally uses multiplication 'exponent' times.
   *
   * @param {number} exponent Number to be used as exponent.
   * @returns {Complex} Result of this^exponent
   * @memberof Complex
   */
  power(exponent) {
    const base = this;
    let result = base;

    for (let i = 0; i < exponent - 1; i++) {
      result = result.multiplication(base);
    }

    return result;
  };

  /**
   * Calculates modulus of this Complex number and
   * returns it
   *
   * @returns {number} modulus of this Complex number
   * @memberof Complex
   */
  modulus() {
    const termA = this.real * this.real; // this.real^2
    const termB = this.imaginary * this.imaginary; // this.imaginary^2
    return Math.sqrt(termA + termB);
  };

  /**
   * Returns a new object with the same attributes as this
   *
   * @returns {Complex} New object of class Complex
   * @memberof Complex
   */
  clone() {
    const real = this.real;
    const imaginary = this.imaginary;
    return new Complex(real, imaginary);
  }
};
