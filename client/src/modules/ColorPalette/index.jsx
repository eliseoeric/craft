import React from 'react'
import cx from 'classnames'
import { graphql } from 'gatsby'
import Container from '@Components/Grid/Container'
import Row from '@Components/Grid/Row'
import ColorPaletteSquare from '@Components/ColorPaletteSquare'
import * as style from './colorPalette.module.scss'
import { H4 } from '@Components/Typography'

const ColorPalette = ({className, palette, title}) => {
  const squares = palette.map((s, i) => (
    <ColorPaletteSquare
      className={className}
      rga={s.rga}
      opacity={s.opacity}
      title={s.title}
      hex={s.hex}
      key={s.hex} 
      index={i+1} />
  ));
  return (
    <section className={cx(style.section)}>
      <Container className={cx(style.container)}>
        <Row>
          {squares}
        </Row>
        <Row>
          <H4 className={cx(style.title)} text={title} />
          <p className={cx(style.desc)}>Primary color palette</p>
        </Row>
      </Container>
    </section>
  )
};

export default ColorPalette

export const query = graphql`
  fragment ColorPaletteModule on ContentfulModuleColorPalette {
    palette {
      hex
      opacity
      rga
      title
    }
    title
  }
`