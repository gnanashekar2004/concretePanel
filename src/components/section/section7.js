import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section7.module.css';

const Section7 = ({ signal }) => {
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
            <div className={`${!signal ? styles.hidden : ""}`}>
                <Grid className={styles.gridContainer} container spacing={2}>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <div className={styles.output}>
                            <div className={styles.outputLabel}>
                                Negative Temp Differential (<sup>o</sup>C):
                            </div>
                            <div className={styles.outputValues}>
                                29
                            </div>
                        </div>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <div className={styles.output}>
                            <div className={styles.outputLabel}>
                                Radius of Relative Stiffness (cm):
                            </div>
                            <div className={styles.outputValues}>
                                7
                            </div>
                        </div>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <div className={styles.output}>
                            <div className={styles.outputLabel}>
                                Curling Tensile stress at corner (kgcm<sup>-2</sup>):
                            </div>
                            <div className={styles.outputValues}>
                                28
                            </div>
                        </div>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <div className={styles.output}>
                            <div className={styles.outputLabel}>
                                Corner Tensile Bending stress in a slab for 8T single axle load:
                            </div>
                            <div className={styles.outputValues}>
                                82
                            </div>
                        </div>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <div className={styles.output}>
                            <div className={styles.outputLabel}>
                                Corner Tensile Bending stress in a slab for 16T Tandom axle load:
                            </div>
                            <div className={styles.outputValues}>
                                99
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Section7;