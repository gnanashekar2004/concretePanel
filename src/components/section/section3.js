import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section3.module.css';

const Section3 = () =>{
  return(
    <div className={styles.container}>
      <div className={styles.heading}>
        Pavement Structural Details
      </div>
      <div>
        <Grid className={styles.gridContainer} container spacing={2}>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Proportion of Front single (steering) Axles (K1):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Proportion of Rear single Axles (K2):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Proportion of tandem Axles (K3):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Proportion of Tridem Axles (K4):</p>
            <input className={styles.inputs}/>
          </Grid>
          
        </Grid>
      </div>
    </div>
  );
}

export default Section3;