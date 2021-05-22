import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as PIXI from 'pixi.js'
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur'

import { Orb } from '@Utils/animation'
import useToggle from '@Hooks/useToggle'

import * as styles from './styles.module.scss'

const OrbContainer = ({ originXGetter, originYGetter, radiusRange, className }) => {
  const [hasBooted, toggleBootState] = useToggle()
  const orbElement = useRef(null)
  const orbApp = useRef(null)
  const orbs = []

  useEffect(() => {
    // cant run any of this without the window obejct
    if (window == null) {
      return
    }

    if (!hasBooted) {
      orbApp.current = new PIXI.Application({
        // render to <canvas class="orb-canvas"></canvas>
        view: orbElement.current,
        // auto adjust size to fit the current window
        resizeTo: window,
        // transparent background, we will be creating a gradient background later using CSS
        transparent: true,
      })
      orbApp.current.stage.filters = [new KawaseBlurFilter(30, 10, true)]

      const orbSeeds = ['0x7500ff', '0x7500ff', '0x37ecf2', '0x00ffe6']
      for (let i = 0; i < orbSeeds.length; i++) {
        const orb = new Orb(
          orbSeeds[i],
          originXGetter,
          originYGetter,
          radiusRange
        )
        orbApp.current.stage.addChild(orb.graphics)

        orbs.push(orb)

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          orbApp.current.ticker.add(() => {
            // update and render each orb, each frame. app.ticker attempts to run at 60fps
            orbs.forEach((orb) => {
              orb.update()
              orb.render()
            })
          })
        } else {
          // perform one update and render per orb, do not animate
          orbs.forEach((orb) => {
            orb.update()
            orb.render()
          })
        }
      }

      toggleBootState()
    }
  }, [orbElement, orbApp, hasBooted, toggleBootState, orbs])

  return (
    <div className={cx(styles.root, className)}>
      <canvas className={cx(styles.canvas)} ref={orbElement}></canvas>
    </div>
  )
}

OrbContainer.propTypes = {
  originXGetter: PropTypes.func,
  originYGetter: PropTypes.func,
  radiusRange: PropTypes.arrayOf(PropTypes.number),
}

export default OrbContainer
