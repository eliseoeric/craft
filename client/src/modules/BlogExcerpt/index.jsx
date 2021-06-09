import React from 'react'
import cx from 'classnames'
import urls from '@Utils/urls'
import { graphql } from 'gatsby'
import { H2 } from '@Components/Typography'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
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
  featuredImage,
  handleMouseHover,
  handleMouseLeave,
  hoveredIndex,
  index,
  postSlug,
  title
}) => {

  const image = getImage(featuredImage)

  return (
    <article 
      className={cx(className, style.blogExcerpt,
        { [style.blur]: index !== hoveredIndex && hoveredIndex !== -1 })}
      onMouseOver={() => handleMouseLeave()}>
        <div className={cx(style.contentWrapper)}>
          <div className={cx(style.flexItem)}>
            <a
              href={`${urls.news()}/${postSlug}`}
              onMouseOver={handleMouseHover}
              className={cx(style.blogLink)}>
                <H2 text={title} className={cx(style.blogExcerptH2)} />
            </a>
            <p>{createdAt}</p>
            <p>
              <span>{renderCategoryString(categories)}</span>
              <span> — 3 min read</span>
            </p>
          </div>
          <div 
            style={{opacity: index === hoveredIndex ? 1 : 0}} 
            className={cx(style.flexItem, style.imgWrap)}>
              {image && (<GatsbyImage
                            image={image}
                            alt="" />)}
          </div>
        </div>
    </article>
  )
}

export default BlogExcerpt

export const query = graphql`
  fragment BlogExcerptQuery on ContentfulTypeBlogPost {
    category
    createdAt(formatString: "M.D.YY")
    featuredImage {
      gatsbyImageData(width: 300)
    }
    slug
    title
  }
`