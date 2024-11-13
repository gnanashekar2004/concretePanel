import React, { useState } from 'react';
import styles from './page3.module.css';

import Section9 from '../../components/section/section9';
import Section10 from '../../components/section/section10';
import Section11 from '../../components/section/section11';
import Section12 from '../../components/section/section12';
import SafeBox from '../../components/safeBox/safeBox';

const Page3 = () => {
    // State to manage SafeBox visibility and status
    const [safeStatus, setSafeStatus] = useState(null);

    // Function to handle the submit click
    const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Generate a random 0 or 1
    const randomStatus = Math.floor(Math.random() * 2);
    
    // Update the safeStatus based on random value (1 for "safe", 0 for "unsafe")
    setSafeStatus(randomStatus === 1 ? 'Safe' : 'Unsafe');
    };
    return(
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Section9/>
                <Section10/>
                <Section11/>
                <Section12/>
                <div className={styles.submit}>
                    <button>SUBMIT</button>
                </div>

                {safeStatus && <SafeBox status={safeStatus} />}
            </form>
        </div>
    );
};

export default Page3;