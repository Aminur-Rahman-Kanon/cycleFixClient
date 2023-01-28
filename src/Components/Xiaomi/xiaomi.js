import React, { useEffect, useRef, useState } from "react";
import styles from './xiaomi.module.css';
import { Link } from 'react-router-dom';
import xiaomiBg from '../../Assets/xiaomi.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoundSign } from '@fortawesome/free-solid-svg-icons';
import { xiaomiRepairPrice } from '../../Data/data';
import DownArrow from "../Others/DownArrow/downArrow";
import Aos from 'aos';
import Spinner from "../Others/Spinner/spinner";
import Backdrop from "../Backdrop/backdrop";
import Modal from "../Others/Modal/modal";

const Xiaomi = () => {

    const priceRef = useRef(null);

    const [status, setStatus] = useState('');

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setbackdrop] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: 2500, once: true });
    }, [])

    useEffect(() => {
        if (backdrop){
            document.body.style.position = 'sticky';
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.position = 'unset';
            document.body.style.overflow = 'auto';
        }
    }, [backdrop])

    const displayList = xiaomiRepairPrice ? xiaomiRepairPrice.map(list => {
        return <div data-aos = "flip-left" className={styles.listCard}>
            {/* <FontAwesomeIcon  icon={faScrewdriverWrench} className={styles.listIcon}/> */}
            <div className={styles.xiaomiLogoContainer}>
                <img src={xiaomiBg} className={styles.xiaomiImg}/>
            </div>
            <div className={styles.listCardDetails}>
                <p className={styles.listH3}>{list.repair}</p>
                <div className={styles.priceContainer}>
                    <FontAwesomeIcon icon={faPoundSign} className={styles.poundSign}/>
                    <p className={styles.priceP}>{list.price}</p>
                </div>
            </div>
            <button className={styles.bookNowBtn} onClick={() => bookService(list.repair, list.price)}>Book now</button>
        </div>
    })
    : 
    null

    const bookService = async (service, price) => {
        console.log(service, price);
        setSpinner(true);
        await fetch('https://cyclefixserver.onrender.com/book-xiaomi-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service, price
            })
        }).then(res => res.json()).then(data => {
            setSpinner(false);
            setStatus(data.status);
            setModal(true);
            setbackdrop(true);
        }).catch(err => {
            setSpinner(false);
            setStatus('error');
            setModal(true);
            setbackdrop(true);
        })
    }

    const errorHandler = () => {
        setModal(false);
        setbackdrop(false);
        setStatus('');
    }

    let displayMsg = null;

    if (status === 'success'){
        displayMsg = <div className={styles.displayMsgMain}>
            <h1 className={styles.displayMsgH1}>Request Succesfull</h1>
            <p style={{textAlign: 'center'}}>A query has been has sent to the admin</p>
            <p style={{textAlign: 'center'}}>We will get back to ASAP to confirm your booking</p>
            <button className={styles.displayMsgBtn} onClick={() => window.location.reload()}>Ok</button>
        </div>
    }
    else if (status === 'error') {
        displayMsg = <div className={styles.displayMsgMain}>
            <h1 className={styles.displayMsgH1}>Request Failed</h1>
            <p style={{textAlign: 'center'}}>Couldn't submit query</p>
            <p style={{textAlign: 'center'}}>Please try again</p>
            <button className={styles.displayMsgBtn} onClick={ errorHandler }>Ok</button>
        </div>
    }


    return (
        <>
        <Backdrop backdrop={backdrop} toggleBackdrop={() => {/*does nothing */}}/>
        <Modal switch={modal}>
            {displayMsg}
        </Modal>
        <div className={styles.xiaomiMain}>
            <div className={styles.xiaomiContainer}>
                <div className={styles.xiaomiBg}>
                    <img src={xiaomiBg} alt="xiaomi" className={styles.xiaomiBgImg}/>
                </div>
                <div className={styles.xiaomiDetails}>
                    <h1 style={{color: '#f6cd81'}} >Xiaomi Electric Scooter Repair Services</h1>
                    <h2 style={{color: '#f6cd81'}}>We specialise in repairing the popular Xiaomi M365 electric scooters</h2>
                    <DownArrow clickHandler={() => priceRef.current.scrollIntoView(true)}
                    h3="Check the prices below"/>
                </div>

            </div>

            <div className={styles.xiaomiRepairContainer}>
                <h1 className={styles.xiaomiRepairH1}>Xiaomi Electric Scooter Repair Services</h1>
                <p>Here you will find our price list for some of the more popular scooter repairs we offer at Cycle Fix London. Our prices include parts and labour however, we will only charge labour if you already have the replacement part required for the repair. Our hourly charge for labour is £50 per hour.</p>
                <p>We have an extensive list of parts and accessories in stock for Xiaomi M365, Pro and Pro 2 electric scooter. Some accessories include: phone holders, child handlebars, bag hooks, storage bags, upgraded brakes, valve adapters and new grips. We can also supply parts for other brands of scooters too but these will be ordered in specially on a case by case basis.</p>
                <p>We pride ourselves on having a can-do attitude towards electric scooter repairs and no job is too big or too small, check out some of our latest reviews. If you cannot see the price for the repair that you need, please don’t hesitate to contact us to see how we can help</p>
            </div>

            <div className={styles.repairListMain} ref={ priceRef }>
                <Spinner switch={ spinner }/>
                <h1 className={styles.repairListMainH1}>Xiaomi Electric Scooter Repair Services</h1>
                <div data-aos = "fade-down-right" className={styles.repairListContainer}>
                    {displayList}
                </div>
            </div>

            <div className={styles.noteMain}>
                <h2>Please note we can only advise and fix problems on this scooter only.</h2>
                <p>If your scooter does not have the MI on the floor platform it is not a genuine Xiaomi scooter.</p>
            </div>
        </div>
        </>
    )    
}

export default Xiaomi;
