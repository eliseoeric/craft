import React from 'react'

import CaseStudyMockUp from '@Modules/CaseStudyMockUp'

// todo refactor to be stateless
export default class Module extends React.Component {
  renderModule(type, attributes) {
    const moduleCallbacks = {
      ContentfulModuleCaseStudyMockUp: (attributes) => (
        <CaseStudyMockUp {...attributes} />
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
