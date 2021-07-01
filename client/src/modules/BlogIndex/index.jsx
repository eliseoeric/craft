import cx from 'classnames'
import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'


import BlogExcerpt from '@Modules/BlogExcerpt'
import * as style from './blogIndex.module.scss'

const BlogIndex = ({ className }) => {
  const query = useStaticQuery(graphql`
    {
      posts: allContentfulTypeBlogPost(
        sort: { fields: [content___references___createdAt], order: ASC }
      ) {
        edges {
          node {
            ...BlogExcerptQuery
          }
        }
      }
    }
  `)

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
      {query.posts.edges.map(({ node }, idx) => (
        <BlogExcerpt
          handleMouseHover={(event) => handleMouseHover(event, idx)}
          handleMouseLeave={handleMouseLeave}
          hoveredIndex={hoveredIndex}
          index={idx}
          categories={node.category}
          createdAt={node.createdAt}
          featuredImage={node.featuredImage}
          key={node.title}
          postSlug={node.slug}
          title={node.title}
        />
      ))}
    </div>
  )
}

export default BlogIndex
