import React, { useEffect, useRef } from "react";
import styles from './xiaomi.module.css';
import { Link } from 'react-router-dom';
import xiaomiBg from '../../Assets/xiaomi.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faPoundSign } from '@fortawesome/free-solid-svg-icons';
import { xiaomiRepairPrice } from '../../Data/data';
import DownArrow from "../Others/DownArrow/downArrow";
import Aos from 'aos';

const Xiaomi = () => {

    const priceRef = useRef(null);

    useEffect(() => {
        Aos.init({ duration: 2500, once: true })
    }, [])

    const displayList = xiaomiRepairPrice ? xiaomiRepairPrice.map(list => {
        return <div data-aos = "flip-left" className={styles.listCard}>
            <FontAwesomeIcon  icon={faScrewdriverWrench} className={styles.listIcon}/>
            <div className={styles.listCardDetails}>
                <p className={styles.listH3}>{list.repair}</p>
                <div className={styles.priceContainer}>
                    <FontAwesomeIcon icon={faPoundSign} className={styles.poundSign}/>
                    <p className={styles.priceP}>{list.price}</p>
                </div>
            </div>
            <Link to="#" className={styles.bookNowBtn}>Book now</Link>
        </div>
    })
    : 
    null


    return (
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
    )    
}

export default Xiaomi;
