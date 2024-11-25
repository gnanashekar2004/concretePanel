import React, { useState,useEffect } from 'react';
import styles from './page3.module.css';

import Section9 from '../../components/section/section9';
import Section10 from '../../components/section/section10';
import Section11 from '../../components/section/section11';
import Section12 from '../../components/section/section12';
import SafeBox from '../../components/safeBox/safeBox';

const Page3 = () => {
    const [safeStatus, setSafeStatus] = useState(null);
    const [signal, setSignal] = useState(false);
    const [section9Inputs,setSection9Inputs] = useState(null);
    const [section10Inputs,setSection10Inputs] = useState(null);
    const [section11Inputs,setSection11Inputs] = useState(null);
    const [section12Inputs,setSection12Inputs] = useState(null);
    const [section10Results,setSection10Results] = useState(null);
    const [section11Results,setSection11Results] = useState(null);
    const [section12Results,setSection12Results] = useState(null);


    const handleSection9Submit = (inputs) => {
        setSection9Inputs(inputs);
    };

    const handleSection10Submit = (inputs) => {
        setSection10Inputs(inputs);

        const totalTraffic = parseFloat(inputs.totalTraffic);
        const growthRate = parseFloat(inputs.growthRate);
        const designPeriod = parseFloat(inputs.designPeriod);
        const avgAxles = parseFloat(inputs.avgAxles);
        const lateralPlacement = parseFloat(inputs.lateralPlacement);
        const bucFactor = parseFloat(inputs.bucFactor);
        const tdcFactor = parseFloat(inputs.tdcFactor);
        const axleSpacingProportion = parseFloat(inputs.axleSpacingProportion);

        const cumCommVehicles = 365*(totalTraffic)*((Math.pow((1+growthRate),(designPeriod))-1)/(growthRate));
        const cumCommAxles = cumCommVehicles*avgAxles;
        const axleRepetitionsBUC = cumCommAxles*lateralPlacement*bucFactor;
        const axleRepetitionsTDC = cumCommAxles*lateralPlacement*tdcFactor*axleSpacingProportion;

        setSection10Results({
            cumCommVehicles: cumCommVehicles.toFixed(4),
            cumCommAxles: cumCommAxles.toFixed(4),
            axleRepetitionsBUC: axleRepetitionsBUC.toFixed(4),
            axleRepetitionsTDC: axleRepetitionsTDC.toFixed(4)
        });
    };

    const handleSection11Submit = (inputs) => {
        setSection11Inputs(inputs);

        const maxDayTemp = parseFloat(inputs.maxDayTemp);
        const elasticModulus = parseFloat(inputs.elasticModulus);
        const trailThickness = parseFloat(inputs.trailThickness);
        const effModulus = parseFloat(inputs.effModulusSubgrade);
        const poissonRatio = parseFloat(inputs.poissonRatio);

        const nightTemp = (maxDayTemp/2)+5;
        const radiusStiff = ((elasticModulus*Math.pow(trailThickness,3))/(12*(1-Math.pow(poissonRatio,2))*effModulus))**(0.25);

        setSection11Results({
            nightTemp: nightTemp.toFixed(4),
            radiusStiff: radiusStiff.toFixed(4)
        });
    };

    function calculateFlexStress(MLG, maxTemp) {
    const tiedConcreteShoulders = section9Inputs.tiedConcreteShoulders;
    const effModSubgrade = parseFloat(section11Inputs.effModulusSubgrade);
    const unitWeight = parseFloat(section11Inputs.unitWeight);
    const trailThickness = parseFloat(section11Inputs.trailThickness);
    const radiusStiff = parseFloat(section11Results.radiusStiff);

    if (tiedConcreteShoulders === "yes") {
        if (effModSubgrade <= 80) {
            return (
                0.008 -
                (6.12 * unitWeight * trailThickness * trailThickness) / (effModSubgrade * radiusStiff * radiusStiff) +
                (2.36 * MLG * trailThickness) / (effModSubgrade * Math.pow(radiusStiff, 4)) +
                0.0266 * maxTemp
            );
            } else if (effModSubgrade > 80 && effModSubgrade <= 150) {
            return (
                0.08 -
                (9.69 * unitWeight * trailThickness * trailThickness) / (effModSubgrade * radiusStiff * radiusStiff) +
                (2.09 * MLG * trailThickness) / (effModSubgrade * Math.pow(radiusStiff, 4)) +
                0.0409 * maxTemp
            );
            } else {
            return (
                0.042 +
                (3.26 * unitWeight * trailThickness * trailThickness) / (effModSubgrade * radiusStiff * radiusStiff) +
                (1.62 * MLG * trailThickness) / (effModSubgrade * Math.pow(radiusStiff, 4)) +
                0.0522 * maxTemp
            );
            }
        } else {
            if (effModSubgrade <= 80) {
            return (
                -0.149 -
                (2.6 * unitWeight * trailThickness * trailThickness) / (effModSubgrade * radiusStiff * radiusStiff) +
                (3.13 * MLG * trailThickness) / (effModSubgrade * Math.pow(radiusStiff, 4)) +
                0.0297 * maxTemp
            );
            } else if (effModSubgrade > 80 && effModSubgrade <= 150) {
            return (
                -0.119 -
                (2.99 * unitWeight * trailThickness * trailThickness) / (effModSubgrade * radiusStiff * radiusStiff) +
                (2.78 * MLG * trailThickness) / (effModSubgrade * Math.pow(radiusStiff, 4)) +
                0.0456 * maxTemp
            );
            } else {
            return (
                -0.238 +
                (7.02 * unitWeight * trailThickness * trailThickness) / (effModSubgrade * radiusStiff * radiusStiff) +
                (2.41 * MLG * trailThickness) / (effModSubgrade * Math.pow(radiusStiff, 4)) +
                0.0585 * maxTemp
            );
            }
        }
    };

    function flexStressRSA(M){
        const A = ( parseFloat(section9Inputs.laneWidth) * parseFloat(section10Inputs.totalTraffic)**2)
                   / ((parseFloat(section9Inputs.transverseJointSpacing)*(parseFloat(section10Results.cumCommAxles))**2));

        const B = (parseFloat(M) * (parseFloat(section11Inputs.trailThickness))) / (parseFloat(section11Inputs.effModulusSubgrade)*parseFloat(section11Results.radiusStiff)**4);
        const C = parseFloat(section11Inputs.maxDayTemp);

        const effMod = parseFloat(section11Inputs.effModulusSubgrade);

        if(section9Inputs.tiedConcreteShoulders === "yes"){
            if(effMod <= 80){
                return (0.008 - 6.12*A + 2.36*B + 0.0266*C);
            }else if(effMod > 80 && effMod <= 150){
                return (0.08 - 9.69*A + 2.09*B + 0.0409*C);
            }else if(effMod > 150){
                return (0.042 + 3.26*A + 1.62*B + 0.0522*C);
            }
        }else{
            if(effMod <= 80){
                return (-0.149 - 2.60*A + 3.13*B + 0.0297*C);
            }else if(effMod > 80 && effMod <= 150){
                return (-0.119 - 2.99*A + 2.78*B + 0.0456*C);
            }else if(effMod > 150){
                return (-0.238 + 7.02*A + 2.41*B + 0.0585*C);
            }
        }
    };

    function flexStressRTA(N){
        const A = ( parseFloat(section9Inputs.laneWidth) * parseFloat(section10Inputs.totalTraffic)**2)
                   / ((parseFloat(section9Inputs.transverseJointSpacing)*(parseFloat(section10Results.cumCommAxles))**2));

        const B = (parseFloat(N) * (parseFloat(section11Inputs.trailThickness))) / (parseFloat(section11Inputs.effModulusSubgrade)*parseFloat(section11Results.radiusStiff)**4);
        const C = parseFloat(section11Inputs.maxDayTemp);

        const effMod = parseFloat(section11Inputs.effModulusSubgrade);

        if(section9Inputs.tiedConcreteShoulders === "yes"){
            if(effMod <= 80){
                return (-0.188 + 0.93*A + 1.025*B + 0.0207*C);
            }else if(effMod > 80 && effMod <= 150){
                return (-0.174 + 1.21*A + 0.87*B + 0.0364*C);
            }else if(effMod > 150){
                return (-0.210 + 3.88*A + 0.73*B + 0.0506*C);
            }
        }else{
            if(effMod <= 80){
                return (-0.223 + 2.73*A + 1.335*B + 0.0229*C);
            }else if(effMod > 80 && effMod <= 150){
                return (-0.276 + 5.78*A + 1.14*B + 0.0404*C);
            }else if(effMod > 150){
                return (-0.3 + 9.88*A + 0.965*B + 0.0543*C);
            }
        }
    };

    function flexStressTDC(val, n){
        const A = (parseFloat(section11Inputs.TDC)*parseFloat(section11Inputs.trailThickness)) / (parseFloat(section11Inputs.effModulusSubgrade)*parseFloat(section11Results.radiusStiff)**4);
        const B = (parseFloat(section11Inputs.trailThickness)**2) / (parseFloat(section11Inputs.effModulusSubgrade)*parseFloat(section11Results.radiusStiff)**4);
        const C = (parseFloat(section11Results.nightTemp));

        if(n === 0){
            return (-0.219 + 1.686*A*val + 168.48*B + 0.1089*C);
        }else if( n === 1){
            return (-0.219 + 1.686*(A/2)*val + 168.48*B + 0.1089*C);
        }else if(n === 2){
            return (-0.219 + 1.686*(A/3)*val + 168.48*B + 0.1089*C);
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
      
      const calculateColumnSums = (results) => {
        const columns = ["singleFD", "tandemFD", "tridemFD"];
        const totalSums = {
          singleFD: 0,
          tandemFD: 0,
          tridemFD: 0,
        };
      
        for (const tableKey in results) {
          const table = results[tableKey];
          table.forEach((row) => {
            columns.forEach((col) => {
              totalSums[col] += parseFloat(row[col]);
            });
          });
        }
      
        return totalSums;
      };

    const handleSection12Submit = (inputs) => {
        setSection12Inputs(inputs);

        const BUC = inputs.map(row => {
            const H = parseFloat(section10Results.axleRepetitionsBUC);
            const K2 = parseFloat(section10Inputs.rearAxlesProportion);
            const K3 = parseFloat(section10Inputs.tandemAxlesProportion);
            const K4 = parseFloat(section10Inputs.tridemAxlesProportion);
            const maxTemp = parseFloat(section11Inputs.maxDayTemp)
            const flexStrength = parseFloat(section11Inputs.flexuralStrength);

            const singleER = (parseFloat(row.singleFreq)/100)*H*K2;
            const singleFS = flexStressRSA(parseFloat(row.singleMLG));
            const singleSR = singleFS/(flexStrength*1.1);
            const singleAR = calculateAR(singleSR);
            const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
            const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3;
            const tandemFS = flexStressRTA(parseFloat(row.tandemMLG));
            const tandemSR = tandemFS/(flexStrength*1.1);
            const tandemAR = calculateAR(tandemSR);
            const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;

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
            }
            
        });

        const TDC = inputs.map(row => {
            const H = parseFloat(section10Results.axleRepetitionsTDC);
            const K2 = parseFloat(section10Inputs.rearAxlesProportion);
            const K3 = parseFloat(section10Inputs.tandemAxlesProportion);
            const K4 = parseFloat(section10Inputs.tridemAxlesProportion);
            const maxTemp = parseFloat(section11Results.nightTemp)
            const flexStrength = parseFloat(section11Inputs.flexuralStrength);

            const singleER = (parseFloat(row.singleFreq)/100)*H*K2;
            const singleFS = flexStressTDC(parseFloat(row.singleMLG),0);
            const singleSR = singleFS/(flexStrength*1.1);
            const singleAR = calculateAR(singleSR);
            const singleFD = singleAR === "infinite" ? 0 : singleER/singleAR;
            const tandemER = (parseFloat(row.tandemFreq)/100)*H*K3;
            const tandemFS = flexStressTDC(parseFloat(row.tandemMLG),1);
            const tandemSR = tandemFS/(flexStrength*1.1);
            const tandemAR = calculateAR(tandemSR);
            const tandemFD = tandemAR === "infinite" ? 0 : tandemER/tandemAR;
            const tridemER = (parseFloat(row.tridemFreq)/100)*H*K4;
            const tridemFS = flexStressTDC(parseFloat(row.tridemMLG),2);
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

        setSection12Results({
            BUC,
            TDC
        });

        const sr12 = {
            BUC: BUC,
            TDC: TDC
        };

        const totalSum = calculateColumnSums(sr12);
        setSafeStatus(totalSum['singleFD'] + totalSum['tandemFD'] + totalSum['tridemFD'] < 1 ? 'Safe' : 'Unsafe');

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSignal(true);
    };

    useEffect(() => {
        if (signal && section9Inputs && section10Results && section11Results) {
            handleSection12Submit(section12Inputs);
        }
    }, [signal, section9Inputs, section10Inputs, section11Inputs, section12Inputs]);


    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Section9
                    signal = {signal}
                    onSubmit = {handleSection9Submit}
                />
                <Section10
                    signal = {signal}
                    onSubmit = {handleSection10Submit}
                    results = {section10Results}
                />
                <Section11
                    signal = {signal}
                    onSubmit = {handleSection11Submit}
                    results = {section11Results}
                />
                <Section12
                    signal = {signal}
                    onSubmit = {setSection12Inputs}
                    results = {section12Results}
                />
                <div className={styles.submit}>
                    <button>SUBMIT</button>
                </div>

                {safeStatus && <SafeBox status={safeStatus} />}
            </form>
        </div>
    );
};

export default Page3;