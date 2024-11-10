import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import Grid from '@mui/material/Grid2';

import Hero from '../../components/hero/hero';
import Card1 from '../../components/card/card1';
import Card2 from '../../components/card/card2';

const Home= () =>{
    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            <Hero/>
            <div>
                <Grid className={styles.gridContainer} container spacing={2}>
                    <Grid className={styles.grids} size={{xs:12, md:4}}>
                        <Card1 onClick={()=>navigate('/page1')} label="SSCP"/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:4}}>
                        <Card2 onClick={()=>navigate('/page2')} label="TWT"/>
                    </Grid>
                    <Grid className={styles.grids} size={{xs:12, md:4}}>
                        <Card1 onClick={()=>navigate('/page3')} label="JPCP"/>
                    </Grid>
                </Grid>
            </div>
                
        </div>
    );
};

export default Home;