import React from 'react'
import PropTypes from 'prop-types'
import Button from '@Components/Button'
import * as map from './map.module.scss'
import MapImage from '@Images/map.png'

const WidgetMap = ({ className }) => {
  return (
    <div className={map.background_image}>
      <img src={MapImage} alt="map" />
      <Button className={map.button} variant={'secondary_light'} url="/locations">Find a Store</Button>
    </div>
  )
}

export default WidgetMap
