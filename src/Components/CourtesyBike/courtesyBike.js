import React, { useEffect, useRef } from "react";
import styles from './courtesyBike.module.css';
import DownArrow from "../Others/DownArrow/downArrow";
import { Helmet } from 'react-helmet-async';

const CourtesyBike = () => {
    
    const courtesyRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
        <Helmet>
            <title>Courtesy bike service</title>
            <meta name="description" content="courtesy bike"/>
            <link rel="canonical" href="/courtesy-bike"/>
        </Helmet>
        <div className={styles.courtesyBikeMain}>
            <div className={styles.courtesyBikeContainer}>
                <div className={styles.CourtesyBikeBg}>

                </div>

                <div className={styles.courtesyBikeDetails}>
                    <h2 style={{fontSize: '35px'}}>Free courtesy bike While we fix yours</h2>
                    <DownArrow clickHandler={() => courtesyRef.current.scrollIntoView(true)}
                                h3="Find out more"/>
                </div>
            </div>

            <div className={styles.courtesyBikeInformation} ref={courtesyRef}>
                <h1 className={styles.courtesyBikeInformationH1}>Courtesy Bike</h1>
                <p>Here at Cycle Fix London we understand how important your bike is to you. Many people in London use their bike as their number one form of transport and would feel stranded without it. That is why we offer a free courtesy bicycle whilst your bike is getting serviced by us.</p>
                <p>Our courtesy bikes are high quality hybrid Trek bikes which are both comfortable and easy to ride. All our bikes have a safety check after each use. Every bike comes complete with mudguards, pannier rack, puncture resistant tyres and anti theft security skewers. We make sure that the bike is the correct size frame and seat height for you and that you are confident on the bike before you ride away.</p>
                <p>As part of this service we do ask that you agree to sign a disclaimer form. This includes some simple rules such as wearing a helmet and using lights whilst on public roads. We also ask that you ride responsibly following the rules of the highway code. As part of the disclaimer we also outline that cycling is a dangerous sport. Cycle Fix London will not take any responsibility for any injury to either yourself or a third party while using the free courtesy bike.</p>
                <p>Whilst we have taken every measure to protect our bikes from theft using security skewers, the cost of any loss, theft or damage of the bike while in your possession will be liable to be paid by you, up to £400. Please make sure that you have a sold secure gold D-lock if you are going to lock the bike up in a public place. If you do not have a D-lock available we can also lend this to you for free however, you would be liable for costs up to £40.</p>
                <h3 className={styles.courtesyBikeInformationH3}>If you are interested in getting your bike serviced by one of our highly skilled and passionate mechanics please contact us <a href="/contact/query" className={styles.contact}>here</a>.</h3>
            </div>
        </div>
        </>
    )
}

export default CourtesyBike;
