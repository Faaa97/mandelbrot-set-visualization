/**
 * @author Felipe Andrés Alvarez Avaria <faaa97@protonmail.com>
 * @file Test file for src/complex.js
 */

'use_strict';

// eslint-disable-next-line no-unused-vars
import should from 'chai/register-should';
import {assert} from 'chai';
import Complex from '../src/complex.js';

describe('Complex class', function() {
  describe('correct use', function() {
    const numberA = {real: 2, imaginary: 3}; // 2 + 3i
    const numberB = {real: 5, imaginary: 5}; // 5 + 5i
    const REAL_PART_FAIL = 'real part was wrong';
    const IMAGINARY_PART_FAIL = 'imaginary part was wrong';

    it('initiates with two inputs', function() {
      const complex = new Complex(numberA.real, numberA.imaginary);
      complex.real.should.equal(numberA.real, REAL_PART_FAIL);
      complex.imaginary.should.equal(numberA.imaginary, IMAGINARY_PART_FAIL);
    });

    it('should compute sum correctly', function() {
      const complexA = new Complex(numberA.real, numberA.imaginary);
      const complexB = new Complex(numberB.real, numberB.imaginary);
      const result = complexA.sum(complexB);
      result.real.should.equal(numberA.real + numberB.real, REAL_PART_FAIL);
      result.imaginary.should.equal(numberA.imaginary + numberB.imaginary,
          IMAGINARY_PART_FAIL);
    });

    it('should compute substraction correctly', function() {
      const complexA = new Complex(numberA.real, numberA.imaginary);
      const complexB = new Complex(numberB.real, numberB.imaginary);
      const result = complexA.substraction(complexB);
      result.real.should.equal(numberA.real - numberB.real, REAL_PART_FAIL);
      result.imaginary.should.equal(numberA.imaginary - numberB.imaginary,
          IMAGINARY_PART_FAIL);
    });

    it('should compute multiplication correctly', function() {
      const expected = {real: -5, imaginary: 25}; // -5 + 25i
      const complexA = new Complex(numberA.real, numberA.imaginary);
      const complexB = new Complex(numberB.real, numberB.imaginary);
      const result = complexA.multiplication(complexB);
      result.real.should.equal(expected.real, REAL_PART_FAIL);
      result.imaginary.should.equal(expected.imaginary, IMAGINARY_PART_FAIL);
    });

    it('should compute power correctly', function() {
      const expected = {real: -46, imaginary: 9}; // -46 + 9i
      const exponent = 3;
      const complexA = new Complex(numberA.real, numberA.imaginary);
      const result = complexA.power(exponent);
      result.real.should.equal(expected.real, REAL_PART_FAIL);
      result.imaginary.should.equal(expected.imaginary, IMAGINARY_PART_FAIL);
    });

    it('should compute modulus correctly', function() {
      const expected = 3.60555; // sqrt(13)
      const complexA = new Complex(numberA.real, numberA.imaginary);
      const result = complexA.modulus();
      const precision = 0.00001;
      assert(result - expected < precision);
    });
  });
});
