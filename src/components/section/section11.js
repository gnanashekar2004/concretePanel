import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section11.module.css';

const Section11 = ({ signal, onSubmit, results }) => {
    const [inputs, setInputs] = useState({
        modulusSubgrade:'',
        thicknessGranular:'',
        thicknessDryLean:'',
        effModulusSubgrade:'',
        unitWeight:'',
        flexuralStrength:'',
        maxDayTemp:'',
        trailThickness:'',
        TDC:'',
        elasticModulus:'',
        poissonRatio:'',
    });

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]:value,
        }));
    };

    useEffect(() => {
        if(signal){
            onSubmit(inputs);
        }
    },[signal,inputs]);

    return(
        <div className={styles.container}>
            <div className={styles.heading}>
                Pavement Structural Details
            </div>
            <div>
                <Grid className={styles.gridContainer} container spacing={2}>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Modulus of subgrade reaction of subgrade (MPa/m):</p>
                        <input 
                            className={styles.inputs}
                            name="modulusSubgrade"
                            value={inputs.modulusSubgrade}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Thickness of Granular Subbase (mm):</p>
                        <input 
                            className={styles.inputs}
                            name="thicknessGranular"
                            value={inputs.thicknessGranular}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Thickness of Dry Lean Concrete Subbase (mm):</p>
                        <input 
                            className={styles.inputs}
                            name="thicknessDryLean"
                            value={inputs.thicknessDryLean}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Effective modulus of subgrade reaction of foundation (MPa/m):</p>
                        <input 
                            className={styles.inputs}
                            name="effModulusSubgrade"
                            value={inputs.effModulusSubgrade}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Unit weight if Concrete (kN/m<sup>3</sup>):</p>
                        <input 
                            className={styles.inputs}
                            name="unitWeight"
                            value={inputs.unitWeight}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>28-day Flexural strength of cement concrete (MPa):</p>
                        <input 
                            className={styles.inputs}
                            name="flexuralStrength"
                            value={inputs.flexuralStrength}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Max. day-time Temperature Differential in slab, 0<sup>o</sup>C (for bottom-up cracking):</p>
                        <input 
                            className={styles.inputs}
                            name="maxDayTemp"
                            value={inputs.maxDayTemp}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Trial Thickness of Concrete Slab (m):</p>
                        <input 
                            className={styles.inputs}
                            name="trailThickness"
                            value={inputs.trailThickness}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Load Transfer Efficiency Factor for TDC Analysis, Beta:</p>
                        <input 
                            className={styles.inputs}
                            name="TDC"
                            value={inputs.TDC}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Elastic Modulus of Concrete(MPa):</p>
                        <input 
                            className={styles.inputs}
                            name="elasticModulus"
                            value={inputs.elasticModulus}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <p className={styles.inputLabel}>Poisson's Ratio of Concrete (μ):</p>
                        <input 
                            className={styles.inputs}
                            name="poissonRatio"
                            value={inputs.poissonRatio}
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
                                    Night-time Temperature Differential in slab (<sup>O</sup>C):
                                </div>
                                <div className={styles.outputValues}>
                                    {results.nightTemp}
                                </div>
                            </div>
                        </Grid>
                        <Grid className={styles.grids} size={{xs:12, md:6}}>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>
                                    Radius of relative Stiffness (m):
                                </div>
                                <div className={styles.outputValues}>
                                    {results.radiusStiff}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </div>
        </div>
    );
};

export default Section11;
