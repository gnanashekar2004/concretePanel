import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section6.module.css';

const Section6 = () => {
    return(
        <div className={styles.container}>
        <div>
            <Grid className={styles.gridContainer} container spacing={2}>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Design Period (years):</p>
                <input className={styles.inputs}/>
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Traffic Growth Rate (r):</p>
                <input className={styles.inputs}/>
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Commerical Traffic (cvpd):</p>
                <input className={styles.inputs}/>
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Grade of Concrete:</p>
                <input className={styles.inputs}/>
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>CBR (%):</p>
                <input className={styles.inputs}/>
            </Grid>
            </Grid>
        </div>
        </div>
    );
};

export default Section6;