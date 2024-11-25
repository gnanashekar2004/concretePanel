import React, { useState, useEffect } from 'react';
import styles from './page1.module.css';

import Section1 from '../../components/section/section1';
import Section2 from '../../components/section/section2';
import Section4 from '../../components/section/section4';
import Section5 from '../../components/section/section5';
import SafeBox from '../../components/safeBox/safeBox';

const Page1 = () => {
  const [safeStatus, setSafeStatus] = useState(null);
  const [signal,setSignal] = useState(false);
  const [section1Inputs,setSection1Inputs] = useState(null);
  const [section2Inputs,setSection2Inputs] = useState(null);
  const [section4Inputs,setSection4Inputs] = useState(null);
  const [section5Inputs,setSection5Inputs] = useState(null);
  const [section2Results,setSection2Results] = useState(null);
  const [section4Results,setSection4Results] = useState(null);
  const [section5Results,setSection5Results] = useState(null);

  const handleSection1Submit = (inputs) => {
    setSection1Inputs(inputs); // Store Section 1 inputs
  };
  
  const handleSection2Submit = (inputs) => {
    setSection2Inputs(inputs); // Store Section 2 inputs
  };
  
  const calculateSection2Results = () => {
    if (!section1Inputs || !section2Inputs) {
      console.error("Inputs for both Section 1 and Section 2 are required.");
      return;
    }
  
    const { carriageaway } = section1Inputs;
    const {
      trafficProportion,
      wanderDTP: DTP,
      wanderDTN: DTN,
      wanderDLP: DLP,
      wanderDLN: DLN,
      designPeriod,
      totalTraffic,
      growthRate,
      avgAxles,
      bucFactor,
      tdcFactor,
    } = section2Inputs;
  
    const parsedTrafficProportion = parseFloat(trafficProportion);
    const parsedDTP = parseFloat(DTP);
    const parsedDTN = parseFloat(DTN);
    const parsedDLP = parseFloat(DLP);
    const parsedDLN = parseFloat(DLN);
    const parsedDesignPeriod = parseFloat(designPeriod);
    const parsedTotalTraffic = parseFloat(totalTraffic);
    const parsedGrowthRate = parseFloat(growthRate);
    const parsedAvgAxles = parseFloat(avgAxles);
    const parsedBucFactor = parseFloat(bucFactor);
    const parsedTdcFactor = parseFloat(tdcFactor);
  
    const ETP = carriageaway === '2-Lane Undivided' ? parsedDTP : parsedDTP * parsedTrafficProportion;
    const ETN = carriageaway === '2-Lane Undivided' ? parsedDTN : parsedDTN * parsedTrafficProportion;
    const ELP = carriageaway === '2-Lane Undivided' ? parsedDLP : parsedDLP * parsedTrafficProportion;
    const ELN = carriageaway === '2-Lane Undivided' ? parsedDLN : parsedDLN * parsedTrafficProportion;
  
    const comV =
      365 *
      parsedTotalTraffic *
      (Math.pow(1 + parsedGrowthRate, parsedDesignPeriod) - 1) /
      parsedGrowthRate;
  
    const comA = comV * parsedAvgAxles;
    const TarBUC = comA * ETP * parsedBucFactor;
    const TarTDC = comA * ETN * parsedTdcFactor;
    const LarBUC = comA * ELP * parsedBucFactor;
    const LarTDC = comA * ELN * parsedTdcFactor;
  
    // Update the results state
    setSection2Results({
      lateralTP: ETP.toFixed(4),
      lateralTN: ETN.toFixed(4),
      lateralLP: ELP.toFixed(4),
      lateralLN: ELN.toFixed(4),
      cumCommVehicles: comV.toFixed(4),
      cumCommAxles: comA.toFixed(4),
      TaxleRepetitionsBUC: TarBUC.toFixed(4),
      TaxleRepetitionsTDC: TarTDC.toFixed(4),
      LaxleRepetitionsBUC: LarBUC.toFixed(4),
      LaxleRepetitionsTDC: LarTDC.toFixed(4),
    });
  };
  
  useEffect(() => {
    if (section1Inputs && section2Inputs) {
      calculateSection2Results(); 
    }
  }, [section1Inputs, section2Inputs]);
  

  const handleSection4Submit = (inputs) => {
    setSection4Inputs(inputs);
    
    const maxDayTemp = parseFloat(inputs.maxTemperatureDifferential);
    const elasticModulus = parseFloat(inputs.elasticModulus);
    const trailThickness = parseFloat(inputs.trialThickness);
    const effModulus = parseFloat(inputs.effectiveModulus);
    const poissonRatio = parseFloat(inputs.poissonRatio);

    // console.log(maxDayTemp," ",elasticModulus," ",trailThickness," ",effModulus," ",poissonRatio);

    const nightTemp = (maxDayTemp/2)+5;
    const radiusStiff = ((elasticModulus*Math.pow(trailThickness,3))/(12*(1-Math.pow(poissonRatio,2))*effModulus))**0.25;

    setSection4Results({
        nightTemp: nightTemp.toFixed(4),
        radiusStiff: radiusStiff.toFixed(4)
    });
  };

  const handleSection5Submit = (inputs) => {
    setSection5Inputs(inputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignal(true);

    const randomStatus = Math.floor(Math.random() * 2);
    setSafeStatus(randomStatus === 1 ? 'Safe' : 'Unsafe');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Section1 
          signal = {signal}
          onSubmit = {handleSection1Submit}
        />
        <Section2 
          signal = {signal}
          onSubmit = {handleSection2Submit}
          results = {section2Results}
        />
        <Section4 
          signal = {signal}
          onSubmit = {handleSection4Submit}
          results = {section4Results}
        />
        <Section5 
          signal = {signal}
          onSubmit = {handleSection5Submit}
          results = {section5Results}
        />
        <div className={styles.submit}>
          <button type="submit">SUBMIT</button>
        </div>
        
        {/* Only show SafeBox if safeStatus is not null */}
        {safeStatus && <SafeBox status={safeStatus} />}
      </form>
    </div>
  );
};

export default Page1;
