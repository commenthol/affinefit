/* eslint no-multi-spaces:0 */

'use strict'

const fs = require('fs')
const path = require('path')
const affineFit = require('..')

const svgIn = fs.readFileSync(path.join(__dirname, 'rectangles.svg'), 'utf8')

const fromPts = [[1, 1], [1, 2], [2, 2], [2, 1]]  // a 1x1 rectangle
const toPts   = [[4, 4], [6, 6], [8, 4], [6, 2]]  // scaled x 2, rotated 45 degrees and translated
const trn = affineFit(fromPts, toPts) // affine transformation

function transform (svg) {
  svg = svg.replace(/(<path d=")([^"]*)(".*?>)/g, function (m, m1, m2, m3) {
    m2 = m2.replace(/([ML]) (\d+) (\d+)/g, function (m, m1, m2, m3) {
      const res = trn([parseInt(m2, 10), parseInt(m3, 10)]).map((f) => {
        return Math.round(f)
      })
      return [m1, res[0], res[1] + 800].join(' ')
    })
    return [m1, m2, m3].join('')
  })
  return svg
}

const svgOut = transform(svgIn)

fs.writeFileSync(path.join(__dirname, 'transformed.svg'), svgOut, 'utf8')
