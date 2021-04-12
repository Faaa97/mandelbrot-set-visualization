/**
 * @author Felipe Andrés Alvarez Avaria <faaa97@protonmail.com>
 * @file Test file for src/mandelbrot.js
 */

// eslint-disable-next-line no-unused-vars
import should from 'chai/register-should';
import Mandelbrot from '../src/mandelbrot.js';
import Complex from '../src/complex.js';

describe('Mandelbrot class', function() {
  describe('correct use', function() {
    const iterLimit = 1000;
    it('initiates with one input', function() {
      const mandelbrot = new Mandelbrot(iterLimit);
      mandelbrot.limit.should.equal(iterLimit);
    });

    it('should iterate correctly', function() {
      const expect = {converges: false, iterations: 4};
      const complex = new Complex(0.5, 0);
      const mandelbrot = new Mandelbrot(iterLimit);
      const result = mandelbrot.iterate(complex);
      result.converges.should.equal(expect.converges);
      result.iterations.should.equal(expect.iterations);
    });
  });
});
