import React from 'react'
import cx from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { useDispatch } from 'react-redux'

import urls from '@Utils/urls'
import { H2 } from '@Components/Typography'
import { navigationActions } from '@State/ducks/ui/navigation'

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
  title,
}) => {
  const image = getImage(featuredImage)
  const dispatch = useDispatch();

  const loadBlogArticle = (event, post) => {
    event.preventDefault();
    dispatch(navigationActions.requestOpenDrawer({ template: 'post', slug: postSlug, invertPalette: false }))
   }

  return (
    <article
      className={cx(className, style.blogExcerpt, {
        [style.blur]: index !== hoveredIndex && hoveredIndex !== -1,
      })}
      onMouseOver={() => handleMouseLeave()}
    >
      <a 
        className={cx(style.contentWrapper, style.blogLink, style.transition)}
        href={`${urls.news()}/${postSlug}`}
        onClick={(event) => loadBlogArticle(event, postSlug)}
        onMouseOver={handleMouseHover}>
          <div className={cx(style.flexItem)}>
            <H2 text={title} className={cx(style.blogExcerptH2)} />
            <p>{createdAt}</p>
            <p>
              <span>{renderCategoryString(categories)}</span>
              <span> — 3 min read</span>
            </p>
          </div>
          <div
            style={{ opacity: index === hoveredIndex ? 1 : 0 }}
            className={cx(style.flexItem, style.imgWrap)}>
              {image && <GatsbyImage image={image} alt="" />}
          </div>
      </a>
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
