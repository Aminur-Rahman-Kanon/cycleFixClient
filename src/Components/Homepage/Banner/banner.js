import React, { useEffect } from 'react';
import styles from './banner.module.css';
import shimano from '../../../Assets/shimano.png';
import sram from '../../../Assets/sram.png';
import trek from '../../../Assets/trek.png';
import specialized from '../../../Assets/specialized.png';
import banner from '../../../Assets/test5.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Banner () {

    useEffect(() => {
        Aos.init({duration: 1000, once: true});
    }, [])

    return (
        <div className={styles.headerContainer}>
            <div className={styles.bgImage}>

            </div>
            <div className={styles.headerContainerBanner}>
                <div data-aos="fade-left" className={styles.headerContainer1Items}>
                    <h1 className={styles.headerContainer1H1}>Your Reliable Local Bicycle <span style={{color: '#a6cefb'}}>Repair Shop</span></h1>
                    <p className={styles.headerIntro1P}>No matter how complex the repair job, our passionate team have the engineering know-how to find the best solution. We are proud of our service to the community as your local bike shop.</p>
                    <div className={styles.headerContainer1Links}>
                        <Link to="/book-service/booking" className={styles.headerContainer1Link}>
                            <p className={styles.linkP}>Book Now</p>
                            <FontAwesomeIcon icon={faScrewdriverWrench} className={styles.linkIcon}/>
                        </Link>
                        <Link to="/workshop-price-list/services" className={styles.headerContainer1Link}>Services</Link>
                    </div>
                </div>

                <div data-aos="fade-right" className={styles.headerContainer1Items}>
                    <img src={banner} alt="cycle fix banner" className={styles.headerContainer1Banner}/>
                </div>
            </div>
            <div className={styles.brandsMain}>
                <div className={styles.brandContainer}>
                    <img src={trek} alt="trek" className={styles.brand}/>
                </div>
                <div className={styles.brandContainer}>
                    <img src={specialized} alt="specialized" className={styles.brand}/>
                </div>
                <div className={styles.brandContainer}>
                    <img src={shimano} alt="shimano" className={styles.brand}/>
                </div>
                <div className={styles.brandContainer}>
                    <img src={sram} alt="sram" className={styles.brand}/>
                </div>
            </div>
        </div>
    )
}

export default Banner;
