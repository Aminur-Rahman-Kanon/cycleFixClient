import React, { useEffect, useRef, useState } from "react";
import styles from './xiaomi.module.css';
import xiaomiBg from '../../Assets/xiaomi.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPoundSign, faSignature, faPhone, faAt } from '@fortawesome/free-solid-svg-icons';
import { xiaomiRepairPrice } from '../../Data/data';
import DownArrow from "../Others/DownArrow/downArrow";
import Aos from 'aos';
import Spinner from "../Others/Spinner/spinner";
import Backdrop from "../Backdrop/backdrop";
import Modal from "../Others/Modal/modal";
import { Helmet } from 'react-helmet-async';

const Xiaomi = () => {

    const priceRef = useRef(null);

    const [status, setStatus] = useState('');

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setbackdrop] = useState(false);

    const [displayForm, setDisplayForm] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');

    const [phone, setPhone] = useState('');
    
    const [date, setDate] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: 2500, once: true });
    }, [])

    //need tp change declaration
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
            <button className={styles.bookNowBtn} onClick={() => {
                setSelectedCard({
                    service:list.repair, price: list.price
                })
                setDisplayForm(true);
            }}>Book now</button>
        </div>
    })
    : 
    null

    const bookService = async (query) => {
        setSpinner(true);
        await fetch('https://cyclefixserver.onrender.com/book-xiaomi-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service: query.service, price: query.price, name, email, phone, date
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

    const displayBookingForm = <div className={styles.bookingFormMain} style={displayForm ? {display: 'flex'} : {display: 'none'}}>
        <form className={styles.bookingFormContainer}>
            <h2 className={styles.bookingFormHeader}>Please fill up the following information</h2>
            <div className={styles.bookingInputContainer}>
                <input type="text"
                       className={styles.bookingInput}
                       placeholder="Your name"
                       onChange={(e) => setName(e.target.value)}/>
                <FontAwesomeIcon icon={faSignature} className={styles.bookingInputIcon}/>
            </div>
            <div className={styles.bookingInputContainer}>
                <input type="email"
                       className={styles.bookingInput}
                       placeholder="Your email"
                       onChange={(e) => setEmail(e.target.value)}/>
                <FontAwesomeIcon icon={faAt} className={styles.bookingInputIcon}/>
            </div>
            <div className={styles.bookingInputContainer}>
                <input type="number"
                       className={styles.bookingInput}
                       placeholder="Your phone number"
                       onChange={(e) => setPhone(e.target.value)}/>
                <FontAwesomeIcon icon={faPhone} className={styles.bookingInputIcon}/>
            </div>
            <div className={styles.bookingInputContainer}>
                <input type="text"
                       className={styles.bookingInput}
                       placeholder="Approximate date"
                       onChange={(e) => setDate(e.target.value)}/>
                <FontAwesomeIcon icon={faCalendar} className={styles.bookingInputIcon}/>
            </div>
            
            <div className={styles.bookingBtns}>
                <button className={styles.requestBtn} onClick={(e) => {
                    e.preventDefault();
                    bookService(selectedCard);
                }}>Request</button>
                <button className={styles.requestBtn} onClick={(e) => {
                    e.preventDefault();
                    setDisplayForm(false);
                }}>Close</button>

            </div>
        </form>
    </div>

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
        <Backdrop backdrop={backdrop} toggleBackdrop={() => {/*does nothing */}}/>
        <Modal switch={modal}>
            {displayMsg}
        </Modal>
        {displayBookingForm}
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
                <h2 className={styles.xiaomiRepairH1}>Xiaomi Electric Scooter Repair Services</h2>
                <p>Here you will find our price list for some of the more popular scooter repairs we offer at Cycle Fix London. Our prices include parts and labour however, we will only charge labour if you already have the replacement part required for the repair. Our hourly charge for labour is £50 per hour.</p>
                <p>We have an extensive list of parts and accessories in stock for Xiaomi M365, Pro and Pro 2 electric scooter. Some accessories include: phone holders, child handlebars, bag hooks, storage bags, upgraded brakes, valve adapters and new grips. We can also supply parts for other brands of scooters too but these will be ordered in specially on a case by case basis.</p>
                <p>We pride ourselves on having a can-do attitude towards electric scooter repairs and no job is too big or too small, check out some of our latest reviews. If you cannot see the price for the repair that you need, please don’t hesitate to contact us to see how we can help</p>
            </div>

            <div className={styles.repairListMain} ref={ priceRef }>
                <h2 className={styles.repairListMainH1}>Xiaomi Electric Scooter Repair Services</h2>
                <div className={styles.repairListContainer}>
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
