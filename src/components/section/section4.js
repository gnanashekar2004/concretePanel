import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';

import styles from './section4.module.css';

const Section4 = ({ signal, onSubmit, results }) => {
  const [inputs, setInputs] = useState({
    modulusSubgrade: '',
    granularSubbaseThickness: '',
    dryLeanConcreteThickness: '',
    effectiveModulus: '',
    concreteUnitWeight: '',
    flexuralStrength: '',
    maxTemperatureDifferential: '',
    trialThickness: '',
    elasticModulus: '',
    poissonRatio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  // console.log(results);

  useEffect(() => {
    if (signal) {
      onSubmit(inputs);
    }
  }, [signal, inputs]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Pavement Structural Details</div>
      <div>
        <Grid className={styles.gridContainer} container spacing={2}>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Modulus of subgrade reaction of subgrade (MPa/m):
            </p>
            <input
              className={styles.inputs}
              name="modulusSubgrade"
              value={inputs.modulusSubgrade}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Thickness of Granular Subbase (mm):
            </p>
            <input
              className={styles.inputs}
              name="granularSubbaseThickness"
              value={inputs.granularSubbaseThickness}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Thickness of Dry Lean Concrete Subbase (mm):
            </p>
            <input
              className={styles.inputs}
              name="dryLeanConcreteThickness"
              value={inputs.dryLeanConcreteThickness}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Effective modulus of subgrade reaction of foundation (MPa/m):
            </p>
            <input
              className={styles.inputs}
              name="effectiveModulus"
              value={inputs.effectiveModulus}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Unit weight of Concrete (kN/m<sup>3</sup>):
            </p>
            <input
              className={styles.inputs}
              name="concreteUnitWeight"
              value={inputs.concreteUnitWeight}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              28-day Flexural strength of cement concrete (MPa):
            </p>
            <input
              className={styles.inputs}
              name="flexuralStrength"
              value={inputs.flexuralStrength}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Max. day-time Temperature Differential in slab (°C, for bottom-up cracking):
            </p>
            <input
              className={styles.inputs}
              name="maxTemperatureDifferential"
              value={inputs.maxTemperatureDifferential}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Trial Thickness of Concrete Slab (m):
            </p>
            <input
              className={styles.inputs}
              name="trialThickness"
              value={inputs.trialThickness}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Elastic Modulus of Concrete (MPa):
            </p>
            <input
              className={styles.inputs}
              name="elasticModulus"
              value={inputs.elasticModulus}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
            <p className={styles.inputLabel}>
              Poisson's Ratio of Concrete (Mu):
            </p>
            <input
              className={styles.inputs}
              name="poissonRatio"
              value={inputs.poissonRatio}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </div>
      <div className={`${!signal ? styles.hidden : ""}`}>
        {results && (
          <Grid className={styles.gridContainer} container spacing={2}>
            <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
              <div className={styles.output}>
                <div className={styles.outputLabel}>
                  Night-time Temperature Differential in slab (<sup>O</sup>C):
                </div>
                <div className={styles.outputValues}>
                  {results.nightTemp}
                </div>
              </div>
            </Grid>
            <Grid className={styles.grids} size={{ xs: 12, md: 6 }}>
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

export default Section4;
