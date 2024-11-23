import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section6.module.css';

const Section6 = ({ signal, onSubmit, results }) => {
    const [inputs, setInputs] = useState({
        designPeriod: '',
        trafficGrowthRate: '',
        commericalTraffic: '',
        gradeOfConcrete: '',
        cbr: '',
    });

    const handleChange = (e) => {
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
        <div>
            <Grid className={styles.gridContainer} container spacing={2}>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Design Period (years):</p>
                <input 
                    className={styles.inputs}
                    name="designPeriod"
                    value={inputs.designPeriod}
                    onChange={handleChange}
                />
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Traffic Growth Rate (r):</p>
                <input 
                    className={styles.inputs}
                    name="trafficGrowthRate"
                    value={inputs.trafficGrowthRate}
                    onChange={handleChange}
                />
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Commerical Traffic (cvpd):</p>
                <input 
                    className={styles.inputs}
                    name="commericalTraffic"
                    value={inputs.commericalTraffic}
                    onChange={handleChange}
                />
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Grade of Concrete:</p>
                <input 
                    className={styles.inputs}
                    name="gradeOfConcrete"
                    value={inputs.gradeOfConcrete}
                    onChange={handleChange}
                />
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>CBR (%):</p>
                <input 
                    className={styles.inputs}
                    name="cbr"
                    value={inputs.cbr}
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
                                Cumulative Repetations:
                            </div>
                            <div className={styles.outputValues}>
                                {results.cumulativeRepetitions}
                            </div>
                        </div>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:6}}>
                        <div className={styles.output}>
                            <div className={styles.outputLabel}>
                                Design Traffic:
                            </div>
                            <div className={styles.outputValues}>
                                {results.designTraffic}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            )}
        </div>
        </div>
    );
};

export default Section6;