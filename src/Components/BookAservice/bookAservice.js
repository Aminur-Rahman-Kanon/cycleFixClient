import React, { useEffect, useRef } from "react";
import styles from './bookAservice.module.css';
import DownArrow from "../Others/DownArrow/downArrow";
import { priceList } from '../../Data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { faAnglesDown, faAnglesUp ,faMagnifyingGlass, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Helmet } from 'react-helmet-async';

const BookAservice = () => {

    const bookService = useRef(null);

    const [expandIcon, setExpandIcon] = useState(false);

    const [itemName, setItemName] = useState('');

    const params = useParams();

    useEffect(() => {
        if (Object.keys(params).length > 0 && params.hasOwnProperty('booking')){
            if (params.booking === 'booking'){
                bookService.current.scrollIntoView(true);
            }
        }
    }, [params])

    const displayPriceContainer = priceList.map(item => {
        return <div key={item.h2} className={styles.chooseServicesCards}>
            <div className={styles.chooseServicesCard}>
                <div className={styles.chooseServicesImgContainer}>
                    <img src={item.img} alt="cycle fix service" className={styles.chooseServicesImg} />
                </div>

                <div className={styles.chooseServicesInfoContainer}>
                    <div className={styles.chooseServicesInfo}>
                        <h2 style={{textAlign: 'center', color: '#a70713'}}>{item.h2}</h2>
                        <p>{item.p}</p>
                    </div>
                    <div className={styles.chooseServicesIncludedMain}>
                        <p style={expandIcon && itemName === item.h2 ? {display: 'none'} : {display: 'block', color: '#4c8ed7'}}>What included?</p>
                        <FontAwesomeIcon icon={ faAnglesDown }
                                         className={styles.chooseServicesIcon}
                                         style={!expandIcon || itemName !== item.h2 ? {visibility: 'visible'} : {visibility: 'hidden'}}
                                         onClick={() => {
                                            setExpandIcon(true)
                                            setItemName(item.h2);
                                         }} />
                        <div className={expandIcon && itemName === item.h2 ? styles.chooseServicesIncluded : `${styles.chooseServicesIncluded} ${styles.chooseServicesIncludedOff}`}>
                            {item.list.map((service, index) => {
                                return <div key={ item.list[index] } className={styles.chooseService}>
                                    <FontAwesomeIcon icon={ index === 0 ? faMagnifyingGlass : faScrewdriverWrench } className={styles.chooseServiceIcon}/>
                                    <p className={styles.service}>{service}</p>
                                </div>
                            })}
                            <div className={styles.collapseIconContainer}>
                                <FontAwesomeIcon icon={ faAnglesUp }
                                                 className={ styles.chooseServicesIcon }
                                                 style={expandIcon && itemName === item.h2 ? {visibility: 'visible'} : {visibility: 'hidden'}}
                                                 onClick={() => {
                                                    setExpandIcon(false)
                                                    setItemName(item.h2);
                                                 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.chooseServicesPriceContainer}>
                <h2 className={styles.price}>£{item.price}</h2>
                <Link to = {`/book-service/${item.h2}/${item.price}`} className={styles.selectLink}>Select {item.h2}</Link>
            </div>
        </div>
    });

    return (
        <>
        <Helmet>
            <title>Book service</title>
            <meta name="description" content="Book for an appoinment"/>
            <link rel="canonical" href="/book-service"/>
        </Helmet>
        <div className={styles.bookServiceMain}>
            <div className={styles.bookServiceHeader}>
                <div className={styles.bookServiceBg}>

                </div>
                <div className={styles.bookServiceBgContainer}>
                    <h1>Stress Free Bike Repair Service</h1>
                    <h2>Book a reliable no-obligation assessment for your bike today</h2>
                    <DownArrow h3="Book A Service from Below" clickHandler={() => bookService.current.scrollIntoView(true)} />
                </div>
            </div>

            <div className={styles.chooseServiceMain} ref={bookService}>
                <div className={styles.chooseServiceContainer}>
                    <h2 className={styles.chooseServiceH1}>Choose A Bike Service</h2>
                    <div className={styles.chooseServicesCardsMain}>
                        { displayPriceContainer }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BookAservice;
