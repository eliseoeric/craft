import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import * as styles from './clock.module.scss'

const Clock = ({ className, locationLabel, timeZone, updateInterval }) => {

  // Refs for easy React-DOM manipulation
  const hourHand = useRef();
  const minuteHand = useRef();

  // change the timeZone
  function changeTimezone(date, ianatz) {
    const invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));
    const diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff); // needs to substract
  }

  // get time based on requested timeZone
  const getTime = (timeZone, hourHand, minuteHand) => {
    console.log('setting time');
    const here = new Date();
    const there = changeTimezone(here, timeZone);

    const minutes = there.getMinutes();
    const minutesDegree = (((minutes / 60) * 360) + 180);
    minuteHand.style.transform = `rotate(${minutesDegree}deg) translateX(-50%)`;
  
    const hours = there.getHours();
    const minuteOffset = Math.floor(minutes / 60) * 30;
    const hoursDegree = (((hours / 12) * 360) + 180) + minuteOffset;
    hourHand.style.transform = `rotate(${hoursDegree}deg) translateX(-50%)`;
  };

  useEffect(() => {
    getTime(timeZone, hourHand.current, minuteHand.current);
    const intervalID = setInterval(
      getTime.bind(undefined, timeZone, hourHand.current, minuteHand.current), updateInterval
    );

    // clean up interval in development so it doesn't crash
    // the browser
    return () => {
      clearInterval(intervalID);
    }
  }, [hourHand, minuteHand]);

  return (
    <div className={cx(className)}>
      <div className={cx(styles.clock__wrap)}>
        <div className={cx(styles.clock__face)}>
          <div className={cx(styles.hand, styles.hand__hour)} ref={hourHand} />
          <div className={cx(styles.hand)} ref={minuteHand} />
          <div className={cx(styles.clock__center)} />
        </div>
      </div>
      <p className={cx('text-center')}>{locationLabel}</p>
    </div>
  )
}

Clock.propTypes = {
  locationLabel: PropTypes.string.isRequired,
  timeZone: PropTypes.string.isRequired,
  updateInterval: PropTypes.number.isRequired
};

Clock.defaultProps = {
  updateInterval: 1000 * 15 // 15 seconds
};

export default Clock
