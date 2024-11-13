import React from 'react';
import styles from './page2.module.css';

import Section6 from '../../components/section/section6';
import Section7 from '../../components/section/section7';
import Section8 from '../../components/section/section8';

const Page2 = () => {
    return(
        <div className={styles.container}>
            <Section6/>
            <Section7/>
            <Section8/>
            <div className={styles.submit}>
                <button>SUBMIT</button>
            </div>
        </div>
    );
};

export default Page2;