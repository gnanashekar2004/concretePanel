import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section1.module.css';

const Section1 = () =>{
  return(
    <div className={styles.container}>
      <div className={styles.heading}>
        Type of pavement considered
      </div>
      <div>
        <Grid className={styles.gridContainer} container spacing={2}>
        <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Carriageway:</p>
            <select className={styles.dropdown} name="Carriageway">
              <option value="1">2-Lane Undivided</option>
              <option value="2">4-Lane Divided</option>
              <option value="3">6-Lane Divided</option>
              <option value="4">8-Lane Divided</option>
              <option value="5">4-Lane Undivided</option>
              <option value="6">6-Lane Undivided</option>
              <option value="7">8-Lane Undivided</option>
            </select>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Slab Size:</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Lane Width (m):</p>
            <select className={styles.dropdown} name="Lane Width" >
              <option value="3.5">3.5</option>
              <option value="3.6">3.6</option>
              <option value="3.7">3.7</option>
              <option value="3.8">3.8</option>
              <option value="3.9">3.9</option>
              <option value="4.0">4.0</option>
              <option value="4.1">4.1</option>
              <option value="4.2">4.2</option>
              <option value="4.3">4.3</option>
              <option value="4.4">4.4</option>
              <option value="4.5">4.5</option>
            </select>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>With Concrete Shoulder:</p>
            <select className={styles.dropdown} name="With Concrete Shoulder" >
              <option value="No">NO</option>
              <option value="Yes">YES</option>
            </select>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Section1;