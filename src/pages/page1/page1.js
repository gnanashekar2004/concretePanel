import React from 'react';

import styles from './page1.module.css';

import Section1 from '../../components/section/section1';
import Section2 from '../../components/section/section2';
// import Section3 from '../../components/section/section3';
import Section4 from '../../components/section/section4';
import Section5 from '../../components/section/section5';

const Page1= () => {
    return(
        <div className = {styles.container}>
            <form className={styles.form}>
                <Section1/>
                <Section2/>
                <Section4/>
                <Section5/>
                <div className={styles.submit}>
                    <button>SUBMIT</button>
                </div>
            </form>
        </div>
    );
};

export default Page1;