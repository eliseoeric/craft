import cx from 'classnames'
import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import OrbContainer from '@Components/OrbContainer'
import BlurredList from '@Components/BlurredList'
import * as styles from './contact.module.scss'

const ContactBlock = ({ links, addresses, featuredImage }) => {
  const items = links.map((link) => {
    return {
      url: link.url,
      text: link.title,
    }
  })
  return (
    <section className={styles.contact_block}>
      <BlurredList className={styles.contact_block__list} items={items} />
      <div className={styles.contact_block__details}>
        <figure>
          <GatsbyImage
            image={getImage(featuredImage)}
            alt="team"
            className={styles.contact_block__image}
          />
        </figure>
        <div className={styles.contact_block__address}>
          {addresses &&
            addresses.map((location) => {
              return (
                <address>
                  <strong>{location.title}</strong>
                  {location.address}
                  <br />
                  {location.city && <span>{location.city}, {location.state}</span>}
                  <br />
                  {location.zip}
                </address>
              )
            })}
        </div>
      </div>
      <OrbContainer
        className={styles.contact_block__orb_container}
        originXGetter={() => window.innerWidth / 15}
        originYGetter={() => window.innerHeight / 2.5}
        radiusRange={[250, 275]}
      />
    </section>
  )
}

export default ContactBlock
