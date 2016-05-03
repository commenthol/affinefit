'use strict';

var gaussJordan = require('./gaussJordan');
var transformation = require('./transformation');

function emptyArray(x, y) {
  return Array(y).fill(0).map(function () {
    return Array(x).fill(0);
  });
}

/**
 * @param {array} q - from points
 * @param {array} p - to points
 */
function affineFit(q, p) {
  if (q.length !== p.length || q.length < 1) {
    console.error('from_pts and to_pts must be of same size.');
    return false;
  }

  var dim = q[0].length; // num of dimensions

  if (q.length < dim) {
    console.error('Too few points => under-determined system.');
    return false;
  }

  // Make an empty (dim) x (dim+1) matrix and fill it
  var c = emptyArray(dim, dim + 1);

  for (var j = 0; j < dim; j++) {
    for (var k = 0; k < dim + 1; k++) {
      for (var i = 0; i < q.length; i++) {
        var qt = q[i].concat(1);
        c[k][j] += qt[k] * p[i][j];
      }
    }
  }

  // Make an empty (dim+1) x (dim+1) matrix and fill it
  var Q = emptyArray(dim + 1, dim + 1);

  q.forEach(function (qi) {
    var qt = qi.concat(1);
    for (var _i = 0; _i < dim + 1; _i++) {
      for (var _j = 0; _j < dim + 1; _j++) {
        Q[_i][_j] += qt[_i] * qt[_j];
      }
    }
  });

  // Augment Q with c and solve Q * a' = c by Gauss-Jordan
  var M = Q.map(function (qi, idx) {
    return qi.concat(c[idx]);
  });

  if (!gaussJordan(M)) {
    console.error('Error: singular matrix. Points are probably coplanar.');
    return false;
  }

  return transformation(M, dim);
}
module.exports = affineFit;