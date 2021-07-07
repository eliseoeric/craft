const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// Contentful config values pulled from .env
const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
}

// Google Analytics values pulled from .env
const googleAnalytics = {
  code: process.env.GOOGLE_ANALYTICS_CODE,
}

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Craft - Made By Craft',
    titleTemplate: `%s - Craft`,
    description: ``,
    url: 'https://www.madebycraft.co',
    siteUrl: `https://www.madebycraft.co`,
    image: '/images/logo-dark.svg',
    author: `Eleven 11`,
    twitterUsername: ``,
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/svg/, // See below to configure properly
        },
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    // {
    //   resolve: 'gatsby-plugin-web-font-loader',
    //   options: {
    //     events: true,
    //     google: {
    //       families: ['Montserrat']
    //     },
    //     custom: {
    //       families: ['AlternateGothicNo2D']
    //     },
    //   },
    // },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/about/`, `/case-studies/*`, `careers`, `/`, `contact`, `news`],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: googleAnalytics.code,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-fonts`,
    //   options: {
    //     fonts: [`montserrat\:300,400,500,600,700`],
    //     display: 'swap',
    //   },
    // },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@Components': path.resolve(__dirname, 'src/components'),
          '@Modules': path.resolve(__dirname, 'src/modules'),
          '@Layouts': path.resolve(__dirname, 'src/layouts'),
          '@Utils': path.resolve(__dirname, 'src/utils'),
          '@SVGs': path.resolve(__dirname, 'src/images/svg'),
          '@Images': path.resolve(__dirname, 'src/images'),
          '@State': path.resolve(__dirname, 'src/state'),
          '@Hooks': path.resolve(__dirname, 'src/hooks'),
          '@Services': path.resolve(__dirname, 'src/service'),
        },
        extensions: [],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Socratic`,
        short_name: `Socratic`,
        start_url: `/`,
        icon: `src/images/favicons/android-chrome-512x512.png`,
        display: `standalone`,
        icons: [
          {
            src: `src/images/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-touch-icon.png`,
            sizes: `180x180`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/favicon-16x16.png`,
            sizes: `16x16`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/favicon-32x32.png`,
            sizes: `32x32`,
            type: `image/png`,
          },
        ]
      },
    },
  ],
}
