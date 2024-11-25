import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section9.module.css';

const Section9 = ({ signal, onSubmit }) => {
    const [inputs, setInputs] = useState({
        carriageaway: 4,
        tiedConcreteShoulders: true,
        transverseJointSpacing: 4.5,
        laneWidth: 3.5,
        transverseDowelBars:true
    });

    useEffect(() => {
        if(signal){
            onSubmit(inputs);
        }
    },[signal,inputs]);

    return(
        <div className={styles.container}>
            <div className={styles.heading}>
        Type of pavement considered
      </div>
      <div>
        <Grid className={styles.gridContainer} container spacing={2}>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Carriageway:</p>
                <input type="text" className={styles.inputs} name="carriageway" value="4-Lane Divided" readOnly/>
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Tied Concrete Shoulders (Yes/No):</p>
                <select
                    className={styles.dropdown}
                    name="tiedConcreteShoulders"
                    value={inputs.tiedConcreteShoulders}
                    onChange={(e) =>
                        setInputs({
                            ...inputs,
                            tiedConcreteShoulders: e.target.value === "true",
                        })
                    }
                >
                <option value="true">YES</option>
                <option value="false">NO</option>
                </select>
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Transverse Joint Spacing (m):</p>
                <input type="text" className={styles.inputs} name="transverseJointSpacing" value="4.5" readOnly/>
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Lane Width (m):</p>
                <input type="text" className={styles.inputs} name="laneWidth" value="3.5" readOnly />
            </Grid>
            <Grid className={styles.grids} size={{xs:12, md:6}}>
                <p className={styles.inputLabel}>Transverse Joints have Dowel bars? (Yes/No):</p>
                <select
                    className={styles.dropdown}
                    name="transverseDowelBars"
                    value={inputs.transverseDowelBars}
                    onChange={(e) =>
                        setInputs({
                            ...inputs,
                            transverseDowelBars: e.target.value === "true",
                        })
                    }
                >
                <option value="true">YES</option>
                <option value="false">NO</option>
                </select>
            </Grid>
        </Grid>
      </div>
        </div>
    );
};

export default Section9;
