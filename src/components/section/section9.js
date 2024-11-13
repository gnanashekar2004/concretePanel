import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section9.module.css';

const Section9 = () => {
    return(
        <div className={styles.container}>
            <div className={styles.heading}>
        Type of pavement considered
      </div>
      <div>
        <Grid className={styles.gridContainer} container spacing={2}>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Carriageway:</p>
                <input type="text" className={styles.inputs} name="Carriageway" value="4-Lane Divided" readOnly />
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Tied Concrete Shoulders (Yes/No):</p>
                <select className={styles.dropdown} name="Ties Concrete Shoulders" >
                <option value="Yes">YES</option>
                <option value="No">NO</option>
                </select>
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Transverse Joint Spacing (m):</p>
                <input type="text" className={styles.inputs} name="Transverse Joint Spacing" value="4.5" readOnly />
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Lane Width (m):</p>
                <input type="text" className={styles.inputs} name="Lane Width" value="3.5" readOnly />
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Transverse Joints have Dowel bars? (Yes/No):</p>
                <select className={styles.dropdown} name="Transverse Joints have Dowel bars" >
                <option value="Yes">YES</option>
                <option value="No">NO</option>
                </select>
            </Grid>
        </Grid>
      </div>
        </div>
    );
};

export default Section9;
