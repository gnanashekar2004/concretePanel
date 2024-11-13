import React from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section10.module.css';

const formFields = [
    { label: 'Design Period (years):'},
    { label: 'Total Two-way Commercial Traffic (cvpd) in the year of completion of construction:' },
    { label: 'Av. Annual rate of growth of Commercial traffic (expressed as decimal):' },
    { label: 'Average No of axles per Commercial vehicle (B):' },
    { label: 'Proportion of traffic in predominant direction (For 2-lane 2-way highways use a value of 1.0) (C):' },
    { label: 'Lateral Placement factor (0.25 fpr 2-lane 2-way. For multilane highways the value is 0.25 x D) (E):' },
    { label: 'Factor for selection of traffic for BUC analysis (for six-hour period during day) (F):' },
    { label: 'Factor for selection of traffic for TDC analysis (for six-hour period during day) (G):' },
    { label: 'Proportion of vehicles with spacing between front and the first rear axle less than the spacing of transverse joints (I):' },
    { label: 'Proportion of Front single (steering) Axles (K1):' },
    { label: 'Proportion of Rear single Axles (K2):' },
    { label: 'Proportion of tandem Axles (K3):' },
    { label: 'Proportion of Tridem Axles (K4):' },
  ];

const Section10 = () => {
    return(
        <div className={styles.container}>
            <div className={styles.heading}>
                Design Traffic Estimation
            </div>
            <div>
                <Grid container spacing={2} className={styles.gridContainer}>
                {formFields.map((field, index) => (
                    <React.Fragment key={index}>
                    <Grid className={styles.grids} size={{xs:12, md:4}}>
                        <p className={styles.inputLabel}>{field.label}</p>
                    </Grid>
                    <Grid className={styles.gridsIP} size={{xs:12, md:8}}>
                        <input className={styles.inputs}/>
                    </Grid>
                    </React.Fragment>
                ))}
                </Grid>
            </div>
        </div>
    );
};

export default Section10;
