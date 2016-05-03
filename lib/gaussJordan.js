'use strict';

/*
   Puts given matrix (2D array) into the Reduced Row Echelon Form.
   Returns True if successful, False if 'm' is singular.
   NOTE: make sure all the matrix items support fractions! Int matrix will NOT work!
   Written by Jarno Elonen in April 2005, released into Public Domain

   Ultra simple linear system solver. Replace this if you need speed.
*/

function gaussJordan(m) {
  var eps = 1e-10; // 1.0 / Math.pow(10, 10)

  var h = m.length;
  var w = m[0].length;
  var c;

  for (var y = 0; y < h; y++) {
    var maxrow = y;
    for (var y2 = y + 1; y2 < h; y2++) {
      // Find max pivot
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y])) {
        maxrow = y2;
      }
    }

    c = m[maxrow];
    m[maxrow] = m[y];
    m[y] = c;

    if (Math.abs(m[y][y]) <= eps) {
      // Singular?
      return false;
    }

    for (var _y = y + 1; _y < h; _y++) {
      // Eliminate column y
      c = m[_y][y] / m[y][y];
      for (var x = y; x < w; x++) {
        m[_y][x] -= m[y][x] * c;
      }
    }
  }

  for (var _y2 = h - 1; _y2 > -1; _y2--) {
    // Backsubstitute
    c = m[_y2][_y2];
    for (var _y3 = 0; _y3 < _y2; _y3++) {
      for (var _x = w - 1; _x > _y2 - 1; _x--) {
        m[_y3][_x] -= m[_y2][_x] * m[_y3][_y2] / c;
      }
    }
    m[_y2][_y2] /= c;
    for (var _x2 = h; _x2 < w; _x2++) {
      // Normalize row y
      m[_y2][_x2] /= c;
    }
  }
  return true;
}
module.exports = gaussJordan;