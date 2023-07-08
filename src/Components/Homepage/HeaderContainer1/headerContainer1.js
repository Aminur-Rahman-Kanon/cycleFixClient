import React, { useEffect } from 'react';
import styles from './headerContainer1.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';


function HeaderContainer1 ({ aboutUsRef }) {

    useEffect(() => {
        Aos.init({duration: 1000, once: true});
    }, [])

    return (
        <div className={styles.headerContainer2}>
            <div className={styles.headerContainer2Bg}>

            </div>

            <div className={styles.headerContainer2Banner}>
                <div data-aos="zoom-in" className={styles.headerContainer2Part2}>
                    <h2 className={styles.headerContainer2H2}>Bicycle Workshop</h2>
                    <h3 className={styles.headerContainer2H3}>Servicing & Repair</h3>
                    <p className={styles.headerContainer2P}>Are you in need of urgent bike repairs in the London area? If so, then you should choose Cycle Fix for your local bicycle repair shop.
                    At Cycle Fix we aim to service and repair your bike quickly so you can get right back to cycling. “Walk in, ride out” is the motto of our bike repair shop. We will do all we can to ensure your bike returns to you in perfect working order.
                    No matter how complex the repair job, our passionate team have the engineering know-how to find the best solution. We are proud of our service to the community as your local bike shop.
                    Here at Cycle Fix we aim to provide an on-the-spot repair wherever possible. Our motto is “walk in, ride out” and we go out of our way to provide a solution to get you back on your bike. We service all types of bikes and we also pride ourselves in engineering solutions for your complex bike repair problems.
                    </p>
                    <button className={styles.learnMore} onClick={() => aboutUsRef.current.scrollIntoView(true)}>Learn more</button>
                </div>
            </div>
        </div>
    )
}

export default HeaderContainer1;

