import * as PIXI from 'pixi.js'
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur'
import SimplexNoise from 'simplex-noise'
import hsl from 'hex-to-hsl'
import debounce from 'debounce'

// return a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min
}

// map a number from 1 range to another
function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
}

// Create a new simplex noise instance
const simplex = new SimplexNoise()

// Orb class
class Orb {
  // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
  constructor(fill = 0x000000) {
    // bounds = the area an orb is "allowed" to move within
    this.bounds = this.setBounds()
    // initialise the orb's { x, y } values to a random point within it's bounds
    this.x = random(this.bounds['x'].min, this.bounds['x'].max)
    this.y = random(this.bounds['y'].min, this.bounds['y'].max)

    // how large the orb is vs it's original radius (this will modulate over time)
    this.scale = 1

    // what color is the orb?
    this.fill = fill

    // the original radius of the orb, set relative to window height
    this.radius = random(window.innerHeight / 4, window.innerHeight / 2)

    // starting points in "time" for the noise/self similar random values
    this.xOff = random(0, 1000)
    this.yOff = random(0, 1000)
    // how quickly the noise/self similar random values step through time
    this.inc = 0.0005

    // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
    this.graphics = new PIXI.Graphics()
    this.graphics.alpha = 0.525

    // 250ms after the last window resize event, recalculate orb positions.
    window.addEventListener(
      'resize',
      debounce(() => {
        this.bounds = this.setBounds()
      }, 250)
    )
  }

  setBounds() {
    // how far from the { x, y } origin can each orb move
    const maxDist =
      window.innerWidth < 1000 ? window.innerWidth / 6 : window.innerWidth / 10
    // the { x, y } origin for each orb (the bottom right of the screen)
    const originX = window.innerWidth / 1.25
    const originY =
      window.innerWidth < 1000 ? window.innerHeight : window.innerHeight / 1.375

    // allow each orb to move x distance away from it's x / y origin
    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist,
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist,
      },
    }
  }

  update() {
    // self similar "psuedo-random" or noise values at a given point in "time"
    const xNoise = simplex.noise2D(this.xOff, this.xOff)
    const yNoise = simplex.noise2D(this.yOff, this.yOff)
    const scaleNoise = simplex.noise2D(this.xOff, this.yOff)

    // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    this.x = map(xNoise, -1, 1, this.bounds['x'].min, this.bounds['x'].max)
    this.y = map(yNoise, -1, 1, this.bounds['y'].min, this.bounds['y'].max)
    // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
    this.scale = map(scaleNoise, -1, 1, 0.75, 0.5)

    // step through "time"
    this.xOff += this.inc
    this.yOff += this.inc
  }

  render() {
    // update the PIXI.Graphics position and scale values
    this.graphics.x = this.x
    this.graphics.y = this.y
    this.graphics.scale.set(this.scale)

    // clear anything currently drawn to graphics
    this.graphics.clear()

    // tell graphics to fill any shapes drawn after this with the orb's fill color
    this.graphics.beginFill(this.fill)
    // draw a circle at { 0, 0 } with it's size set by this.radius
    this.graphics.drawCircle(150, 300, this.radius)
    // let graphics know we won't be filling in any more shapes
    this.graphics.endFill()
  }
}

export { Orb }
