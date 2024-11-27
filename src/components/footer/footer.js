import React from 'react';
import styles from './footer.module.css';

import Logo from '../../assets/images/IITKGPw.svg'

const Footer=()=>{
    return (
        <footer className={styles.footer}>
            <div className={styles.institute}>
                <div className={styles.logo}>
                    <img src={Logo} alt="Logo"/>
                </div>
                <div 
                    className={styles.dept}
                    onClick={() => window.open('https://www.iitkgp.ac.in/department/CE', '_blank')}
                    style={{ cursor: 'pointer' }}
                >Department of Civil Engineering</div>
                <div className={styles.kgp}>Indian Institute of Technology, Kharagpur</div>
            </div>
            <div className={styles.details}>
                <div className={styles.rollno}>21CE10022</div>
                <div className={styles.name}>Enjeti Sudhikar Reddy</div>
                <div className={styles.mail}>sudhikarreddy24@gmail.com</div>
            </div>
        </footer>
    );
};

export default Footer;