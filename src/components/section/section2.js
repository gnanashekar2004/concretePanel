import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section2.module.css';

const Section2 = () =>{
  return(
    <div className={styles.container}>
      <div className={styles.heading}>
        Section 2
      </div>
      <div>
        <Grid className={styles.gridContainer} container spacing={2}>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Input 1</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Input 2</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Input 3</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Dropdown 1</p>
            <select className={styles.dropdown} name="dropdown1">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
            </select>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Input 4</p>
            <input className={styles.inputs}/>
          </Grid>
          <Grid className={styles.grids} size={{xs:12, md:6}}>
            <p className={styles.inputLabel}>Dropdown 2</p>
            <select className={styles.dropdown} name="dropdown2" >
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Section2;