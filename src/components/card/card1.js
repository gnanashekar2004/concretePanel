import React from 'react';
import styles from './card1.module.css'; // Ensure you have styles for centering

const Card1 = ({ onClick, label }) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <p className={styles.text}>{label}</p>
        </div>
    );
};

export default Card1;
