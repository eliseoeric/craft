import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import * as style from './colorPaletteSquare.module.scss';

const ColorPaletteSquare = ({className, index, rga, opacity, title, hex}) => {

  if(index < 10) index = `0${index}`;

  var getContrast = function (hexcolor){

    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
      hexcolor = hexcolor.slice(1);
    }
  
    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
      hexcolor = hexcolor.split('').map(function (hex) {
        return hex + hex;
      }).join('');
    }
  
    // Convert to RGB value
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
  
    // Get YIQ ratio
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
    // Check contrast
    return (yiq >= 128) ? 'black' : 'white';
  };

  const textColor = getContrast(hex);
  
  return (
    <div 
      style={{backgroundColor: hex, color: textColor}}
      className={cx(className, style.square)}>
        <div className={cx(style.top__info)}>
          <div>{hex}</div>
          <div>RGB {rga}</div>
          <div>{opacity}</div>
        </div>
        <div>
          <span className={cx(style.index)}>{index}</span>
          <span className={cx()}>#{title}</span>
        </div>
    </div>
  )
};

ColorPaletteSquare.propTypes = {
  rga: PropTypes.string.isRequired,
  opacity: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hex: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default ColorPaletteSquare;