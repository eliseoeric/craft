const Promise = require('bluebird')
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
  const defaultTemplatePath = path.resolve(`./src/templates/${defaultTemplate}.js`)

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
  const pageTemplatePath = path.resolve('./src/templates/page.js')
  const results = await graphql(`
    {
      allContentfulTypeCaseStudy {
        edges {
          node {
            slug
            title
            description {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
        }
      }
      allContentfulTypeRole {
        edges {
          node {
            slug
            title
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
    const _layout = post.node.layout;

    /**
     * Create the standard pages
     */
    createPage({
      path: _path,
      component: getTemplate(_layout),
      context: {
        slug: post.node.slug,
      },
    })
  })

  /**
   * Create the Case Studies
   */
  results.data.allContentfulTypeCaseStudy.edges.forEach((post, index) => {
    // front-page slug should be /
    const path = `/case-studies/${post.node.slug}/`
    const _layout = post.node.layout;

    createPage({
      path: path,
      component: getTemplate(_layout, TEMPLATES['Case Study']),
      context: {
        slug: post.node.slug,
      },
    })
  })
  
  /**
   * Create the careers/roles
   */
  results.data.allContentfulTypeRole.edges.forEach((post, index) => {
    // front-page slug should be /
    const path = `/careers/${post.node.slug}/`
    const _layout = post.node.layout;

    createPage({
      path: path,
      component: getTemplate(_layout, TEMPLATES['Role']),
      context: {
        slug: post.node.slug,
      },
    })
  })
}