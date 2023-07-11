import React, { useEffect, useRef } from "react";
import styles from './bookAservice.module.css';
import DownArrow from "../../Others/DownArrow/downArrow";
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ServicesContainer from "../ServiesContainer/servicesContainer";

const BookAservice = () => {

    const bookService = useRef(null);

    const params = useParams();

    //if the params contains "booking" then scroll serviceContainer into view
    useEffect(() => {
        if (Object.keys(params).length > 0 && params.hasOwnProperty('booking')){
            if (params.booking === 'booking'){
                bookService.current.scrollIntoView(true);
            }
        }
    }, []);

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
                        <ServicesContainer />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BookAservice;
