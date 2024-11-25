import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section10.module.css';
import { getValue } from '@testing-library/user-event/dist/utils';

const formFields = [
    { label: 'Design Period (years):', name: 'designPeriod' },
    { label: 'Total Two-way Commercial Traffic (cvpd) in the year of completion of construction:', name: 'totalTraffic' },
    { label: 'Av. Annual rate of growth of Commercial traffic (expressed as decimal):', name: 'growthRate' },
    { label: 'Average No of axles per Commercial vehicle (B):', name: 'avgAxles' },
    { label: 'Proportion of traffic in predominant direction (For 2-lane 2-way highways use a value of 1.0) (D):', name: 'trafficProportion' },
    { label: 'Lateral Placement factor (0.25 for 2-lane 2-way. For multilane highways the value is 0.25 x D) (E):', name: 'lateralPlacement' },
    { label: 'Factor for selection of traffic for BUC analysis (for six-hour period during day) (F):', name: 'bucFactor' },
    { label: 'Factor for selection of traffic for TDC analysis (for six-hour period during day) (G):', name: 'tdcFactor' },
    { label: 'Proportion of vehicles with spacing between front and the first rear axle less than the spacing of transverse joints (I):', name: 'axleSpacingProportion' },
    { label: 'Proportion of Front single (steering) Axles (K1):', name: 'frontAxlesProportion' },
    { label: 'Proportion of Rear single Axles (K2):', name: 'rearAxlesProportion' },
    { label: 'Proportion of tandem Axles (K3):', name: 'tandemAxlesProportion' },
    { label: 'Proportion of Tridem Axles (K4):', name: 'tridemAxlesProportion' },
];

const resultFields = [
    {label: 'Cummulative No of Commerical Vechiles during design period (two-way) (A):',name:'cumCommVehicles'},
    {label: 'Cummulative No of Commerical Axles during design period (two-way) (C=A*B):',name:'cumCommAxles'},
    {label: 'Design axle repetitions for BUC analysis (for 6 hours day time traffic) (H=B*E*F):',name:'axleRepetitionsBUC'},
    {label: 'Design axle repetitions for TDC analysis (for 6 hours day time traffic) (J=B*E*G*I):',name:'axleRepetitionsTDC'},
];

const Section10 = ({ signal, onSubmit, results }) => {
    const [inputs, setInputs] = useState(
        formFields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {})
    );

    const [warning, setWarning] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    // console.log(results);

    useEffect(() => {
        const { frontAxlesProportion, rearAxlesProportion, tandemAxlesProportion, tridemAxlesProportion } = inputs;
        if (
            frontAxlesProportion &&
            rearAxlesProportion &&
            tandemAxlesProportion &&
            tridemAxlesProportion
        ) {
            const sum =
                parseFloat(frontAxlesProportion) +
                parseFloat(rearAxlesProportion) +
                parseFloat(tandemAxlesProportion) +
                parseFloat(tridemAxlesProportion);
            setWarning(sum !== 1);
        } else {
            setWarning(false);
        }
    }, [
        inputs.frontAxlesProportion,
        inputs.rearAxlesProportion,
        inputs.tandemAxlesProportion,
        inputs.tridemAxlesProportion,
    ]);

    useEffect(() => {
        if(signal){
            onSubmit(inputs);
        }
    },[signal,inputs]);

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                Design Traffic Estimation
            </div>
            <div>
                <Grid container spacing={2} className={styles.gridContainer}>
                    {formFields.map((field, index) => (
                        <React.Fragment key={index}>
                            <Grid className={styles.grids} size={{ xs: 12, md: 4 }}>
                                <p className={styles.inputLabel}>{field.label}</p>
                            </Grid>
                            <Grid className={styles.gridsIP} size={{ xs: 12, md: 8 }}>
                                <input
                                    className={styles.inputs}
                                    name={field.name}
                                    value={inputs[field.name]}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </div>
            {warning && (
                <div className={styles.warning}>
                    The sum of K1, K2, K3, and K4 must equal 1.
                </div>
            )}

            <div className={`${!signal ? styles.hidden : ""}`}>
                {results && (
                    <Grid className={styles.gridContainer} container spacing={2}>
                        {resultFields.map((field,index)=>(
                            <React.Fragment key={index}>
                                <Grid className={styles.grids} size={{xs: 12, md:4}}>
                                    <div className={styles.inputLabel}>{field.label}</div>
                                </Grid>
                                <Grid className={styles.gridsIP} size={{xs:12, md:8}}>
                                    <div className={styles.outputValues}>{results[field.name]}</div>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                )}
                
            </div>
        </div>
    );
};

export default Section10;
