import React, { useState } from 'react';
import styles from './page1.module.css';

import Section1 from '../../components/section/section1';
import Section2 from '../../components/section/section2';
// import Section3 from '../../components/section/section3';
import Section4 from '../../components/section/section4';
import Section5 from '../../components/section/section5';
import SafeBox from '../../components/safeBox/safeBox';

const Page1 = () => {
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

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Section1 />
        <Section2 />
        <Section4 />
        <Section5 />
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
