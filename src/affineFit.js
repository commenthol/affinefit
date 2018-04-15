'use strict'

const gaussJordan = require('./gaussJordan')
const transformation = require('./transformation')

function emptyArray (x, y) {
  return Array(y).fill(0).map(() => {
    return Array(x).fill(0)
  })
}

/**
 * @param {array} q - from points
 * @param {array} p - to points
 */
function affineFit (q, p) {
  if (q.length !== p.length || q.length < 1) {
    console.error('from_pts and to_pts must be of same size.')
    return false
  }

  const dim = q[0].length // num of dimensions

  if (q.length < dim) {
    console.error('Too few points => under-determined system.')
    return false
  }

  // Make an empty (dim) x (dim+1) matrix and fill it
  const c = emptyArray(dim, dim + 1)

  for (let j = 0; j < dim; j++) {
    for (let k = 0; k < dim + 1; k++) {
      for (let i = 0; i < q.length; i++) {
        let qt = q[i].concat(1)
        c[k][j] += qt[k] * p[i][j]
      }
    }
  }

  // Make an empty (dim+1) x (dim+1) matrix and fill it
  const Q = emptyArray(dim + 1, dim + 1)

  q.forEach((qi) => {
    let qt = qi.concat(1)
    for (let i = 0; i < dim + 1; i++) {
      for (let j = 0; j < dim + 1; j++) {
        Q[i][j] += qt[i] * qt[j]
      }
    }
  })

  // Augment Q with c and solve Q * a' = c by Gauss-Jordan
  const M = Q.map((qi, idx) => {
    return qi.concat(c[idx])
  })

  if (!gaussJordan(M)) {
    console.error('Error: singular matrix. Points are probably coplanar.')
    return false
  }

  return transformation(M, dim)
}
module.exports = affineFit
