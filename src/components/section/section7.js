import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section7.module.css';

const Section7 = () => {
    return(
        <div className={styles.container}>
            <div>
                <Grid className={styles.gridContainer} container spacing={2}>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Modulus of Rupture (kgcm<sup>-2</sup>):</p>
                        <input className={styles.inputs}/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Load Safety Factor:</p>
                        <input className={styles.inputs}/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Trail Thickness (cm):</p>
                        <input className={styles.inputs}/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Elastic Modulus of Concrete (E):</p>
                        <input className={styles.inputs}/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Poisson's ratio of concrete (μ):</p>
                        <input className={styles.inputs}/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Eff. Modulus subgrade Rxn foundation (k):</p>
                        <input className={styles.inputs}/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Coefficient of Thermal Expansion (/<sup>o</sup>C) :</p>
                        <input className={styles.inputs}/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Length of Square Slab (cm):</p>
                        <input className={styles.inputs}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Section7;