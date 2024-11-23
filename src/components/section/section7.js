import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section7.module.css';

const Section7 = ({ signal, onSubmit, results }) => {
    const [inputs,setInputs] = useState({
        modulusOfRupture: '',
        loadSafetyFactor: '',
        trailThickness: '',
        elasticModulus: '',
        poissonRatio: '',
        effModulus: '',
        coeffThermalExpansion: '',
        lengthOfSquareSlab: '',
    });

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setInputs((prev)=>({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(()=>{
        if(signal){
            onSubmit(inputs);
        }
    },[signal,inputs]);

    return(
        <div className={styles.container}>
            <div>
                <Grid className={styles.gridContainer} container spacing={2}>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Modulus of Rupture (kgcm<sup>-2</sup>):</p>
                        <input 
                            className={styles.inputs}
                            name="modulusOfRupture"
                            value={inputs.modulusOfRupture}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Load Safety Factor:</p>
                        <input 
                            className={styles.inputs}
                            name="loadSafetyFactor"
                            value={inputs.loadSafetyFactor}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Trail Thickness (cm):</p>
                        <input 
                            className={styles.inputs}
                            name="trailThickness"
                            value={inputs.trailThickness}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Elastic Modulus of Concrete (E):</p>
                        <input 
                            className={styles.inputs}
                            name="elasticModulus"
                            value={inputs.elasticModulus}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Poisson's ratio of concrete (μ):</p>
                        <input 
                            className={styles.inputs}
                            name="poissonRatio"
                            value={inputs.poissonRatio}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Eff. Modulus subgrade Rxn foundation (k):</p>
                        <input 
                            className={styles.inputs}
                            name="effModulus"
                            value={inputs.effModulus}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Coefficient of Thermal Expansion (/<sup>o</sup>C) :</p>
                        <input 
                            className={styles.inputs}
                            name="coeffThermalExpansion"
                            value={inputs.coeffThermalExpansion}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Length of Square Slab (cm):</p>
                        <input 
                            className={styles.inputs}
                            name="lengthOfSquareSlab"
                            value={inputs.lengthOfSquareSlab}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={`${!signal ? styles.hidden : ""}`}>
                {results && (
                    <Grid className={styles.gridContainer} container spacing={2}>
                        <Grid className={styles.grids} size={{xs:12, md:6}}>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>
                                    Negative Temp Differential (<sup>o</sup>C):
                                </div>
                                <div className={styles.outputValues}>
                                    {results.negTempDiff}
                                </div>
                            </div>
                        </Grid>
                        <Grid className={styles.grids} size={{xs:12, md:6}}>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>
                                    Radius of Relative Stiffness (cm):
                                </div>
                                <div className={styles.outputValues}>
                                    {results.radiusOfRelativeStiffness}
                                </div>
                            </div>
                        </Grid>
                        <Grid className={styles.grids} size={{xs:12, md:6}}>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>
                                    Curling Tensile stress at corner (kgcm<sup>-2</sup>):
                                </div>
                                <div className={styles.outputValues}>
                                    {results.curlingTensileStress}
                                </div>
                            </div>
                        </Grid>
                        <Grid className={styles.grids} size={{xs:12, md:6}}>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>
                                    Corner Tensile Bending stress in a slab for 8T single axle load:
                                </div>
                                <div className={styles.outputValues}>
                                    {results.cornerTensileStress8T}
                                </div>
                            </div>
                        </Grid>
                        <Grid className={styles.grids} size={{xs:12, md:6}}>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>
                                    Corner Tensile Bending stress in a slab for 16T Tandom axle load:
                                </div>
                                <div className={styles.outputValues}>
                                    {results.cornerTensileStress16T}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </div>
        </div>
    );
};

export default Section7;