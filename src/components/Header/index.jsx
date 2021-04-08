import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import MenuIcon from '@Components/MenuIcon'
import Navigation from '@Components/Navigation'
import Logo from '@Components/Logo'
import * as header from './header.module.scss'
import useWindowSize from '@Hooks/useWindowSize'
import useScrollPosition from '@Hooks/useScrollPosition'
import { navigationOperations, navigationSelectors } from '@State/ducks/ui/navigation'

const Header = ({ className }) => {
  const dispatch = useDispatch();
  const { width } = useWindowSize()
  const [isMobile, toggleMobile] = useState(false)
  const headerElement = useRef(null)
  const isHeaderFixed = useSelector(navigationSelectors.isHeaderFixed);

  // toggle fixed state based on scroll position, dispatch to redux instead of local state
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const offset = -(headerElement.current.offsetHeight - 25)
      // perform state check here to prevent several redux operations firing
      if (currPos.y < offset && !isHeaderFixed) {
        dispatch(navigationOperations.setFixedState(true))
      }

      if (!(currPos.y < offset) && isHeaderFixed) {
        dispatch(navigationOperations.setFixedState(false))
      }
      
    },
    [dispatch, headerElement, isHeaderFixed]
  )

  useEffect(() => {
    toggleMobile(width < 960)
  }, [width])

  // todo add mobile styles
  return (
    <header
      className={cx(header.root, className, {
        [header.state__fixed]: isHeaderFixed,
      })}
      ref={headerElement}
    >
      <Container>
        <Row alignItems={'center'} justifyContent={'between'}>
          <div className={cx(header.branding)}>
            <Logo variant={isHeaderFixed ? 'small' : 'default'} />
          </div>

          {isMobile && <MenuIcon />}
          <Navigation />
        </Row>
      </Container>
    </header>
  )
}

export default Header
