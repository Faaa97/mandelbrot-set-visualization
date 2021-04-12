/**
 * @author Felipe Andrés Alvarez Avaria <faaa97@protonmail.com>
 * @file Module that exports a function that draws into a canvas the results
 * of computing mandelbrot set.
 */

'use_strict';

import Complex from './complex.js';
import Mandelbrot from './mandelbrot.js';
import mandelbrotArea from './mandelbrot-area.js';

/**
 * Calculates RGB equivalent to HSV args and returns
 * it in an Array.
 *
 * @param {number} hue Hue, [0,360]
 * @param {number} saturation Saturation [0,1]
 * @param {number} value Value [0,1]
 * @returns {object<number, number, number>} This object has three
 * properties: red [0-255], green [0-255] and blue [0-255], indicating
 * the componentes of a RGB color.
 * @tutorial https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
 */
function hsvToRgb(hue, saturation, value) {
  const chroma = value * saturation;
  const hue2 = hue / 60;
  const intermediate = chroma * (1 - Math.abs(hue2 % 2 - 1));

  let red;
  let green;
  let blue;

  if (!hue2) {
    red = 0;
    green = 0;
    blue = 0;
  } else if (hue2 >= 0 && hue2 <= 1) {
    red = chroma;
    green = intermediate;
    blue = 0;
  } else if (hue2 > 1 && hue2 <= 2) {
    red = intermediate;
    green = chroma;
    blue = 0;
  } else if (hue2 > 2 && hue2 <= 3) {
    red = 0;
    green = chroma;
    blue = intermediate;
  } else if (hue2 > 3 && hue2 <= 4) {
    red = 0;
    green = intermediate;
    blue = chroma;
  } else if (hue2 > 4 && hue2 <= 5) {
    red = intermediate;
    green = 0;
    blue = chroma;
  } else if (hue2 > 5 && hue2 <= 6) {
    red = chroma;
    green = 0;
    blue = intermediate;
  }

  const matchValue = value - chroma;
  red = (red + matchValue) * 255;
  green = (green + matchValue) * 255;
  blue = (blue + matchValue) * 255;
  return {
    red: red,
    green: green,
    blue: blue,
  };
}

/**
 * Assigns a HSV color to a mandelbrot point whether it
 * diverges or not, and how much it takes to do that.
 *
 * @param {number} iterations Number of iterations it took to compute
 * @param {number} maxIterations Max number of iterations available
 * @param {boolean} converges Whether it converges or not.
 * @returns {object<number, number, number>} This object has three
 * properties: hue [0-360], saturation [0-1] and value [0-1], indicating
 * the componentes of a HSV color.
 */

function assignHSVColor(iterations, maxIterations, converges) {
  const hue = iterations * 360 / maxIterations;
  const saturation = 1;
  const value = converges ? 0 : 1; // black if converges

  return {
    hue: hue,
    saturation: saturation,
    value: value,
  };
}

/**
 * Draws a pixel that is located at index with rgb color
 *
 * @param {ImageData} imgData ImageData taken from canvas.
 * @param {number} index index of the actual pixel, this needs to be
 * multiplied by 4 before calling, so it takes into consideration
 * every component in a RGBA color pixel.
 * @param {object<number, number, number>} color This object has three
 * properties: red [0-255], green [0-255] and blue [0-255], indicating
 * the componentes of a RGB color.
 */
function drawPixelIntoImageData(imgData, index, color) {
  const MAX_VALUE = 255;
  imgData[index] = color.red; // RED (0-255)
  imgData[index + 1] = color.green; // GREEN (0-255)
  imgData[index + 2] = color.blue; // BLUE (0-255)
  imgData[index + 3] = MAX_VALUE; // APLHA (0-255)
}

/**
 * Draws into context and position x and y a
 * black text with white outline, great when
 * background is either bright or dull colors.
 *
 * @param {CanvasRenderingContext2D} context canvas context to draw into
 * @param {string} text Text that will be drawn
 * @param {number} x Position in X-axis
 * @param {number} y Position in Y-axis
 */
function drawWhiteOnBlackText(context, text, x, y) {
  context.font = '30px Sans-serif';
  context.strokeStyle = 'black';
  context.lineWidth = 4;
  context.strokeText(text, x, y);
  context.fillStyle = 'white';
  context.fillText(text, x, y);
}

/**
 * Maps a 2D point of canvas into a Complex number.
 * (0,0) point will be converted to (realStart + imgStart i) complex
 * (width,height) point will be converted to (realEnd + imgEnd i) complex
 *
 * @param {number} realStart First real Complex part to be used for most-left
 * @param {number} realEnd Last real Complex part to be used for most-right
 * @param {number} imgStart First imaginary Complex part to be used for most-top
 * @param {number} imgEnd Last imaginary Complex part to be used for most-down
 * @param {number} x Position in X-axis
 * @param {number} y Position in Y-axis
 * @param {number} width width of canvas
 * @param {number} height height of canvas
 * @returns {Complex} Complex number that translates to canvas coordinates
 */
