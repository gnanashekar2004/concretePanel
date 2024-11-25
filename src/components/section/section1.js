import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import styles from './section1.module.css';

const Section1 = ({ signal, onSubmit }) => {
    const [inputs, setInputs] = useState({
        carriageaway: '2-Lane Undivided',
        slabSize: '1',
        laneWidth: '3.5',
        withConcreteShoulder: 'No'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    useEffect(() => {
      if(signal){
          onSubmit(inputs);
      }
    },[signal,inputs]);

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                Type of pavement considered
            </div>
            <div>
                <Grid className={styles.gridContainer} container spacing={2}>
                    <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
                        <p className={styles.inputLabel}>Carriageway:</p>
                        <select
                            className={styles.dropdown}
                            name="carriageaway"
                            value={inputs.carriageaway}
                            onChange={handleInputChange}
                        >
                            <option value="2-Lane Undivided">2-Lane Undivided</option>
                            <option value="4-Lane Divided">4-Lane Divided</option>
                            <option value="6-Lane Divided">6-Lane Divided</option>
                            <option value="8-Lane Divided">8-Lane Divided</option>
                            <option value="4-Lane Undivided">4-Lane Undivided</option>
                            <option value="6-Lane Undivided">6-Lane Undivided</option>
                            <option value="8-Lane Undivided">8-Lane Undivided</option>
                        </select>
                    </Grid>
                    <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
                        <p className={styles.inputLabel}>Slab Size:</p>
                        <select
                            className={styles.dropdown}
                            name="slabSize"
                            value={inputs.slabSize}
                            onChange={handleInputChange}
                        >
                            <option value="1">1 x 1</option>
                            <option value="1.25">1.25 x 1.25</option>
                            <option value="1.5">1.5 x 1.5</option>
                            <option value="1.75">1.75 x 1.75</option>
                            <option value="2">2 x 2</option>
                        </select>
                    </Grid>
                    <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
                        <p className={styles.inputLabel}>Lane Width (m):</p>
                        <select
                            className={styles.dropdown}
                            name="laneWidth"
                            value={inputs.laneWidth}
                            onChange={handleInputChange}
                        >
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
                    <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
                        <p className={styles.inputLabel}>With Concrete Shoulder:</p>
                        <select
                            className={styles.dropdown}
                            name="withConcreteShoulder"
                            value={inputs.withConcreteShoulder}
                            onChange={handleInputChange}
                        >
                            <option value="No">NO</option>
                            <option value="Yes">YES</option>
                        </select>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Section1;
