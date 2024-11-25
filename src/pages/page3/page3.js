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

    const handleSection12Submit = (inputs) => {
        setSection12Inputs(inputs);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setSignal(true);

        const randomStatus = Math.floor(Math.random() * 2);
        setSafeStatus(randomStatus === 1 ? 'Safe' : 'Unsafe');
    };

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
                    onSubmit = {handleSection12Submit}
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