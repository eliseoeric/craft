import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCircle,
  faChevronUp,
  faPlus,
  faMinus,
  faCheck,
  faExclamation,
  faTimes,
  faInfo,
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faComment } from '@fortawesome/free-regular-svg-icons'
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faYoutube,
  faInstagram,
  faMedium,
  faMediumM,
  faDribbble,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faCircle,
  faComment,
  faChevronUp,
  faEnvelope,
  faFacebook,
  faYoutube,
  faInstagram,
  faDribbble,
  faMediumM,
  faLinkedin,
  faTwitter,
  faPlus,
  faMinus,
  faCheck,
  faExclamation,
  faTimes,
  faInfo
)

export { default as wrapRootElement } from '@State/utils/ReduxWrapper'
