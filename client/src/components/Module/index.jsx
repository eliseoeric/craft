import React from 'react'

import SingleMedia from '@Modules/SingleMedia'
import CaseStudyMockUp from '@Modules/CaseStudyMockUp'
import TestimonyModule from '@Modules/Testimony'
import ContentThreeColumns from '@Modules/ContentThreeColumns'
import ContentWithHeadline from '@Modules/ContentWithHeadline'
import IconShowcase from '@Modules/IconShowcase'
import ColorPaletteModule from '@Modules/ColorPalette'
import CarouselModule from '@Modules/Carousel'
import Statistics from '@Modules/Statistics'
import SelectedWorks from '@Modules/SelectedWorks'
import HeroModule from '@Modules/Hero'
import TeamMembers from '@Modules/TeamMembers'
import BlogIndex from '@Modules/BlogIndex'
import ImageGroup from '@Modules/ImageGroup'

// todo refactor to be stateless
export default class Module extends React.Component {
  renderModule(type, attributes) {
    const moduleCallbacks = {
      ContentfulModuleSingleMedia: (attributes) => <SingleMedia {...attributes} />,
      ContentfulModuleCaseStudyMockUp: (attributes) => <CaseStudyMockUp {...attributes} />,
      ContentfulModuleTestimony: (attributes) => <TestimonyModule {...attributes} />,
      ContentfulModuleContentThreeColumns: (attributes) => <ContentThreeColumns {...attributes} />,
      ContentfulModuleContentWithHeadline: (attributes) => <ContentWithHeadline {...attributes} />,
      ContentfulModuleIconShowcase: (attributes) => <IconShowcase {...attributes} />,
      ContentfulModuleColorPalette: (attributes) => <ColorPaletteModule {...attributes} />,
      ContentfulModuleCarousel: (attributes) => <CarouselModule {...attributes} />,
      ContentfulModuleStats: (attributes) => <Statistics {...attributes} />,
      ContentfulModuleSelectedWorks: (attributes) => <SelectedWorks {...attributes} />,
      ContentfulModuleHero: (attributes) => <HeroModule {...attributes} />,
      ContentfulModuleTeamMembers: (attributes) => <TeamMembers {...attributes} />,
      ContentfulModuleBlogIndex: (attributes) => <BlogIndex {...attributes} />,
      ContentfulModuleImageGroup: (attributes) => <ImageGroup {...attributes} />,
    }

    // prevent app from crashing when module is not defined
    if (moduleCallbacks[type] !== undefined) {
      return moduleCallbacks[type](attributes)
    }

    return null
  }

  render() {
    const { attributes, type } = this.props
    return this.renderModule(type, attributes)
  }
}
