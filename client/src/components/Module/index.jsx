import React from 'react'

import SingleMedia from '@Modules/SingleMedia'

// todo refactor to be stateless
export default class Module extends React.Component {
  renderModule(type, attributes) {
    const moduleCallbacks = {
      ContentfulModuleSingleMedia: (attributes) => (
        <SingleMedia {...attributes} />
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
