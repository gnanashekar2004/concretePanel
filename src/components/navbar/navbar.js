import React from 'react';
import { NavLink,Link } from 'react-router-dom';

import styles from './navbar.module.css';

import Logo from '../../assets/images/IITKGPw.svg';

const Navbar = () => {
    return(
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Link to="/">
                    <img src={Logo} alt="Logo" className={styles.logo}/>
                </Link>
            </div>
            <div className={styles.links}>
                <NavLink to = "/" className={({isActive}) => isActive ? styles.active : undefined}>Home</NavLink>
                <NavLink to = "/page1" className={({isActive}) => isActive ? styles.active : undefined}>SSCP</NavLink>
                <NavLink to = "/page2" className={({isActive}) => isActive ? styles.active : undefined}>TWT</NavLink>
                <NavLink to = "/page3" className={({isActive}) => isActive ? styles.active : undefined}>JPCP</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;