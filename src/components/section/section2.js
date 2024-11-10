import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section2.module.css';

const formFields = [
  { label: 'Total Two-way Commercial Traffic (cvpd) in the year of completion of construction:' },
  { label: 'Av. Annual rate of growth of Commercial traffic (expressed as decimal):' },
  { label: 'Average No of axles per Commercial vehicle (B):' },
  { label: 'Proportion of traffic in predominant direction (For 2-lane 2-way highways use a value of 1.0) (C):' },
  { label: 'Wheel wander factor for Transverse cracking with positive temperature differential (DTP):' },
  { label: 'Wheel wander factor for Transverse cracking with negative temperature differential (DTN):' },
  { label: 'Wheel wander factor for Longitudinal cracking with positive temperature differential (DLP):' },
  { label: 'Wheel wander factor for Longitudinal cracking with negative temperature differential (DLN):' },
  { label: 'Factor for selection of traffic for BUC analysis (for six-hour period during day) (F):' },
  { label: 'Factor for selection of traffic for TDC analysis (for six-hour period during day) (G):' }
];

const Section2 = () =>{
  return(
    <div className={styles.container}>
      <div className={styles.heading}>
        Section 2
      </div>
      <div>
        <Grid container spacing={2} className={styles.gridContainer}>
          {formFields.map((field, index) => (
            <React.Fragment key={index}>
              <Grid className={styles.grids} size={{xs:12, md:4}}>
                <p className={styles.inputLabel}>{field.label}</p>
              </Grid>
              <Grid className={styles.gridsIP} size={{xs:12, md:8}}>
                <input className={styles.inputs}/>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Section2;