function pointToComplex(
    realStart, realEnd, imgStart, imgEnd, x, y, width, height) {
  const real = realStart +
      (x / width) * (realEnd - realStart);
  const imaginary = imgStart +
      (y / height) * (imgEnd - imgStart);
  return new Complex(real, imaginary);
}

/**
 * Computes actual visualization for canvas, returns a ImageData
 * object that can be put into canvas to get the result.
 *
 * @param {CanvasRenderingContext2D} context canvas context to draw into
 * @param {number} width canvas width
 * @param {number} height canvas height
 * @returns {ImageData} img to input to canvas
 */
function computeForCanvas(context, width, height) {
  // Complex numbers constants
  const REAL_PART_START = -2;
  const REAL_PART_END = 1;
  const IMAGINARY_PART_START = -1;
  const IMAGINARY_PART_END = 1;

  const limit = 100; // low limit
  const mandelbrot = new Mandelbrot(limit);

  const img = context.createImageData(width, height);
  const imgDataLength = img.data.length;
  const components = 4; // Number of components in RGBA

  for (let i = 0; i < imgDataLength / components; i++) {
    //debugger;
    // Transform a canvas coord into a complex
    const x = i % width;
    const y = i / width;
    const complex = pointToComplex(
        REAL_PART_START, REAL_PART_END,
        IMAGINARY_PART_START, IMAGINARY_PART_END,
        x, y, width, height);

    // Compute result
    const result = mandelbrot.iterate(complex);

    // color assignment
    const hsv = assignHSVColor(result.iterations, limit, result.converges);
    const rgb = hsvToRgb(hsv.hue, hsv.saturation, hsv.value);
    // Actual drawing into img
    const index = components * i;
    drawPixelIntoImageData(img.data, index, rgb);
  }

  return img;
}

/**
 * Draws "Area" result into context at positions x and y
 *
 * @param {CanvasRenderingContext2D} context canvas context to draw into
 * @param {number} area Actual area value, this will be truncated
 * @param {number} x Position in X-axis
 * @param {number} y Position in Y-axis
 */
function drawArea(context, area, x, y) {
  const areaStr = 'Area: ' + area.toFixed(5);
  drawWhiteOnBlackText(context, areaStr, x, y);
}

/**
 * Draws "Error" result into context at positions x and y
 *
 * @param {CanvasRenderingContext2D} context canvas context to draw into
 * @param {number} error Actual error value, this will be truncated
 * @param {number} x Position in X-axis
 * @param {number} y Position in Y-axis
 */
function drawError(context, error, x, y) {
  const errorStr = 'Error: ' + error.toFixed(5);
  drawWhiteOnBlackText(context, errorStr, x, y);
}

/**
 * Draws to canvas a panel showing results of previous computing
 *
 * @param {CanvasRenderingContext2D} context canvas context to draw into
 * @param {number} width canvas width
 * @param {number} height canvas height
 * @param {number} area Area that will be drawn
 * @param {number} error Error that will be drawn
 */
function drawPanel(context, width, height, area, error) {
  const horizontalPaddingRatio = 20;
  const verticalPaddingRatio = 10;
  const horizontalPadding = (width / horizontalPaddingRatio);
  const verticalPadding = (height / verticalPaddingRatio);

  const positionX = horizontalPadding;
  const positionY = height - verticalPadding;
  const positionYError = positionY + (verticalPadding / 2);

  drawArea(context, area, positionX, positionY);
  drawError(context, error, positionX, positionYError);
}

/**
 * Draw mandelbrot set into a canvas context
 *
 * @param {CanvasRenderingContext2D} context
 * canvas context to draw visualization into
 * @param {number} width canvas width
 * @param {number} height canvas height
 */
function drawMandelbrotSet(context, width, height) {
  const img = computeForCanvas(context, width, height);
  context.putImageData(img, 0, 0);
}

/**
 * Resize canvas to take most of current resolution space,
 * with 16/9 aspect ratio.
 *
 * @param {HTMLCanvasElement} canvas actual HTML5 DOM canvas
 */
function resizeCanvas(canvas) {
  const proportion = 0.8;
  const aspectRatio = 16 / 9;
  const height = window.innerHeight;
  canvas.height = height * proportion;
  canvas.width = height * proportion * aspectRatio;
}

/**
 * Function that will load all other components and attempts
 * to draw into a HTML canvas
 *
 * @module loadVisualization
 * @param {HTMLCanvasElement} canvas actual HTML5 DOM canvas
 */
export default function loadVisualization(canvas) {
  resizeCanvas(canvas);
  const context = canvas.getContext('2d');
  drawWhiteOnBlackText(context, "Loading", canvas.width / 2 - 50, canvas.height / 2);
  setTimeout(() => {
    const result = mandelbrotArea.calculateArea();
    drawMandelbrotSet(context, canvas.width, canvas.height);
    drawPanel(context, canvas.width, canvas.height,
        result.area, result.error);
  }, 50);
}
