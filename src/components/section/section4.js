import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section4.module.css';

const Section4 = () =>{
  return(
    <div className={styles.container}>
      <div className={styles.heading}>
        Section 4
      </div>
      <div>
        <Grid className={styles.gridContainer} container spacing={2}>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Thickness of Granular Subbase (mm):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Thickness of Dry Lean Concrete Subbase (mm):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Effective modulus of subgrade reaction of foundation (MPa/m):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Unit weight if Concrete (kN/m<sup>3</sup>):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>28-day Flexural strength of cement concrete (MPa):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Max. day-time Temperature Differential in slab, 0<sup>o</sup>C (for bottom-up cracking):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Trial Thickness of Concrete Slab (m):</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Elastic Modulus of Concrete(MPa):</p>
            <input className={styles.inputs}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Section4;