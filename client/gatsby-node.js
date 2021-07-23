const path = require('path')
const fs = require('fs')

const TEMPLATES = {
  Page: 'page',
  Contact: 'contact',
  Careers: 'careers',
  'Case Study': 'caseStudy',
  Post: 'post',
  Role: 'role',
}

/**
 * Returns a page layout component based on the node's layout.template property.
 *
 * If the layout is null, will default to a default page type which is either `page.js`
 * or whatever is passed as the second parameter.
 * @param {*} layout
 * @param {*} defaultTemplate
 * @returns
 */
const getTemplate = (layout, defaultTemplate = TEMPLATES['Page']) => {
  const defaultTemplatePath = path.resolve(
    `./src/templates/${defaultTemplate}.js`
  )

  if (layout && layout.template) {
    const templateType = TEMPLATES[layout.template]
    const templatePath = path.resolve(`./src/templates/${templateType}.js`)
    return fs.existsSync(templatePath) ? templatePath : defaultTemplatePath
  }
  return defaultTemplatePath
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /pixi.js|filter-kawase-blur/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const results = await graphql(`
    fragment SingleMediaModule on ContentfulModuleSingleMedia {
      slug
      title
      description
      media {
        file {
          fileName
          url
        }
      }
    }
    fragment CaseStudyMockUpModule on ContentfulModuleCaseStudyMockUp {
      title
      mocks {
        file {
          url
          contentType
        }
      }
    }
    fragment TestimonyModule on ContentfulModuleTestimony {
      slug
      testimony
      citation
    }
    fragment ContentThreeColumnsModule on ContentfulModuleContentThreeColumns {
      slug
      title
      columnCenter {
        raw
      }
      columnLeft {
        raw
      }
      columnRight {
        raw
      }
    }
    fragment IconShowcaseModule on ContentfulModuleIconShowcase {
      slug
      title
      typeVariant
      category
      iconBox {
        id
        iconName
        icon {
          file {
            url
          }
        }
      }
    }
    fragment ColorPaletteModule on ContentfulModuleColorPalette {
      palette {
        hex
        opacity
        rga
        title
      }
      title
    }
    fragment CarouselModule on ContentfulModuleCarousel {
      title
      slug
      slides {
        title
        slug
        description
        media {
          file {
            url
          }
        }
      }
    }
    fragment StatisticModule on ContentfulModuleStats {
      slug
      title
      statistics {
        title
        value
      }
    }
    fragment ContentWithHeadlineModuleQuery on ContentfulModuleContentWithHeadline {
      title
      displayOrb
      alignOrb
      contentLayout
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    {
      allContentfulTypeCaseStudy {
        edges {
          node {
            title
            slug
            orbColor1
            orbColor2
            description {
              childrenMarkdownRemark {
                rawMarkdownBody
              }
            }
            layout {
              template
              contentModules {
                __typename
                ...SingleMediaModule
                ...CaseStudyMockUpModule
                ...TestimonyModule
                ...ContentThreeColumnsModule
                ...IconShowcaseModule
                ...ColorPaletteModule
                ...CarouselModule
                ...StatisticModule
                ...ContentWithHeadlineModuleQuery
              }
            }
          }
        }
      }
      allContentfulTypeRole {
        edges {
          node {
            title
            slug
            location
            jobDescription {
              raw
            }
            updatedAt
            applicationLink
          }
        }
      }
      allContentfulTypeBlogPost {
        edges {
          node {
            title
            slug
            category
            content {
              raw
              references {
                gatsbyImageData(aspectRatio: 1.5)
                title
              }
            }
            featuredImage {
              gatsbyImageData(aspectRatio: 1.5)
              title
            }
            updatedAt
          }
          next {
            slug
            title
            featuredImage {
              gatsbyImageData(aspectRatio: 1.5)
            }
          }
        }
      }
      allContentfulPage {
        edges {
          node {
            canonicalUrl
            id
            slug
            title
            layout {
              template
            }
            description {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
        }
      }
    }
  `)

  results.data.allContentfulPage.edges.forEach((post, index) => {
    // front-page slug should be /
    const _path = post.node.slug === 'front-page' ? '/' : `/${post.node.slug}/`
    const _layout = post.node.layout

    /**
     * Create the standard pages
     */
    createPage({
      path: _path,
      component: getTemplate(_layout),
      context: {
        slug: post.node.slug,
        allPosts: results.data.allContentfulTypeBlogPost,
        allRoles: results.data.allContentfulTypeRole,
        allCaseStudies: results.data.allContentfulTypeCaseStudy,
      },
    })
  })

  /**
   * Create the Case Studies
   */
  results.data.allContentfulTypeCaseStudy.edges.forEach((post, index) => {
    // front-page slug should be /
    const path = `/case-studies/${post.node.slug}/`
    const _layout = post.node.layout

    createPage({
      path: path,
      component: getTemplate(_layout, TEMPLATES['Case Study']),
      context: {
        slug: post.node.slug,
        allPosts: results.data.allContentfulTypeBlogPost,
        allRoles: results.data.allContentfulTypeRole,
        allCaseStudies: results.data.allContentfulTypeCaseStudy,
      },
    })
  })

  /**
   * Create the careers/roles
   */
  results.data.allContentfulTypeRole.edges.forEach((post, index) => {
    // front-page slug should be /
    const path = `/careers/${post.node.slug}/`
    const _layout = post.node.layout

    createPage({
      path: path,
      component: getTemplate(_layout, TEMPLATES['Role']),
      context: {
        slug: post.node.slug,
        allPosts: results.data.allContentfulTypeBlogPost,
        allRoles: results.data.allContentfulTypeRole,
        allCaseStudies: results.data.allContentfulTypeCaseStudy,
      },
    })
  })

  /**
   * Create the blog posts
   */
  results.data.allContentfulTypeBlogPost.edges.forEach((post, index) => {
    const path = `/news/${post.node.slug}/`
    const _layout = post.node.layout

    createPage({
      path: path,
      component: getTemplate(_layout, TEMPLATES['Post']),
      context: {
        slug: post.node.slug,
        next: post.next,
        allPosts: results.data.allContentfulTypeBlogPost,
        allRoles: results.data.allContentfulTypeRole,
        allCaseStudies: results.data.allContentfulTypeCaseStudy,
      },
    })
  })
}
