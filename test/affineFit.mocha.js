/* globals describe, it */

'use strict'

var assert = require('assert')
var affineFit = require('..')

describe('#affineFit', function () {
  it('can transform a rectangle', function () {
    var fromPts = [[1, 1], [1, 2], [2, 2], [2, 1]] // a 1x1 rectangle
    var toPts = [[4, 4], [6, 6], [8, 4], [6, 2]]   // scaled x 2, rotated 45 degrees and translated

    var trn = affineFit(fromPts, toPts)

    fromPts.forEach((pt, idx) => {
      var res = trn(pt).map((f) => {
        return parseFloat(f.toPrecision(10), 10)
      })
      // console.log(pt, '==>', res)
      assert.deepStrictEqual(res, toPts[idx])
    })
  })
})
