import React, { useEffect } from "react";
import styles from './aboutContainer.module.css';
import cycleFix from '../../../Assets/cycleFix.jpg';
import Aos from "aos";
import 'aos/dist/aos.css';

const AboutContainer = ({ aboutUsRef }) => {

    useEffect(() => {
        Aos.init({duration: 1300, once: true});
    }, [])

    return (
        <div className={styles.aboutUsMain} ref={aboutUsRef}>
            <div className={styles.aboutUsContainer}>
                <div data-aos="fade-right" className={styles.aboutUsImgContainer}>
                    <img src={cycleFix} className={styles.aboutUsImg} alt="about cycle fix"/>
                </div>
                <div data-aos="fade-left" className={styles.aboutUsDetailsContainer}>
                    <h2 className={styles.aboutUsH}>About Cycle Fix</h2>
                    <p className={styles.aboutUsP}>Cycle Fix first opened in 2015 as a bicycle repair shop on the Old Kent Road. Founded by brothers Terry and Damian Purchase, this family-owned and managed local bike shop developed quickly.</p>
                    <p className={styles.aboutUsP}>By 2018 our business had grown well enough that we moved our bike repair shop to Kennington Road, at the site formally owned by Balfe’s Bikes. This move allowed us to develop even further, investing in a retail section for accessories, unique specialist bike repair tools, and five bike repair workshops with plenty of space to spare.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutContainer;
