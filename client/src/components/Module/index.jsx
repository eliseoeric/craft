import React from 'react'

import SingleMedia from '@Modules/SingleMedia'
import CaseStudyMockUp from '@Modules/CaseStudyMockUp'
import TestimonyModule from '@Modules/Testimony'
import ContentThreeColumns from '@Modules/ContentThreeColumns'

// todo refactor to be stateless
export default class Module extends React.Component {
  renderModule(type, attributes) {
    const moduleCallbacks = {
      ContentfulModuleSingleMedia: (attributes) => (
        <SingleMedia {...attributes} />
      ),
      ContentfulModuleCaseStudyMockUp: (attributes) => (
        <CaseStudyMockUp {...attributes} />
      ),
      ContentfulModuleTestimony: (attributes) => (
        <TestimonyModule {...attributes} />
      ),
      ContentfulModuleContentThreeColumns: (attributes) => (
        <ContentThreeColumns {...attributes} />
      ),
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
