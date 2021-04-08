import React, {
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import { H1 } from '@Components/Typography'
import Button from '@Components/Button'
import useWindowSize from '@Hooks/useWindowSize'
import * as hero from './hero.module.scss'

const Hero = ({
  headline,
  byline,
  slug,
  links,
  backgroundImageUrl,
  supportingImageUrl,
  className,
  active,
  informHeight,
}) => {
  let imageHd = useRef(null)
  let slideElement = useRef(null)
  const { width } = useWindowSize()

  /**
   * set the background image on the slide container once the i
   * mage url has been downloaded to the client browser
   */
  useEffect(() => {
    let loaderImage = new Image()
    loaderImage.src = backgroundImageUrl

    loaderImage.onload = () => {
      imageHd.current.setAttribute(
        'style',
        `background-image: url('${backgroundImageUrl}')`
      )
    }
  }, [backgroundImageUrl, imageHd])

  /**
   * Callback for each slide; Calculates the slide's height and 
   * passes calls the callback prop informHeight to notify the
   * parent HeroSlider component of the height of each slide. 
   * Note the `useEffectLayout` will call after each dom change,
   * and it also monitors changes to the `width` value; this 
   * effectively creates a onWindowResize callback
   */
  useLayoutEffect(() => {
    if (slideElement.current && active) {
      const height = slideElement.current.clientHeight
      informHeight(height)
    }
  }, [slideElement, informHeight, active, width])

  return (
    <div
      className={cx(
        className,
        hero.root,
        { [hero.active]: active },
        { [hero.fade_in_right]: active },
        { [hero.fade_out_left]: !active }
      )}
      ref={imageHd}
    >
      <div className={hero.component}>
        <Container ref={slideElement} className={hero.container}>
          <Row justifyContent={'between'} className={hero.row}>
            <div className={hero.content__wrapper}>
              <div className={cx(hero.content, hero.fade_in_right)}>
                <H1 className={hero.title} text={headline} />
                <p className={hero.description}>{byline}</p>
              </div>
              <div className={cx(hero.content, hero.fade_in_right)}>
                {links &&
                  links.map(({ url: canonicalUrl, slug, title }, index) => (
                    <Button
                      url={`/${slug}`}
                      key={slug}
                      variant={index > 0 ? 'inverse' : 'default'}
                      className={hero.button}
                    >
                      {title}
                    </Button>
                  ))}
              </div>
            </div>
            <div className={cx(hero.image)}>
              {supportingImageUrl && (
                <img
                  className={hero.image__source}
                  src={supportingImageUrl}
                  alt={slug}
                />
              )}
            </div>
          </Row>
        </Container>
      </div>
    </div>
  )
}

Hero.propTypes = {
  headline: PropTypes.string,
  byline: PropTypes.string,
  slug: PropTypes.string,
  links: PropTypes.array,
  backgroundImageUrl: PropTypes.string,
  supportingImageUrl: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool,
  informHeight: PropTypes.func,
}

export default Hero
