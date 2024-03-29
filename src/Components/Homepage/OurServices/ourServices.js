import React, { useEffect } from "react";
import styles from './ourServices.module.css';
import accessories from '../../../Assets/accessories.png';
import scooter from '../../../Assets/scooter.png';
import professional from '../../../Assets/professional.png';
import pump from '../../../Assets/pump.png';
import walk from '../../../Assets/walk.png';
import courtesy from '../../../Assets/courtesy.png';
import Aos from "aos";
import 'aos/dist/aos.css';

const OurServices = () => {

    useEffect(() => {
        Aos.init({duration: 1000, once: true});
    }, [])
    
    return (
        <div className={styles.headerContainer3Main}>
            <div className={styles.headerContainer3ImgContainer}>

            </div>

            <div className={styles.headerContainer3Cards}>
                <div className={styles.headerContainer3Header}>
                    <h2 className={styles.headerContainer3Header3H2}>Our Services</h2>
                    <h2 className={styles.headerContainer3Header3H1}>Your Reliable Local Bicycle Repair Shop</h2>
                    <p className={styles.headerContainer3HeaderP}>Among the services we offer at our bicycle repair shop, foremost is our servicing and repair options. From a simple safety check to a complete rebuild, we will thoroughly assess your bike and let you know what we need to do.</p>
                </div>

                <div className={styles.headerContainer3Services}>
                    <div data-aos="fade-right" data-aos-delay="100" className={styles.headerContainer3Service}>
                        <img src={walk} alt="walk in ride out" className={styles.serviceIcon} />
                        <h2 className={styles.headerContainer3H2}>Walk in Ride out</h2>
                        <p className={styles.headerContainer3P}>Here at Cycle Fix we aim to provide an on-the-spot repair wherever possible. Our motto is “walk in, ride out” and we go out of our way to provide a solution to get you back on your bike. </p>
                    </div>

                    <div data-aos="fade-right" data-aos-delay="300" className={styles.headerContainer3Service}>
                        <img src={pump} alt="wide range of bike item" className={styles.serviceIcon}/>
                        <h2 className={styles.headerContainer3H2}>Wide range of stocks</h2>
                        <p className={styles.headerContainer3P}>We have a specialist custom spoke cutter and a new threading tool to repair your damaged cranks. This can save valuable time and hundreds of pounds for our customers.</p>
                    </div>

                    <div data-aos="fade-right" data-aos-delay="500" className={styles.headerContainer3Service}>
                        <img src={professional} alt="experienced bike mechanic" className={styles.serviceIcon}/>
                        <h2 className={styles.headerContainer3H2}>Experienced professional</h2>
                        <p className={styles.headerContainer3P}>knowledgeable team who are passionately committed to their work. We pride ourselves on our dedication to customer satisfaction</p>
                    </div>

                    <div data-aos="fade-right" data-aos-delay="700" className={styles.headerContainer3Service}>
                        <img src={accessories} alt="bike accessories" className={styles.serviceIcon}/>
                        <h2 className={styles.headerContainer3H2}>Accessories</h2>
                        <p className={styles.headerContainer3P}>Whether you’re a professional rider or casual biker. The unrivalled choice of bike accessories includes everything you need to make cycling more fun from some of the world's biggest brands.</p>
                    </div>

                    <div data-aos="fade-right" data-aos-delay="900" className={styles.headerContainer3Service}>
                        <img src={courtesy} alt="courtesy bike" className={styles.serviceIcon}/>
                        <h2 className={styles.headerContainer3H2}>Courtesy bike</h2>
                        <p className={styles.headerContainer3P}>Our courtesy bikes are high quality hybrid Trek bikes which are both comfortable and easy to ride. All our bikes have a safety check after each use.</p>
                    </div>

                    <div data-aos="fade-right" data-aos-delay="1000" className={styles.headerContainer3Service}>
                        <img src={scooter} alt="xiaomi e scooter" className={styles.serviceIcon}/>
                        <h2 className={styles.headerContainer3H2}>Xiaomi E-scooter</h2>
                        <p className={styles.headerContainer3P}>We specialise in repairing the popular Xiaomi M365 electric scooters</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurServices;
