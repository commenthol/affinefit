'use strict'

function transformation (M, dim) {
  return function (pt) {
    var res = Array(dim).fill(0)

    for (let j = 0; j < dim; j++) {
      for (let i = 0; i < dim; i++) {
        res[j] += pt[i] * M[i][j + dim + 1]
      }
      res[j] += M[dim][j + dim + 1]
    }
    return res
  }
}
module.exports = transformation
