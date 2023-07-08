import React, { useEffect } from "react";
import styles from './aboutContainer.module.css';
import cycleFix from '../../../Assets/cycleFix.jpg';
import Aos from "aos";
import 'aos/dist/aos.css';

const AboutContainer = ({ aboutUsRef }) => {

    useEffect(() => {
        Aos.init({duration: 1000, once: true});
    }, [])

    return (
        <div className={styles.aboutUsMain} ref={aboutUsRef}>
            <div data-aos="zoom-in" className={styles.aboutUsContainer}>
                <img src={cycleFix} className={styles.aboutUsImg} alt="cycle fix"/>
                <div className={styles.aboutUsDetails}>
                    <h2 className={styles.aboutUsH}>About Cycle fix</h2>
                    <p className={styles.aboutUsP}>Cycle Fix first opened in 2015 as a bicycle repair shop on the Old Kent Road. Founded by brothers Terry and Damian Purchase, this family-owned and managed local bike shop developed quickly.</p>
                    <p className={styles.aboutUsP}>By 2018 our business had grown well enough that we moved our bike repair shop to Kennington Road, at the site formally owned by Balfe’s Bikes. This move allowed us to develop even further, investing in a retail section for accessories, unique specialist bike repair tools, and five bike repair workshops with plenty of space to spare.</p>
                    <p className={styles.aboutUsP}>Today we run the store with a small but knowledgeable team who are passionately committed to their work. We pride ourselves on our dedication to customer satisfaction: a service that is reflected in our positive customer reviews.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutContainer;
