import React, { useEffect, useRef, useState, useContext } from "react";
import styles from './contact.module.css';
import { useParams } from "react-router-dom";
import DownArrow from "../../Others/DownArrow/downArrow";
import Spinner from "../../Others/Spinner/spinner";
import Modal from "../../Others/Modal/modal";
import AuthContext from'../../Others/AuthContext/authContext';
import { Helmet } from 'react-helmet-async';
import ContactForm from "../ContactForm/contactForm";
import WhatsApp from "../WhatsApp/whatsapp";

const Contact = () => {

    const params = useParams();

    const context = useContext(AuthContext);

    const formRef = useRef(null);

    const [spinner, setSpinner] = useState(false);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (params.query === 'query'){
            formRef.current.scrollIntoView(true);
        }
    }, [])

    //method to close pop up message
    const closeDisplayMsg = () => {
        setModal(false);
        context.setBackdrop(true);
    }

    //status message display handler
    let displayMsg = null;
    if (status === 'success'){
        displayMsg = <div className={styles.displayMsgMain}>
            <h2>Thanks for your query</h2>
            <p>We will get back to you ASAP</p>
            <button className={styles.displayMsgBtn} onClick={ () => window.location.reload() }>Okay</button>
        </div>
    }
    else {
        displayMsg = <div className={styles.displayMsgMain}>
            <h2>Something went wrong</h2>
            <p>Please try again</p>
            <button className={styles.displayMsgBtn} onClick={ closeDisplayMsg }>Okay</button>
        </div>
    }

    return (
        <>
        <Helmet>
            <title>Contact cycle fix</title>
            <meta name="description" content="contact cycle fix"/>
            <link rel="canonical" href="/contact"/>
        </Helmet>
        <Spinner spinner={spinner} />
        <Modal modal={modal}>
            {displayMsg}
        </Modal>
        <div className={styles.contactBgMain}>            
            <div className={styles.contactBgContainer}>
                <div className={styles.contactBg}>

                </div>

                <div className={styles.contactQuery}>
                    <h2 className={styles.contactQueryH1}>We are there whenever you need us</h2>
                    <DownArrow h3="If you have any queries contact us below" clickHandler={() => formRef.current.scrollIntoView(true)}/>
                </div>
            </div>

            <ContactForm formRef={formRef}
                         loggedInUser={context.loggedInUser}
                         changeStatusMessage={setStatus}
                         toggleBackdrop={context.setBackdrop}
                         toggleModal={setModal}
                         toggleSpinner={setSpinner}
                         />

            <WhatsApp />
        </div>
        </>
    )
}

export default Contact;
