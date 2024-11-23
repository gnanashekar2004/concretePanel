import React, { useState, useEffect } from 'react';
import styles from './page2.module.css';

import Section6 from '../../components/section/section6';
import Section7 from '../../components/section/section7';
import Section8 from '../../components/section/section8';
import SafeBox from '../../components/safeBox/safeBox';

const Page2 = () => {
    const [safeStatus, setSafeStatus] = useState(null);
    const [signal, setSignal] = useState(false);
    const [section6Inputs,setSection6Inputs] = useState(null);
    const [section6Results, setSection6Results] = useState(null);
    const [section7Inputs, setSection7Inputs] = useState(null);
    const [section7Results, setSection7Results] = useState(null);
    const [section8Inputs, setSection8Inputs] = useState(null);
    const [section8Results,setSection8Results] = useState(null);

    const handleSection6Submit = (inputs) => {
        setSection6Inputs(inputs);

        const cumulativeRepetitions = 365 * parseFloat(inputs.commericalTraffic) * (
            ((((1 + parseFloat(inputs.trafficGrowthRate))**(parseFloat(inputs.designPeriod)))-1) / parseFloat(inputs.trafficGrowthRate) )
        );
        const designTraffic = 0.25 * cumulativeRepetitions;

        setSection6Results({
            cumulativeRepetitions: parseFloat(cumulativeRepetitions.toFixed(4)),
            designTraffic: parseFloat(designTraffic.toFixed(4)),
        });
    };

    const handleSection7Submit = (inputs) => {
        setSection7Inputs(inputs);

        const ip1=parseFloat(inputs.modulusOfRupture);
        const ip2=parseFloat(inputs.loadSafetyFactor);
        const ip3=parseFloat(inputs.trailThickness);
        const ip4=parseFloat(inputs.elasticModulus);
        const ip5=parseFloat(inputs.poissonRatio);
        const ip6=parseFloat(inputs.effModulus);
        const ip7=parseFloat(inputs.coeffThermalExpansion);
        const ip8=parseFloat(inputs.lengthOfSquareSlab);

        const negTempDiff = -0.15*ip3;
        const radiusOfRelativeStiffness = (
            ((ip4*(ip3**3))/(12*(1-(ip5)**2)*(ip6)))**0.25
        );
        const curlingTensileStress = 1.933-241000*(ip7*negTempDiff)+1.267*(ip8/radiusOfRelativeStiffness);
        const cornerTensileStress8T = 10**(3.6525 - (0.465*Math.log10(ip6)) + (0.686*Math.log10(ip8/radiusOfRelativeStiffness)) - (1.291*Math.log10(radiusOfRelativeStiffness)));
        const cornerTensileStress16T = 10**(3.249 - (0.559*Math.log10(ip6)) + (1.395*Math.log10(ip8/radiusOfRelativeStiffness)) - (0.963*Math.log10(radiusOfRelativeStiffness)) - (0.088*(ip8/radiusOfRelativeStiffness)));

        setSection7Results({
            negTempDiff: parseFloat(negTempDiff.toFixed(4)),
            radiusOfRelativeStiffness: parseFloat(radiusOfRelativeStiffness.toFixed(4)),
            curlingTensileStress: parseFloat(curlingTensileStress.toFixed(4)),
            cornerTensileStress8T: parseFloat(cornerTensileStress8T.toFixed(4)),
            cornerTensileStress16T: parseFloat(cornerTensileStress16T.toFixed(4)),
        });
    };

    const calculateFL = (SR) => {
        if(SR<0.45){
            return Infinity;
        }else if(SR<0.55){
            return Math.pow((4.2577 / (SR-0.4325)),3.268);
        }else{
            return Math.pow(10,(0.9718-SR)/0.0828);
        }
    };

    const calculateFLC = (FL,ER) => {
        if(!FL || FL===Infinity || FL===0){
            return 0;
        }

        return parseFloat(ER)/parseFloat(FL);
    }

    const handleSection8Submit = (inputs) => {
        setSection8Inputs(inputs);
        console.log("Design Traffic:",section6Results.designTraffic);
        const ER = inputs.map(row => ({
            singleAL: parseFloat(row.singleMLG),
            singleER: (parseFloat(row.singleFreq)/100)*parseFloat(section6Results.designTraffic)*0.15,
            tandemAL: parseFloat(row.tandemMLG),
            tandemER: (parseFloat(row.tandemFreq)/100)*parseFloat(section6Results.designTraffic)*0.15
        }));
        const SAL = inputs.map(row => {
            const AL = parseFloat(row.singleMLG);
            const LS = (AL/8) * section7Results.cornerTensileStress8T;
            const SR = LS/section7Inputs.modulusOfRupture;
            const ER = (parseFloat(row.singleFreq)/100)*parseFloat(section6Results.designTraffic)*0.15;
            const FL = calculateFL(parseFloat(SR));

            return{
                AL: AL,
                LS: LS,
                SR: SR,
                ER: ER,
                FL: FL,
                FLC: calculateFLC(FL,ER)
            }
        });
        const TAL = inputs.map(row => {
            const AL = parseFloat(row.tandemMLG);
            const LS = (AL/8) * section7Results.cornerTensileStress16T;
            const SR = LS/section7Inputs.modulusOfRupture;
            const ER = (parseFloat(row.tandemFreq)/100)*parseFloat(section6Results.designTraffic)*0.15;
            const FL = calculateFL(parseFloat(SR));

            return{
                AL: AL,
                LS: LS,
                SR: SR,
                ER: ER,
                FL: FL,
                FLC: calculateFLC(FL,ER)
            }
        });

        setSection8Results({
            ER,
            SAL,
            TAL
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSignal(true);

        const randomStatus = Math.floor(Math.random() * 2);
        setSafeStatus(randomStatus === 1 ? 'Safe' : 'Unsafe');
    };

    useEffect(() => {
        if (signal && section6Results && section7Results && section8Inputs) {
            handleSection8Submit(section8Inputs);
        }
    }, [signal, section6Results, section7Results, section8Inputs]);

    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Section6 
                    signal={signal}
                    onSubmit={handleSection6Submit}
                    results={section6Results}    
                />
                <Section7 
                    signal={signal}
                    onSubmit={handleSection7Submit}
                    results={section7Results}
                />
                <Section8 
                    signal={signal}
                    onSubmit={setSection8Inputs}
                    results={section8Results}
                />
                <div className={styles.submit}>
                    <button>SUBMIT</button>
                </div>

                {safeStatus && <SafeBox status={safeStatus} />}
            </form>
        </div>
    );
};

export default Page2;