import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../Others/AuthContext/authContext";
import styles from './camsQueryContainer.module.css';
import Modal from "../../Others/Modal/modal";
import Spinner from '../../Others/Spinner/spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faAt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

let target = null;

const CamsQueryContainer = ({ formRef }) => {

    const context = useContext(AuthContext);

    const [modal, setModal] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [name, setName] = useState('');
    const [nameValidation, setnameValidation] = useState(true);

    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState(true);

    const [message, setMessage] = useState('');
    const [messageValidation, setMessageValidation] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberValidation, setPhoneNumberValidty] = useState(true);

    const [finalValidation, setFinalValidation] = useState(false);

    const [submitStatus, setSubmitStatus] = useState(null);

    //set the name and email variable from logged in user information
    useEffect(() => {
        if (context.loggedInUser) {
            if (context.loggedInUser.hasOwnProperty('_id') && !name && !email) {
                setName(`${context.loggedInUser.firstName} ${context.loggedInUser.lastName}`);
                setEmail(context.loggedInUser.email);
            }
            else if (context.loggedInUser.hasOwnProperty('iss') && !name && !email) {
                setName(`${context.loggedInUser.given_name} ${context.loggedInUser.family_name}`)
                setEmail(context.loggedInUser.email);
            }
        }
    }, [context.loggedInUser, name, email])

    //this hook validate user inputs
    useEffect(() => {
        switch (target) {
            case 'name':
                name.length > 0 ? setnameValidation(true) : setnameValidation(false);
                break;
            
            case 'email':
                const check1 = email.includes('@');
                const check2 = email.includes('.com');
                const check1Index = email.indexOf('@');
                const check2Index = email.indexOf('.com');
                let domain = false;
        
                if (check1 && check2) {
                    domain = email.slice(check1Index + 1, check2Index);
                }
        
                domain.length > 0 ? setEmailValidation(true) : setEmailValidation(false);

                break;

            case 'message':
                message.length > 0 ? setMessageValidation(true) : setMessageValidation(false);
                break;

            case 'phoneNumber':
                phoneNumber.length >= 11 ? setPhoneNumberValidty(true) : setPhoneNumberValidty(false);
                break;

            default:
                break;
        }
    }, [name, email, message, phoneNumber])

    //when all inputs are validated then enable the submit button
    useEffect(() => {
        if ((name && nameValidation) && (email && emailValidation) && (message && messageValidation) && (phoneNumber && phoneNumberValidation)){
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [name, nameValidation, email, emailValidation, message, messageValidation, phoneNumber, phoneNumberValidation])

    //submit form handler
    const handleSubmission = event => {
        event.preventDefault();
        setSpinner(true);

        fetch('https://cyclefixserver.onrender.com/submit-cams-query', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                name, email, message, phoneNumber
            })
        }).then(res => res.json()).then(data => {
            console.log(data.status);
            setSpinner(false);
            setSubmitStatus(data.status);
            context.setBackdrop(true);
            setModal(true);
        })
        .catch(err => {
            setSpinner(false);
            setSubmitStatus('failed');
            context.setBackdrop(true);
            setModal(true);
        });
    }

    const handleBackdrop = () => {
        setModal(false);
        context.setBackdrop(true);
    }

    let submitMsg = null;

    if (submitStatus === 'success') {
        submitMsg = <div className={styles.submitMsgMain}>
            <h2 className={styles.submitMsgH1}>Thank you</h2>
            <p className={styles.submitMsgH2}>Your query has been sent successfully</p>
            <button className={styles.submitMsgBtn} onClick={() => window.location.reload()}>
                You are welcome !
            </button>
        </div>
    }
    else {
        submitMsg = <div className={styles.submitMsgMain}>
            <h2 className={styles.submitMsgH2}>Something went wrong</h2>
            <p className={styles.submitMsgP}>Please try again</p>
            <button className={styles.submitMsgBtn} onClick={ handleBackdrop }>
                Lets try again
            </button>
        </div>
    }


    return (
        <div className={styles.camsInquiryMain} id="camsInquiry">
            <Modal switch={modal}>
                {submitMsg}
            </Modal>
            
            <Spinner switch={spinner} />
            <div className={styles.camsInquiryHeader}>
                <h2 className={styles.camsInquiryH1}>CAMS Inquiry</h2>
            </div>

            <div className={styles.camsInquiryBg}>

            </div>

            <div className={styles.camsInquiryFormContainer} ref={formRef}>
                <form className={styles.camsInquiryForm}>
                    <div className={nameValidation ? styles.camsInquiryFormInputContainer : `${styles.camsInquiryFormInputContainer} ${styles.wrongInput}`}>
                        <FontAwesomeIcon icon={faSignature} className={nameValidation ? styles.camsInquiryFormInputIcon : `${styles.camsInquiryFormInputIcon} ${styles.wrongInputIcon}`} />
                        <input type="text"
                                className={styles.camsInquiryFormInput}
                                placeholder="Your Name"
                                value={name ? name : ''}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    target = 'name'
                                }}/>
                    </div>

                    <div className={emailValidation ? styles.camsInquiryFormInputContainer : `${styles.camsInquiryFormInputContainer} ${styles.wrongInput}`}>
                        <FontAwesomeIcon icon={faAt} className={emailValidation ?  styles.camsInquiryFormInputIcon : `${styles.camsInquiryFormInputIcon} ${styles.wrongInputIcon}` }/>
                        <input type="email"
                                className={styles.camsInquiryFormInput}
                                placeholder="Your Email"
                                value={email ? email : ''}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    target = 'email'
                                }}/>
                    </div>

                    <div className={messageValidation ? styles.camsInquiryFormMsgInputContainer : `${styles.camsInquiryFormMsgInputContainer} ${styles.wrongInput}`}>
                        <FontAwesomeIcon icon={faEnvelope} className={messageValidation ? styles.camsInquiryFormInputIcon : `${styles.camsInquiryFormInputIcon} ${styles.wrongInputIcon}`} />
                        <textarea type="text"
                                className={styles.camsInquiryFormMsgInput}
                                placeholder="Message"
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    target = 'message';
                                }}/>
                    </div>

                    <div className={phoneNumberValidation ? styles.camsInquiryFormInputContainer : `${styles.camsInquiryFormInputContainer} ${styles.wrongInput}`}>
                        <FontAwesomeIcon icon={faPhone} className={phoneNumberValidation ? styles.camsInquiryFormInputIcon : `${styles.camsInquiryFormInputIcon} ${styles.wrongInputIcon}`} />
                        <input type="number"
                                className={styles.camsInquiryFormInput}
                                placeholder="Your Phone Number"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    target = 'phoneNumber';
                                }}
                                />
                    </div>

                    <button className={finalValidation ? styles.camsInquiryFormBtn : `${styles.camsInquiryFormBtn} ${styles.wrongBtn}`}
                            disabled={!finalValidation}
                            onClick={(event) => handleSubmission(event)}
                            >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CamsQueryContainer;
