import React from 'react';
import styles from './safeBox.module.css';

const SafeBox = ({ status }) => {
  return (
    <div className={`${styles.header} ${status === 'Safe' ? styles.safe : styles.unsafe}`}>
      <div className={styles.innerHeader}>
        <h1>{status === 'Safe' ? 'Safe' : 'Unsafe'}</h1>
      </div>

      {/* Waves container */}
      <div className={styles.wavesContainer}>
        <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className={styles.parallax}>
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.4)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.2)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SafeBox;
