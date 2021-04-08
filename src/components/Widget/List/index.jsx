import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import * as list from './list.module.scss'

const WidgetList = ({ links, className }) => {
  return (
    <ul>
      {links &&
        links.map((item) => {
          // todo check if external link
          return (
            <li key={item.slug} className={list.column__item}>
              <Link to={`/${item.slug}`} className={list.column__link}>
                {item.title}
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

export default WidgetList
