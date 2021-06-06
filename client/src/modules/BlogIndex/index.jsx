import cx from 'classnames'
import React, { useState } from 'react'
import BlogExcerpt from '@Modules/BlogExcerpt'
import * as style from './blogIndex.module.scss'
import Container from '@Components/Grid/Container'

const BlogIndex = ({className, posts}) => {

  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const handleMouseHover = (event, idx) => {
    event.stopPropagation() // dont fire handleMouseLeave
    setHoveredIndex(idx)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(-1)
  }

  return (
    <div className={cx(className, style.blogIndex)}>
      {posts.map(({node}, idx) => (
        <BlogExcerpt
          handleMouseHover={(event) => handleMouseHover(event, idx)}
          handleMouseLeave={handleMouseLeave}
          hoveredIndex={hoveredIndex}
          index={idx}
          categories={node.category}
          createdAt={node.createdAt}
          key={node.title}
          postSlug={node.slug}
          title={node.title} />
      ))}
    </div>
  )
}

export default BlogIndex