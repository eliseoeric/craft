import React from 'react'
import cx from 'classnames'
import urls from '@Utils/urls'
import { graphql } from 'gatsby'
import { H2 } from '@Components/Typography'
import * as style from './blogExcerpt.module.scss'

const renderCategoryString = (categories) => {
  const catstring = categories.reduce((acc, cur) => {
    acc = `${acc}${cur}, `
    return acc
  }, '')
  return catstring.slice(0, -2)
}

const BlogExcerpt = ({
  className,
  categories,
  createdAt,
  handleMouseHover,
  handleMouseLeave,
  hoveredIndex,
  index,
  postSlug,
  title
}) => {

  return (
    <article 
      className={cx(className, style.blogExcerpt,
        { [style.blur]: index !== hoveredIndex && hoveredIndex !== -1 })}
      onMouseOver={() => handleMouseLeave()}>
        <a
          href={`${urls.news()}/${postSlug}`}
          onMouseOver={handleMouseHover}
          className={cx(style.blogLink)}>
            <H2 text={title} className={cx(style.blogExcerptH2)} />
        </a>
        <p>{createdAt}</p>
        <p><span>{renderCategoryString(categories)}</span><span> — 3 min read</span></p>
    </article>
  )
}

export default BlogExcerpt

export const query = graphql`
  fragment BlogExcerptQuery on ContentfulTypeBlogPost {
    category
    createdAt(formatString: "M.D.YY")
    slug
    title
  }
`