'use strict';

function transformation(M, dim) {
  function transformPoint(pt) {
    var res = Array(dim).fill(0);

    for (var j = 0; j < dim; j++) {
      for (var i = 0; i < dim; i++) {
        res[j] += pt[i] * M[i][j + dim + 1];
      }
      res[j] += M[dim][j + dim + 1];
    }
    return res;
  }
  transformPoint.M = M;
  return transformPoint;
}
module.exports = transformation;