/* globals describe, it */

'use strict'

const assert = require('assert')
const affineFit = require('..')

describe('#affineFit', function () {
  it('can transform a rectangle', function () {
    const fromPts = [[1, 1], [1, 2], [2, 2], [2, 1]] // a 1x1 rectangle
    const toPts = [[4, 4], [6, 6], [8, 4], [6, 2]]   // scaled x 2, rotated 45 degrees and translated

    const trn = affineFit(fromPts, toPts)

    fromPts.forEach((pt, idx) => {
      const res = trn(pt).map((f) => {
        return parseFloat(f.toPrecision(10), 10)
      })
      // console.log(pt, '==>', res)
      assert.deepStrictEqual(res, toPts[idx])
    })
  })
})
