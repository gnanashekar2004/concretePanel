import React, { useState } from 'react';
import styles from './page2.module.css';

import Section6 from '../../components/section/section6';
import Section7 from '../../components/section/section7';
import Section8 from '../../components/section/section8';
import SafeBox from '../../components/safeBox/safeBox';

const Page2 = () => {
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
                <Section6/>
                <Section7/>
                <Section8/>
                <div className={styles.submit}>
                    <button>SUBMIT</button>
                </div>

                {safeStatus && <SafeBox status={safeStatus} />}
            </form>
        </div>
    );
};

export default Page2;