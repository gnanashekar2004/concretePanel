import React from 'react';
import styles from './page3.module.css';

import Section9 from '../../components/section/section9';
import Section10 from '../../components/section/section10';
import Section11 from '../../components/section/section11';
import Section12 from '../../components/section/section12';

const Page3 = () => {
    return(
        <div className={styles.container}>
            <form className={styles.form}>
                <Section9/>
                <Section10/>
                <Section11/>
                <Section12/>
                <div className={styles.submit}>
                    <button>SUBMIT</button>
                </div>
            </form>
        </div>
    );
};

export default Page3;