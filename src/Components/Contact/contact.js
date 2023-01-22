import React, { useEffect, useRef, useState } from "react";
import styles from './contact.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faAt, faPhone, faPieChart, faSignature, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import DownArrow from "../Others/DownArrow/downArrow";
import Spinner from "../Others/Spinner/spinner";
import Modal from "../Others/Modal/modal";
import Backdrop from "../Backdrop/backdrop";

const Contact = () => {

    const formRef = useRef(null);

    const [name, setName] = useState('')

    const [phone, setPhone] = useState('');

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidty] = useState(true);

    const [message, setMessage] = useState('');

    const [finalValidation, setFinalValidation] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        if (backdrop) {
            document.body.style.position = 'sticky';
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.position = 'unset';
            document.body.style.overflow = 'auto';
        }
    }, [backdrop])

    useEffect(() => {    
        const timerId = setTimeout(() => {
            if (email) {
                const check1 = email.indexOf('@');
                const check2 = email.indexOf('.com');
                if (check1 > 0 && check2 > 0) {
                    const domain = email.slice(check1+1, check2);
                    if (domain) {
                        setEmailValidty(true)
                    }
                }
                else {
                    setEmailValidty(false);
                }
                
            }
        }, 1300);

        return () => clearTimeout(timerId);
    }, [email])

    
    useEffect(() => {
        if (name && phone && emailValidity && message) {
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [name, phone, emailValidity, message] )

    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinner(true);

        fetch('http://localhost:8000/contact-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, phone, email, message
            })
        }).then(res => res.json())
        .then(data => {
            setSpinner(false);
            setStatus(data.status);
            setModal(true);
            setBackdrop(true);
        }).catch(err => {
            setSpinner(false);
            setStatus('error');
            setModal(true);
            setBackdrop(true);
        })

    }

    const closeDisplayMsg = () => {
        setModal(false);
        setBackdrop(false);
    }

    let displayMsg = null;
    if (status === 'success'){
        displayMsg = <div className={styles.displayMsgMain}>
            <h1>Thanks for your query</h1>
            <h2>We will get back to you ASAP</h2>
            <button className={styles.displayMsgBtn} onClick={ () => window.location.reload() }>Okay</button>
        </div>
    }
    else {
        displayMsg = <div className={styles.displayMsgMain}>
            <h1>Something went wrong</h1>
            <h2>Please try again</h2>
            <button className={styles.displayMsgBtn} onClick={ closeDisplayMsg }>Okay</button>
        </div>
    }

    return (
        <>
        <Backdrop backdrop={backdrop} toggleBackdrop={() => { /*nothing*/}}/>
        <Modal switch={modal}>
            {displayMsg}
        </Modal>
        <div className={styles.contactBgMain}>
            
            <div className={styles.contactBgContainer}>
                <div className={styles.contactBg}>

                </div>

                <div className={styles.contactQuery}>
                    <h1 className={styles.contactQueryH1}>We are there whenever you need us</h1>
                    <DownArrow h3="If you have any queries contact us below" clickHandler={() => formRef.current.scrollIntoView(true)}/>
                </div>
            </div>

            <div className={styles.contactFormMain} ref={ formRef }>
                <Spinner switch={spinner}/>
                <div className={styles.contactForm}>
                    <h1 className={styles.contactFormH1}>Contact Cycle Fix London</h1>
                    <div className={styles.contactFormHeaderMain}>
                        <div className={styles.contactFormHeaderContainer}>
                            <div className={styles.contactFormHeader}>
                                <h3>If you have any questions or queries please get in touch on 0207 820 0028 or send us a message below. We’ll get back to you as soon as possible.</h3>
                            </div>
                            <div className={styles.contactFormHeaderItemContainer}>
                                <div className={styles.contactFormHeaderItems}>
                                    <a href="https://www.google.com/maps/dir/51.5047424,-0.1245184/51.4865153,-0.1115455/@51.4958316,-0.1274317,15z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0" className={styles.contactFormHeaderItem} target="_blank">
                                        <FontAwesomeIcon icon={faMapPin} className={styles.contactFormHeaderItemIcon} />
                                        <div className={styles.contactFormHeaderP}>
                                            <p style={{margin: '2px'}}>338 Kennington Road, London</p>
                                            <p style={{margin: '2px'}}>SE11 4LD</p>
                                        </div>
                                    </a>
                                </div>
                                <div className={styles.contactFormHeaderItems}>
                                    <a href="mailto:info@cyclefixlondon.co.uk" className={styles.contactFormHeaderItem}>
                                        <FontAwesomeIcon icon={faAt} className={styles.contactFormHeaderItemIcon} />
                                        <div className={styles.contactFormHeaderP}>
                                            <p>info@cyclefixlondon.co.uk</p>
                                        </div>
                                    </a>
                                </div>
                                <div className={styles.contactFormHeaderItems}>
                                    <a href="tel:+442078200028" className={styles.contactFormHeaderItem}>
                                        <FontAwesomeIcon icon={faPhone} className={styles.contactFormHeaderItemIcon} />
                                        <div className={styles.contactFormHeaderP}>
                                            <p>0207 820 0028</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contactFormContainer}>
                            <form className={styles.formMain}>
                                <div className={styles.formInputContainer}>
                                    <FontAwesomeIcon icon={ faSignature } className={styles.addressIcon}/>
                                    <input type="text"
                                        className={styles.formInput}
                                        placeholder="Your Name"
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className={styles.formInputContainer}>
                                    <FontAwesomeIcon icon={ faPhone } className={styles.addressIcon}/>
                                    <input type="number"
                                        className={styles.formInput}
                                        placeholder="Your Phone"
                                        onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className={ emailValidity ? styles.formInputContainer : `${styles.formInputContainer} ${styles.wrongInput}`}>
                                    <FontAwesomeIcon icon={ faAt } className={styles.addressIcon}/>
                                    <input type="email"
                                        className={styles.formInput}
                                        placeholder="Your Email"
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className={styles.formTextAreaContainer}>
                                    <FontAwesomeIcon icon={ faEnvelope } className={styles.addressIcon}/>
                                    <textarea className={styles.formInputTextarea}
                                              rows="10"
                                              placeholder="Message"
                                              onChange={(e) => setMessage(e.target.value)} />
                                </div>
                                <button className={styles.formBtn}
                                        disabled={!finalValidation}
                                        onClick={ handleSubmit }
                                        >Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default Contact;
