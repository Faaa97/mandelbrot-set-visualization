/**
 * @author Felipe Andrés Alvarez Avaria <faaa97@protonmail.com>
 * @file Loads mandelbrot visualization into browser
 */

'use_strict';

import loadVisualization from './mandelbrot-visualization.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  loadVisualization(canvas);
});
