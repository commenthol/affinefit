'use strict'

/**
 * Puts given matrix (2D array) into the Reduced Row Echelon Form.
 * Returns True if successful, False if 'm' is singular.
 * NOTE: make sure all the matrix items support fractions! Int matrix will NOT work!
 * Written by Jarno Elonen in April 2005, released into Public Domain
 *
 * Ultra simple linear system solver. Replace this if you need speed.
 */
function gaussJordan (m) {
  const eps = 1e-10 // 1.0 / Math.pow(10, 10)

  const h = m.length
  const w = m[0].length
  let c

  for (let y = 0; y < h; y++) {
    let maxrow = y
    for (let y2 = y + 1; y2 < h; y2++) { // Find max pivot
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y])) {
        maxrow = y2
      }
    }

    c = m[maxrow]
    m[maxrow] = m[y]
    m[y] = c

    if (Math.abs(m[y][y]) <= eps) { // Singular?
      return false
    }

    for (let y2 = y + 1; y2 < h; y2++) {  // Eliminate column y
      c = m[y2][y] / m[y][y]
      for (let x = y; x < w; x++) {
        m[y2][x] -= m[y][x] * c
      }
    }
  }

  for (let y = h - 1; y > -1; y--) {  // Backsubstitute
    c = m[y][y]
    for (let y2 = 0; y2 < y; y2++) {
      for (let x = w - 1; x > y - 1; x--) {
        m[y2][x] -= m[y][x] * m[y2][y] / c
      }
    }
    m[y][y] /= c
    for (let x = h; x < w; x++) { // Normalize row y
      m[y][x] /= c
    }
  }
  return true
}
module.exports = gaussJordan
