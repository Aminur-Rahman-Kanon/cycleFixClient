import React, { useEffect, useRef, useState, useContext } from "react";
import styles from './xiaomi.module.css';
import xiaomiBg from '../../../Assets/xiaomi.png';
import { xiaomiRepairPrice } from '../../../Data/data';
import DownArrow from "../../Others/DownArrow/downArrow";
import Aos from 'aos';
import Spinner from "../../Others/Spinner/spinner";
import Modal from "../../Others/Modal/modal";
import { Helmet } from 'react-helmet-async';
import AuthContext from "../../Others/AuthContext/authContext";
import XiaomiBookingForm from "../XiaomiBookingForm/xiaomiBookingForm";

const Xiaomi = () => {

    const context = useContext(AuthContext);

    const priceRef = useRef(null);

    const [status, setStatus] = useState('');

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [displayForm, setDisplayForm] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});

    //scroll to the top
    //initializing aos object
    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: 2500, once: true });
    }, [])

    //displaying xiaomi price lists
    const displayList = xiaomiRepairPrice ? xiaomiRepairPrice.map(list => {
        return <div data-aos="fade-up" className={styles.listCard} key={list.repair}>
            <div className={styles.xiaomilistCardContainer}>
                <div className={styles.xiaomiLogoContainer}>
                    <img src={xiaomiBg} alt="xiaomi logo" className={styles.xiaomiImg}/>
                </div>
                <div className={styles.listCardDetails}>
                    <p className={styles.listHeader}>{list.repair}</p>
                    <p className={styles.priceP}>&pound;{list.price}</p>
                </div>
            </div>
            <button className={styles.bookNowBtn} onClick={() => {
                setSelectedCard({
                    service:list.repair, price: list.price
                });
                setDisplayForm(true);
            }}>Book now</button>
        </div>
    })
    : 
    <h4>No data</h4>

    //method to close modal
    const errorHandler = () => {
        setModal(false);
        context.setBackdrop(false);
        setStatus('');
    }

    //display status message handler
    let displayMsg = null;

    if (status === 'success'){
        displayMsg = <div className={styles.displayMsgMain}>
            <h2 className={styles.displayMsgH1}>Request Succesfull</h2>
            <p style={{textAlign: 'center'}}>A query has been has sent to the admin</p>
            <p style={{textAlign: 'center'}}>We will get back to ASAP to confirm your booking</p>
            <button className={styles.displayMsgBtn} onClick={() => window.location.reload()}>Ok</button>
        </div>
    }
    else if (status === 'error') {
        displayMsg = <div className={styles.displayMsgMain}>
            <h2 className={styles.displayMsgH1}>Request Failed</h2>
            <p style={{textAlign: 'center'}}>Couldn't submit query</p>
            <p style={{textAlign: 'center'}}>Please try again</p>
            <button className={styles.displayMsgBtn} onClick={ errorHandler }>Ok</button>
        </div>
    }

    return (
        <>
        <Helmet>
            <title>Xiaomi repair service</title>
            <meta name="description" content="Xiaomi repair"/>
            <link rel="canonical" href="/xiaomi-e-scooter"/>
        </Helmet>
        
        <Spinner spinner={spinner} />

        <Modal modal={modal}>
            {displayMsg}
        </Modal>

        <XiaomiBookingForm displayForm={displayForm}
                           toggleDisplayForm={setDisplayForm}
                           toggleBackdrop={context.setBackdrop}
                           toggleModal={setModal}
                           toggleSpinner={setSpinner}
                           selectedCard={selectedCard}
                           changeStatus={setStatus} />

        <div className={styles.xiaomiMain}>
            <div className={styles.xiaomiContainer}>
                <div className={styles.xiaomiBg}>
                    <img src={xiaomiBg} alt="xiaomi" className={styles.xiaomiBgImg}/>
                </div>
                <div className={styles.xiaomiDetails}>
                    <h2 style={{color: '#f6cd81'}}>We specialise in repairing the popular Xiaomi M365 electric scooters</h2>
                    <DownArrow clickHandler={() => priceRef.current.scrollIntoView(true)}
                    h3="Check the prices below"/>
                </div>

            </div>

            <div className={styles.repairListMain} ref={ priceRef }>
                <h2 className={styles.repairListMainH1}>Xiaomi Electric Scooter Repair Services</h2>
                <div className={styles.repairListContainer}>
                    {displayList}
                </div>
            </div>

            <div className={styles.xiaomiRepairContainer}>
                <h2 className={styles.xiaomiRepairH1}>Xiaomi Electric Scooter Repair Services</h2>
                <p className={styles.xiaomiRepairP}>Here you will find our price list for some of the more popular scooter repairs we offer at Cycle Fix London. Our prices include parts and labour however, we will only charge labour if you already have the replacement part required for the repair. Our hourly charge for labour is £50 per hour.</p>
                <p className={styles.xiaomiRepairP}>We have an extensive list of parts and accessories in stock for Xiaomi M365, Pro and Pro 2 electric scooter. Some accessories include: phone holders, child handlebars, bag hooks, storage bags, upgraded brakes, valve adapters and new grips. We can also supply parts for other brands of scooters too but these will be ordered in specially on a case by case basis.</p>
                <p className={styles.xiaomiRepairP}>We pride ourselves on having a can-do attitude towards electric scooter repairs and no job is too big or too small, check out some of our latest reviews. If you cannot see the price for the repair that you need, please don’t hesitate to contact us to see how we can help</p>
                <h4 className={styles.xiaomiRepairH4}>Please note we can only advise and fix problems on this scooter only.</h4>
                <p className={styles.xiaomiRepairP}>If your scooter does not have the MI on the floor platform it is not a genuine Xiaomi scooter.</p>
            </div>
        </div>
        </>
    )    
}

export default Xiaomi;
