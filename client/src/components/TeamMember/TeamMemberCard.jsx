import React from 'react'

import SocialIconsAlt from '@Components/SocialIconsAlt'

import * as styles from './member.module.scss'

const TeamMemberCard = ({
  fullName,
  jobTitle,
  headshot,
  headshotOnHover,
  dribbleUrl,
  instagramUrl,
  linkedInUrl,
  mediumUrl,
  spotifyUrl,
  onClick,
}) => {
  console.log({spotifyUrl})
  return (
    <div className={styles.team_grid__item}>
      {headshot?.file?.url && (
        <figure className={styles.team_grid__item_image} onClick={onClick}>
          <img
            className={styles.headshot}
            src={headshot.file.url}
            alt="bio image"
          />
          {headshotOnHover?.file.url && (
            <img
              className={styles.headshot_overlay}
              src={headshotOnHover.file.url}
              alt="bio image"
            />
          )}
          <figcaption>Bio</figcaption>
        </figure>
      )}

      <div className={styles.team_grid__details}>
        <div className={styles.team_grid__meta}>
          <h3 className={styles.team_grid__title}>
            <a onClick={onClick}>{fullName}</a>
          </h3>
          <p className={styles.team_grid__designation}>{jobTitle}</p>
        </div>
        <SocialIconsAlt
          {...{ dribbleUrl, instagramUrl, linkedInUrl, mediumUrl, spotifyUrl }}
        />
      </div>
    </div>
  )
}

export default TeamMemberCard
