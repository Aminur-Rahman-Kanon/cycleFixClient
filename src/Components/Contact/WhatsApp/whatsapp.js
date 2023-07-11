import React, { useEffect } from 'react';
import styles from './whatsapp.module.css';
import ReactWhatsapp from "react-whatsapp";
import whatsapp from '../../../Assets/whatsapp.jpg';
import whatsappBtn from '../../../Assets/whatsappBtn.png';
import Aos from 'aos';
import 'aos/dist/aos.css';

function WhatsApp () {

    //initializing AOS on componentOnMount
    useEffect(() => {
        Aos.init({ duration: 1500, once: true })
    }, []);

    return (
        <div className={styles.whatsappMain}>
            <div className={styles.whatsappImgContainer}>
                <img src={ whatsapp } className={styles.whatsappImg}/>
            </div>

            <div data-aos="zoom-in-down" className={styles.whatsappHeaderContainer}>
                <h2 className={styles.whatsappH1}>Want to connect with us in whatsapp</h2>
                <h3 className={styles.whatsappH2}>Lets chat</h3>
                <div className={styles.whatsappContainer}>
                    <ReactWhatsapp number="004402078200028" message="Hello Cycle fix..." className={styles.whatsapp}>
                        <img src={whatsappBtn} className={styles.whatsappBtn}/>
                    </ReactWhatsapp>
                </div>
            </div>
        </div>
    )
}

export default WhatsApp;
