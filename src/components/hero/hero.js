import React from 'react';

import styles from './hero.module.css';
import background from '../../assets/images/background1.png'

const Hero = () =>{
    return(
        <div className={styles.hero}>
            <img className={styles.images} src={background} alt="report analysis background"/>
            <div className={styles.overlay}>
                <p className={styles.heading}>Concrete Panel Safety</p>
                <p className={styles.desc}>A concrete panel safety check ensures that concrete panels used in construction are structurally sound, securely anchored, and able to bear expected loads without failure. This inspection assesses the panels for cracks, defects, and proper installation, while also confirming fire resistance and compliance with building standards. These checks are essential for preventing accidents and ensuring the durability and safety of the construction.</p>
            </div>
        </div>
    );
};

export default Hero;