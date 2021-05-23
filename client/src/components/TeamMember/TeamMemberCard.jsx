import React from 'react'

import SocialIconsAlt from '@Components/SocialIconsAlt'

import * as styles from './member.module.scss'

const TeamMemberCard = ({
  fullName,
  jobTitle,
  headshot,
  dribbleUrl,
  instagramUrl,
  linkedInUrl,
  mediumUrl,
  onClick,
}) => {
  return (
    <div className={styles.team_grid__item}>
      <figure className={styles.team_grid__item_image} onClick={onClick}>
        <img src={headshot.file.url} alt="bio image" />
        <figcaption>Bio</figcaption>
      </figure>
      <div className={styles.team_grid__details}>
        <div className={styles.team_grid__meta}>
          <h3 className={styles.team_grid__title}>
            <a onClick={onClick}>{fullName}</a>
          </h3>
          <p className={styles.team_grid__designation}>{jobTitle}</p>
        </div>
        <SocialIconsAlt
          {...{ dribbleUrl, instagramUrl, linkedInUrl, mediumUrl }}
        />
      </div>
    </div>
  )
}

export default TeamMemberCard
