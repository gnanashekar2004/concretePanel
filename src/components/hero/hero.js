import React from 'react';

import styles from './hero.module.css';
import background from '../../assets/images/background1.png'

const Hero = () =>{
    return(
        <div className={styles.hero}>
            <img className={styles.images} src={background} alt="report analysis background"/>
            <div className={styles.overlay}>
                <p className={styles.heading}>Concrete Thickness Evaluation for Rigid Pavements</p>
                <p className={styles.desc}>This website evaluates the safety of the assumed concrete thickness using the appropriate design procedure, including Short Slab Concrete Pavement (SSCP), Jointed Plain Concrete Pavement (JPCP), or Thin White Topping (TWT), ensuring reliable and efficient pavement performance.</p>
            </div>
        </div>
    );
};

export default Hero;