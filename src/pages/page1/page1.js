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
  };

  const calculateColumnSums = (results) => {
    // Columns to sum
    const columns = ["singleFD", "tandemFD", "tridemFD"];
  
    // Initialize a total sum object for the columns
    const totalSums = {
      singleFD: 0,
      tandemFD: 0,
      tridemFD: 0,
    };
  
    // Iterate over each table in the results
    for (const tableKey in results) {
      const table = results[tableKey]; // Access each table (array of rows)
      table.forEach((row) => {
        // Add the values of the specified columns
        columns.forEach((col) => {
          totalSums[col] += parseFloat(row[col]); // Ensure values are numbers
        });
      });
    }
  
    return totalSums;
  };

  function calcuFSPTRSA(k,A,B,C,D,val) {
    if(k<100){
      return (1.1656 + 0.0038*A + 1.9519*B*val + 0.0029*A*B*val - 0.661*C - 0.8231*D);
    }else if(k>=100 && k<150){
      return (1.4612 + 0.0064*A + 1.8305*B*val + 0.0045*A*B*val - 0.7314*C - 0.8447*D);
    }else if(k>=150){
      return (1.7082 + 0.0111*A + 1.6754*val*B + 0.0068*A*B*val - 0.7862*C - 1.0714*D);
    }
  };

  function calcuFSPTRTA(k,A,B,C,D,val) {
    if(k<100){
      return (0.6966 + 0.0038*A + 0.8587*B*val + 0.0014*A*B*val - 0.4231*C - 0.9803*D);
    }else if(k>=100 && k<150){
      return (0.8047 + 0.0064*A + 0.8179*B*val + 0.0022*A*B*val - 0.4407*C - 1.0468*D);
    }else if(k>=150){
      return (0.8833 + 0.0112*A + 0.7623*B*val + 0.0034*A*B*val - 0.4531*C - 1.2445*D);
    }
  };

  function calcuFSPTRTR(k,A,B,C,D,val) {
    if(k<100){
      return (0.6966 + 0.0038*A + 0.5725*B*val + 0.0009*A*B*val - 0.4231*C - 0.9803*D);
    }else if(k>=100 && k<150){
      return (0.8047 + 0.0064*A + 0.5453*B*val + 0.0015*A*B*val - 0.4407*C - 1.0468*D);
    }else if(k>=150){
      return (0.8833 + 0.0112*A + 0.5082*B*val + 0.0023*A*B*val - 0.4531*C - 1.2445*D);
    }
  };

  function calcuFSNTRSA(k,A,B,C,D,val){
    if(k<100){
      return (0.18 + 0.0034*A + 1.1902*B*val + 0.0023*A*B*val + 0.1248*C + 2.0352*D);
    }else if(k>=100 && k<150){
      return (0.1982 + 0.0055*A + 1.0942*B*val + 0.0037*A*B*val + 0.214*C + 2.3753*D);
    }else if(k>=150){
      return (0.1618 + 0.0095*A + 0.9791*B*val + 0.0057*A*B*val + 0.3181*C + 2.6111*D);
    }
  };

  function calcuFSNTRTA(k,A,B,C,D,val){
    if(k<100){
      return (-0.8392 + 0.004*A + 0.7267*B*val + 0.0014*A*B*val + 0.5464*C + 0.6092*D);
    }else if(k>=100 && k<150){
      return (-1.0445 + 0.0065*A + 0.7233*B*val + 0.0022*A*B*val + 0.6773*C + 1.1264*D);
    }else if(k>=150){
      return (-1.1096 + 0.0113*A + 0.6998*B*val + 0.0034*A*B*val + 0.8063*C + 2.0525*D);
    }
  };

  function calcuFSNTRTR(k,A,B,C,D,val){
    if(k<100){
      return (-0.7533 + 0.004*A + 0.4852*B*val + 0.0009*A*B*val + 0.5191*C + 0.8102*D);
    }else if(k>=100 && k<150){
      return (-0.9831 + 0.0066*A + 0.4801*B*val + 0.0015*A*B*val + 0.6703*C + 1.3327*D);
    }else if(k>=150){
      return (-1.0893 + 0.0114*A + 0.4628*B*val + 0.0023*A*B*val + 0.8179*C + 2.2176*D);
    }
  };

  function calcuFSPLRSA(k,A,B,C,D,val){
    if(k<100){
      return (0.5304 + 0.0035*A + 1.331*B*val + 0.0029*A*B*val - 0.2363*C + 0.0826*D);
    }else if(k>=100 && k<150){
      return (0.6275 + 0.006*A + 1.2393*B*val + 0.0045*A*B*val - 0.2325*C + 0.0749*D);
    }else if(k>=150){
      return (0.6871 + 0.0107*A + 1.211*B*val + 0.0067*A*B*val - 0.2261*C - 0.0925*D);
    }
  };

  function calcuFSPLRTA(k,A,B,C,D,val){
    if(k<100){
      return (0.7386 + 0.0037*A + 0.7592*B*val + 0.0014*A*B*val - 0.2972*C + 0.6216*D);
    }else if(k>=100 && k<150){
      return (0.8973 + 0.0061*A + 0.6986*B*val + 0.0022*A*B*val - 0.2772*C + 0.8194*D);
    }else if(k>=150){
      return (1.0415 + 0.0107*A + 0.6224*B*val + 0.0034*A*B*val - 0.2618*C + 0.8249*D);
    }
  };

  function calcuFSPLRTR(k,A,B,C,D,val){
    if(k<100){
      return (0.7209 + 0.0037*A + 0.5073*B*val + 0.0009*A*B*val - 0.3025*C + 0.4686*D);
    }else if(k>=100 && k<150){
      return (0.9042 + 0.0062*A + 0.468*B*val + 0.0015*A*B*val - 0.2983*C + 0.6623*D);
    }else if(k>=150){
      return (1.0667 + 0.0107*A + 0.4178*B*val + 0.0023*A*B*val - 0.2908*C + 0.6833*D);
    }
  };

  function calcuFSNLRSA(k,A,B,C,D,val){
    if(k<100){
      return (0.5719 + 0.0041*A + 1.0307*B*val + 0.0028*A*B*val - 0.2387*C + 0.3526*D);
    }else if(k>=100 && k<150){
      return (0.7755 + 0.0066*A + 0.9344*B*val +0.0045*A*B*val - 0.2777*C + 0.3684*D);
    }else if(k>=150){
      return (0.9679 + 0.0113*A + 0.8099*B*val + 0.0068*A*B*val - 0.3179*C + 0.2219*D);
    }
  };

  function calcuFSNLRTA(k,A,B,C,D,val){
    if(k<100){
      return (1.0354 + 0.004*A + 0.667*B*val + 0.0014*A*B*val - 0.3871*C + 1.4088*D);
    }else if(k>=100 && k<150){
      return (1.3821 + 0.0067*A + 0.5911*B*val + 0.0022*A*B*val - 0.4225*C + 1.6572*D);
    }else if(k>=150){
      return (1.704 + 0.0114*A + 0.4987*B*val + 0.0034*A*B*val - 0.4597*C + 1.6134*D);
    }
  };

  function calcuFSNLRTR(k,A,B,C,D,val){
    if(k<100){
      return (1.0948 + 0.0038*A + 0.4559*B*val + 0.001*A*B*val - 0.4336*C + 1.2613*D);
    }else if(k>=100 && k<150){
      return (1.488 + 0.0065*A + 0.4043*B*val + 0.0015*A*B*val - 0.497*C + 1.4431*D);
    }else if(k>=150){
      return (1.8576 + 0.0113*A + 0.3411*B*val + 0.0023*A*B*val - 0.5508*C + 1.4116*D);
    }
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

    const k = parseFloat(section4Inputs.effectiveModulus);
    const A = parseFloat(section4Inputs.maxTemperatureDifferential);
    const B = parseFloat(section4Inputs.trialThickness)/(parseFloat(section4Inputs.effectiveModulus)*parseFloat(sr4.radiusStiff)**4);
    const C = Math.log10(parseFloat(section4Inputs.effectiveModulus));
    const D = Math.log10(parseFloat(sr4.radiusStiff));

    

    const TBUC = section5Inputs.map(row => {
      const H = parseFloat(sr2.TaxleRepetitionsBUC);
      const K2 = parseFloat(section2Inputs.rearAxlesProportion);
      const K3 = parseFloat(section2Inputs.tandemAxlesProportion);
      const K4 = parseFloat(section2Inputs.tridemAxlesProportion);
      const maxTemp = parseFloat(section4Inputs.maxTemperatureDifferential)
      const flexStrength = parseFloat(section4Inputs.flexuralStrength);
      const radiusSt = parseFloat(sr4.radiusStiff);

      const singleER = (parseFloat(row.singleFreq)/100)*H*K2;
      const singleFS = calcuFSPTRSA(k,A,B,C,D,parseFloat(row.singleMLG));
      const singleSR = singleFS/(flexStrength*1.1);
      const singleAR = calculateAR(singleSR);
      const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
      const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3*2;
      const tandemFS = calcuFSPTRTA(k,A,B,C,D,parseFloat(row.tandemMLG));
      const tandemSR = tandemFS/(flexStrength*1.1);
      const tandemAR = calculateAR(tandemSR);
      const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
      const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4*2;
      const tridemFS = calcuFSPTRTR(k,A,B,C,D,parseFloat(row.tridemMLG));
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
      const singleFS = calcuFSNTRSA(k,A,B,C,D,parseFloat(row.singleMLG));
      const singleSR = singleFS/(flexStrength*1.1);
      const singleAR = calculateAR(singleSR);
      const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
      const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3;
      const tandemFS = calcuFSNTRTA(k,A,B,C,D,parseFloat(row.tandemMLG));
      const tandemSR = tandemFS/(flexStrength*1.1);
      const tandemAR = calculateAR(tandemSR);
      const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
      const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4;
      const tridemFS = calcuFSNTRTR(k,A,B,C,D,parseFloat(row.tridemMLG));
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
      const singleFS = calcuFSPLRSA(k,A,B,C,D,parseFloat(row.singleMLG));
      const singleSR = singleFS/(flexStrength*1.1);
      const singleAR = calculateAR(singleSR);
      const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
      const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3;
      const tandemFS = calcuFSPLRTA(k,A,B,C,D,parseFloat(row.tandemMLG));
      const tandemSR = tandemFS/(flexStrength*1.1);
      const tandemAR = calculateAR(tandemSR);
      const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
      const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4;
      const tridemFS = calcuFSPLRTR(k,A,B,C,D,parseFloat(row.tridemMLG));
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
      const singleFS = calcuFSNLRSA(k,A,B,C,D,parseFloat(row.singleMLG));
      const singleSR = singleFS/(flexStrength*1.1);
      const singleAR = calculateAR(singleSR);
      const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
      const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3;
      const tandemFS = calcuFSNLRTA(k,A,B,C,D,parseFloat(row.tandemMLG));
      const tandemSR = tandemFS/(flexStrength*1.1);
      const tandemAR = calculateAR(tandemSR);
      const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
      const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4;
      const tridemFS = calcuFSNLRTR(k,A,B,C,D,parseFloat(row.tridemMLG));
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

    const sr5 = {
      TBUC: TBUC,
      TTDC: TTDC,
      LBUC: LBUC,
      LTDC: LTDC
    };

    const totalSum = calculateColumnSums(sr5);
    setSafeStatus(totalSum['singleFD'] + totalSum['tandemFD'] + totalSum['tridemFD'] < 1 ? 'Safe' : 'Unsafe');
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