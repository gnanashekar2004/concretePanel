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

  function calculateFlexStress(rs,MLG, maxTemp) {
    const effMod = parseFloat(section4Inputs.effectiveModulus);
    const thick = parseFloat(section4Inputs.trialThickness);
    const radius = parseFloat(rs);

    if (effMod > 20 && effMod < 100) {
      return (
        0.5304 +
        0.0035 * maxTemp +
        1.331 * (MLG * thick / (effMod * Math.pow(radius, 4))) +
        0.0029 * (MLG * thick / (effMod * Math.pow(radius, 4))) * maxTemp +
        -0.2363 * Math.log10(effMod) +
        -0.0826 * Math.log10(radius)
      );
    } else if (effMod >= 100 && effMod < 150) {
      return (
        0.6275 +
        0.006 * maxTemp +
        1.2393 * (MLG * thick / (effMod * Math.pow(radius, 4))) +
        0.0045 * (MLG * thick / (effMod * Math.pow(radius, 4))) * maxTemp +
        -0.2325 * Math.log10(effMod) +
        -0.0749 * Math.log10(radius)
      );
    } else if (effMod > 20 && effMod <= 300) {
      return (
        0.6871 +
        0.0107 * maxTemp +
        1.1211 * (MLG * thick / (effMod * Math.pow(radius, 4))) +
        0.0067 * (MLG * thick / (effMod * Math.pow(radius, 4))) * maxTemp +
        -0.2261 * Math.log10(effMod) +
        -0.0925 * Math.log10(radius)
      );
    } else {
      return "k eff value is out of Range";
    }
  };

  function calculateAR(SR) {
    if (SR < 0.45) {
      return "infinite";
    } else if (SR >= 0.45 && SR <= 0.55) {
      return (Math.pow(4.2577 / (SR - 0.4325), 3.268)).toFixed(4);
    } else {
      return (Math.pow(10, (0.9718 - SR) / 0.0828)).toFixed(4);
    }
  };   

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignal(true);

    const randomStatus = Math.floor(Math.random() * 2);
    setSafeStatus(randomStatus === 1 ? 'Safe' : 'Unsafe');
  };

 const handleSectionSubmit = () => {
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

    const sr2 =  {
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
    };

    const maxDayTemp = parseFloat(section4Inputs.maxTemperatureDifferential);
    const elasticModulus = parseFloat(section4Inputs.elasticModulus);
    const trailThickness = parseFloat(section4Inputs.trialThickness);
    const effModulus = parseFloat(section4Inputs.effectiveModulus);
    const poissonRatio = parseFloat(section4Inputs.poissonRatio);

    const nightTemp = (maxDayTemp/2)+5;
    const radiusStiff = ((elasticModulus*Math.pow(trailThickness,3))/(12*(1-Math.pow(poissonRatio,2))*effModulus))**0.25;

    setSection4Results({
        nightTemp: nightTemp.toFixed(4),
        radiusStiff: radiusStiff.toFixed(4)
    });

    const sr4 = {
      nightTemp: nightTemp.toFixed(4),
      radiusStiff: radiusStiff.toFixed(4)
    };

    const TBUC = section5Inputs.map(row => {
      const H = parseFloat(sr2.TaxleRepetitionsBUC);
      const K2 = parseFloat(section2Inputs.rearAxlesProportion);
      const K3 = parseFloat(section2Inputs.tandemAxlesProportion);
      const K4 = parseFloat(section2Inputs.tridemAxlesProportion);
      const maxTemp = parseFloat(section4Inputs.maxTemperatureDifferential)
      const flexStrength = parseFloat(section4Inputs.flexuralStrength);
      const radiusSt = parseFloat(sr4.radiusStiff);

      const singleER = (parseFloat(row.singleFreq)/100)*H*K2;
      const singleFS = calculateFlexStress(radiusSt,parseFloat(row.singleMLG),maxTemp);
      const singleSR = singleFS/(flexStrength*1.1);
      const singleAR = calculateAR(singleSR);
      const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
      const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3*2;
      const tandemFS = calculateFlexStress(radiusSt,parseFloat(row.tandemMLG),maxTemp);
      const tandemSR = tandemFS/(flexStrength*1.1);
      const tandemAR = calculateAR(tandemSR);
      const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
      const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4*2;
      const tridemFS = calculateFlexStress(radiusSt,parseFloat(row.tridemMLG),maxTemp);
      const tridemSR = tridemFS/(flexStrength*1.1);
      const tridemAR = calculateAR(tridemSR);
      const tridemFD = tridemAR === "infinite" ? 0 : tridemER/tridemAR;

      return{
          singleER: singleER.toFixed(4),
          singleFS: singleFS.toFixed(4),
          singleSR: singleSR.toFixed(4),
          singleAR: singleAR,
          singleFD: singleFD.toFixed(4),
          tandemER: tandemER.toFixed(4),
          tandemFS: tandemFS.toFixed(4),
          tandemSR: tandemSR.toFixed(4),
          tandemAR: tandemAR,
          tandemFD: tandemFD.toFixed(4),
          tridemER: tridemER.toFixed(4),
          tridemFS: tridemFS.toFixed(4),
          tridemSR: tridemSR.toFixed(4),
          tridemAR: tridemAR,
          tridemFD: tridemFD.toFixed(4),
      }
      
    });

    const TTDC = section5Inputs.map(row => {
      const H = parseFloat(sr2.TaxleRepetitionsTDC);
      const K2 = parseFloat(section2Inputs.rearAxlesProportion);
      const K3 = parseFloat(section2Inputs.tandemAxlesProportion);
      const K4 = parseFloat(section2Inputs.tridemAxlesProportion);
      const maxTemp = parseFloat(sr4.nightTemp);
      const flexStrength = parseFloat(section4Inputs.flexuralStrength);
      const radiusSt = parseFloat(sr4.radiusStiff);

      const singleER = (parseFloat(row.singleFreq)/100)*H*K2;
      const singleFS = calculateFlexStress(radiusSt,parseFloat(row.singleMLG),maxTemp);
      const singleSR = singleFS/(flexStrength*1.1);
      const singleAR = calculateAR(singleSR);
      const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
      const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3;
      const tandemFS = calculateFlexStress(radiusSt,parseFloat(row.tandemMLG),maxTemp);
      const tandemSR = tandemFS/(flexStrength*1.1);
      const tandemAR = calculateAR(tandemSR);
      const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
      const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4;
      const tridemFS = calculateFlexStress(radiusSt,parseFloat(row.tridemMLG),maxTemp);
      const tridemSR = tridemFS/(flexStrength*1.1);
      const tridemAR = calculateAR(tridemSR);
      const tridemFD = tridemAR === "infinite" ? 0 : tridemER/tridemAR;

      return{
          singleER: singleER.toFixed(4),
          singleFS: singleFS.toFixed(4),
          singleSR: singleSR.toFixed(4),
          singleAR: singleAR,
          singleFD: singleFD.toFixed(4),
          tandemER: tandemER.toFixed(4),
          tandemFS: tandemFS.toFixed(4),
          tandemSR: tandemSR.toFixed(4),
          tandemAR: tandemAR,
          tandemFD: tandemFD.toFixed(4),
          tridemER: tridemER.toFixed(4),
          tridemFS: tridemFS.toFixed(4),
          tridemSR: tridemSR.toFixed(4),
          tridemAR: tridemAR,
          tridemFD: tridemFD.toFixed(4),
      }
      
    });

    const LBUC = section5Inputs.map(row => {
      const H = parseFloat(sr2.LaxleRepetitionsBUC);
      const K2 = parseFloat(section2Inputs.rearAxlesProportion);
      const K3 = parseFloat(section2Inputs.tandemAxlesProportion);
      const K4 = parseFloat(section2Inputs.tridemAxlesProportion);
      const maxTemp = parseFloat(section4Inputs.maxTemperatureDifferential)
      const flexStrength = parseFloat(section4Inputs.flexuralStrength);
      const radiusSt = parseFloat(sr4.radiusStiff);

      const singleER = (parseFloat(row.singleFreq)/100)*H*K2;
      const singleFS = calculateFlexStress(radiusSt,parseFloat(row.singleMLG),maxTemp);
      const singleSR = singleFS/(flexStrength*1.1);
      const singleAR = calculateAR(singleSR);
      const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
      const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3;
      const tandemFS = calculateFlexStress(radiusSt,parseFloat(row.tandemMLG),maxTemp);
      const tandemSR = tandemFS/(flexStrength*1.1);
      const tandemAR = calculateAR(tandemSR);
      const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
      const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4;
      const tridemFS = calculateFlexStress(radiusSt,parseFloat(row.tridemMLG),maxTemp);
      const tridemSR = tridemFS/(flexStrength*1.1);
      const tridemAR = calculateAR(tridemSR);
      const tridemFD = tridemAR === "infinite" ? 0 : tridemER/tridemAR;

      return{
          singleER: singleER.toFixed(4),
          singleFS: singleFS.toFixed(4),
          singleSR: singleSR.toFixed(4),
          singleAR: singleAR,
          singleFD: singleFD.toFixed(4),
          tandemER: tandemER.toFixed(4),
          tandemFS: tandemFS.toFixed(4),
          tandemSR: tandemSR.toFixed(4),
          tandemAR: tandemAR,
          tandemFD: tandemFD.toFixed(4),
          tridemER: tridemER.toFixed(4),
          tridemFS: tridemFS.toFixed(4),
          tridemSR: tridemSR.toFixed(4),
          tridemAR: tridemAR,
          tridemFD: tridemFD.toFixed(4),
      }
      
    });

    const LTDC = section5Inputs.map(row => {
      const H = parseFloat(sr2.LaxleRepetitionsTDC);
      const K2 = parseFloat(section2Inputs.rearAxlesProportion);
      const K3 = parseFloat(section2Inputs.tandemAxlesProportion);
      const K4 = parseFloat(section2Inputs.tridemAxlesProportion);
      const maxTemp = parseFloat(sr4.nightTemp);
      const flexStrength = parseFloat(section4Inputs.flexuralStrength);
      const radiusSt = parseFloat(sr4.radiusStiff);

      const singleER = (parseFloat(row.singleFreq)/100)*H*K2;
      const singleFS = calculateFlexStress(radiusSt,parseFloat(row.singleMLG),maxTemp);
      const singleSR = singleFS/(flexStrength*1.1);
      const singleAR = calculateAR(singleSR);
      const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
      const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3;
      const tandemFS = calculateFlexStress(radiusSt,parseFloat(row.tandemMLG),maxTemp);
      const tandemSR = tandemFS/(flexStrength*1.1);
      const tandemAR = calculateAR(tandemSR);
      const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
      const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4;
      const tridemFS = calculateFlexStress(radiusSt,parseFloat(row.tridemMLG),maxTemp);
      const tridemSR = tridemFS/(flexStrength*1.1);
      const tridemAR = calculateAR(tridemSR);
      const tridemFD = tridemAR === "infinite" ? 0 : tridemER/tridemAR;

      return{
          singleER: singleER.toFixed(4),
          singleFS: singleFS.toFixed(4),
          singleSR: singleSR.toFixed(4),
          singleAR: singleAR,
          singleFD: singleFD.toFixed(4),
          tandemER: tandemER.toFixed(4),
          tandemFS: tandemFS.toFixed(4),
          tandemSR: tandemSR.toFixed(4),
          tandemAR: tandemAR,
          tandemFD: tandemFD.toFixed(4),
          tridemER: tridemER.toFixed(4),
          tridemFS: tridemFS.toFixed(4),
          tridemSR: tridemSR.toFixed(4),
          tridemAR: tridemAR,
          tridemFD: tridemFD.toFixed(4),
      }
      
    });

    setSection5Results({
      TBUC,
      TTDC,
      LBUC,
      LTDC
    });
  }; 

  useEffect(() => {
    if (signal && section1Inputs && section2Inputs && section4Inputs && section5Inputs) {
        handleSectionSubmit();
    }
}, [signal, section1Inputs, section2Inputs, section4Inputs, section5Inputs]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Section1 
          signal = {signal}
          onSubmit = {setSection1Inputs}
        />
        <Section2 
          signal = {signal}
          onSubmit = {setSection2Inputs}
          results = {section2Results}
        />
        <Section4 
          signal = {signal}
          onSubmit = {setSection4Inputs}
          results = {section4Results}
        />
        <Section5 
          signal = {signal}
          onSubmit = {setSection5Inputs}
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