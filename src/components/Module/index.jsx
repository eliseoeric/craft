import React from 'react'

import HeroSliderModule from '@Modules/HeroSlider'
import FeaturedStepsModule from '@Modules/FeaturedSteps'
import FeaturedImageSplitModule from '@Modules/FeaturedImageSplit'
import CopyRightAlignedModule from '@Modules/CopyRightAligned'
import HeroCenteredTextModule from '@Modules/HeroCenteredText'
import CoreValuesModule from '@Modules/CoreValues'
import LocationMapModule from '@Modules/LocationMap'
import PlansModule from '@Modules/Plans'
import ProductGrid from '@Modules/ProductGrid'
import CallToAction from '@Modules/CallToAction'
import FAQs from '@Modules/FAQs'
import Account from '@Modules/Account'

// todo refactor to be stateless
export default class Module extends React.Component {
  renderModule(type, attributes) {
    const moduleCallbacks = {
      ContentfulModuleCoverSlider: (attributes) => (
        <HeroSliderModule {...attributes} transitionSpeed={8000} />
      ),
      ContentfulModuleFeaturedSteps: (attributes) => (
        <FeaturedStepsModule {...attributes} />
      ),
      ContentfulModuleFeaturedImageSplit: (attributes) => (
        <FeaturedImageSplitModule {...attributes} />
      ),
      ContentfulModuleCopyRightAligned: (attributes) => (
        <CopyRightAlignedModule {...attributes} />
      ),
      ContentfulModuleHeroCenteredText: (attributes) => (
        <HeroCenteredTextModule {...attributes} />
      ),
      ContentfulModuleCoreValues: (attributes) => (
        <CoreValuesModule {...attributes} />
      ),
      ContentfulModuleLocationMap: (attributes) => (
        <LocationMapModule {...attributes} />
      ),
      ContentfulModuleMembershipPlans: (attributes) => (
        <PlansModule {...attributes} />
      ),
      ContentfulModuleProductGrid: (attributes) => (
        <ProductGrid {...attributes} />
      ),
      ContentfulModuleCallToAction: (attributes) => (
        <CallToAction {...attributes} />
      ),
      ContentfulModuleFaQs: (attributes) => (
        <FAQs {...attributes} />
      ),
      ContentfulModuleAccount: (attributes) => (
        <Account {...attributes} />
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
