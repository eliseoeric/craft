import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as PIXI from 'pixi.js'
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur'
import ScrollTrigger from 'react-scroll-trigger'

import { Orb } from '@Utils/animation'
import useToggle from '@Hooks/useToggle'
import useScrollProgress from '@Hooks/useScrollProgress'

import * as styles from './styles.module.scss'

const OrbContainer = ({ originXGetter, originYGetter, radiusRange, className, orbColor1, orbColor2 }) => {
  const [hasBooted, toggleBootState] = useToggle()
  const orbElement = useRef(null)
  const orbApp = useRef(null)
  const orbs = useRef([])
  const { setVisible, visible } = useScrollProgress()


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
        sharedTicker: true,
        
      })

      // for debugging
      // orbApp.current.ticker.minFPS = 1
      // orbApp.current.ticker.maxFPS = 1

      orbApp.current.stage.filters = [new KawaseBlurFilter(30, 10, true)]

      const getOrbSeeds = () => {
        if (orbColor1 && orbColor2) {
          return [
            `0x${orbColor1}`,
            `0x${orbColor1}`,
            `0x${orbColor2}`
          ]
        } else {
          return ['0x00FFb5', '0x00FFb5', '0x00FFb5']
          // return ['0x7500ff', '0x7500ff', '0x37ecf2', '0x00ffe6']
        }
      }

      const orbSeeds = getOrbSeeds()

      for (let i = 0; i < orbSeeds.length; i++) {
        const orb = new Orb(
          orbSeeds[i],
          originXGetter,
          originYGetter,
          radiusRange
        )
        orbApp.current.stage.addChild(orb.graphics)

        orbs.current.push(orb)

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          orbApp.current.ticker.add(() => {
            // update and render each orb, each frame. app.ticker attempts to run at 60fps
            orbs.current.forEach((orb) => {
              orb.update()
              orb.render()
            })
          })
        } else {
          // perform one update and render per orb, do not animate
          orbs.current.forEach((orb) => {
            orb.update()
            orb.render()
          })
        }
      }

      toggleBootState()

      // Cleanup, deletes all event listeners
      return () => {
        orbs.current.forEach(orb => orb.cleanup())
        
      }
    }
  }, [orbElement, orbApp, hasBooted, toggleBootState, orbs])

  useEffect(() => {
    if (visible) {
      orbApp.current.start()
    } else {
      orbApp.current.stop();
    }
  }, [visible])

  // Stop the orb when navigating between pages
  useEffect(() => {
   return () => {
     if (orbApp.current) {
       orbApp.current.destroy()
       orbs.current = []
     }
   } 
  }, [])

  return (
    <div className={cx(styles.root, className)}>
      <ScrollTrigger
          onEnter={() => setVisible(true)}
          onExit={() => setVisible(false)}
        />
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
