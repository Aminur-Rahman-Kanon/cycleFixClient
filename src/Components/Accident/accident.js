import React, { useEffect, useState, useRef, useContext } from 'react';
import { LoggedInUsers } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSignature, faEnvelope, faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
import cams from '../../Assets/cams.jpg';
import mechanic from '../../Assets/mechanic.jpg';
import Spinner from '../Others/Spinner/spinner';
import Aos from 'aos';
import Modal from '../Others/Modal/modal';
import Backdrop from '../Backdrop/backdrop';
import styles from './accident.module.css';
import { Helmet } from 'react-helmet-async';

let target = null;

const Accident = () => {

    const loggedInUser = useContext(LoggedInUsers);

    const formRef = useRef();

    const [name, setName] = useState('');
    const [nameValidation, setnameValidation] = useState(true);

    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState(true);

    const [message, setMessage] = useState('');
    const [messageValidation, setMessageValidation] = useState(true);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberValidation, setPhoneNumberValidty] = useState(true);

    const [finalValidation, setFinalValidation] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [submitStatus, setSubmitStatus] = useState(null);

    const [modal, setModal] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: '2000', once: true });
    }, [])

    useEffect(() => {
        if (loggedInUser) {
            if (loggedInUser.hasOwnProperty('_id') && !name && !email) {
                setName(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
                setEmail(loggedInUser.email);
            }
            else if (loggedInUser.hasOwnProperty('iss') && !name && !email) {
                setName(`${loggedInUser.given_name} ${loggedInUser.family_name}`)
                setEmail(loggedInUser.email);
            }
        }
    }, [loggedInUser, name, email])

    useEffect(() => {
        if (backdrop){
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'sticky';
        }
        else {
            document.body.style.overflow = 'auto';
            document.body.style.position = 'unset';
        }
    }, [backdrop])

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

    useEffect(() => {
        if ((name && nameValidation) && (email && emailValidation) && (message && messageValidation) && (phoneNumber && phoneNumberValidation)){
            setFinalValidation(true);
        }
        else {
            setFinalValidation(false);
        }
    }, [name, nameValidation, email, emailValidation, message, messageValidation, phoneNumber, phoneNumberValidation])

    const handleSubmission = event => {
        event.preventDefault();
        
        setSpinner(true);

        fetch('https://cyclefixserver.onrender.com/submit-query', {
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
            setBackdrop(true);
            setModal(true);
        })
        .catch(err => {
            setSpinner(false);
            setSubmitStatus('failed');
            setBackdrop(true);
            setModal(true);
        });
    }

    const handleBackdrop = () => {
        setModal(false);
        setBackdrop(false);
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
        <>
        <Helmet>
            <title>CAMS</title>
            <meta name="description" content="Cycling accident claim"/>
            <link rel="canonical" href="/cycling-accident"/>
        </Helmet>
        <Backdrop backdrop={backdrop} />

        <div className={styles.accidentMain}>
            <div className={styles.accidentIntroMain}>
                <div className={styles.accidentIntroBg}>

                </div>

                <div className={styles.accidentIntroContainer}>
                    <h1 className={styles.accidentIntroContainerH1}>Had a cycling accident that wasn’t your fault?</h1>
                    <p className={styles.accidentIntroContainerP}>If you have had a cycling accident and you believe you have a valid claim, knowing how to proceed can be difficult. To help you, we have teamed up with CAMS (Cycling Accident Management Services), a specialist cycling road traffic accident company that offer a best-in-class service to get you back on your bike as soon as possible. Best of all you do not need to be insured to use this service and their costs are recovered from the drivers insurance company.</p>
                    <button className={styles.accidentIntroContainerBtn} onClick={() => formRef.current.scrollIntoView(true)}>Enqury Now</button>
                </div>
            </div>

            <div className={styles.camsMain}>
                <div className={styles.camsImgContainer}>
                    <img src={cams} alt="cams" className={styles.camsImg} />
                </div>

                <div className={styles.camsIntro}>
                    <h2 className={styles.camsH1}>Who are CAMS</h2>
                    <p className={styles.camsP}>Cycling accident management services, is one of the UK’s leading cyclist support companies. They have been helping people who have been involved in bicycle and motorcycle accidents since the company was founded in 1996. Since then, they have assisted thousands of clients by taking away the inconvenience that inevitably results from losses incurred in any accident.
                       They have dedicated Claims Advisors who deal with your claims quickly and efficiently. Thanks to their long-established relationships with repairers, insurance companies and solicitors, they are able to ensure your problems are resolved to your complete satisfaction.
                       Their head office is based in Liverpool where they offer a 24 hours, 7 days a week service.</p>
                    
                    <a href="https://c-ams.co.uk" target="_blank" rel="noreferrer" className={styles.camsLink}>Explore CAMS</a>
                </div>
            </div>

            <div className={styles.whatWeDoMain}>
                <div className={styles.whatWeDoIntro}>
                    <h2 className={styles.whatWeDoH2}>To help you, we have put together a service where we handle all the main tasks for you including:</h2>

                    <div className={styles.whatWeDoListContainer}>
                        <ul className={styles.whatWeDoServices}>
                            <li className={styles.whatWeDoService}>
                                <FontAwesomeIcon icon={faCheck} className={styles.whatWeDoIcon}/>
                                <p className={styles.whatWeDoP}>Collecting your bike</p>
                            </li>

                            <li className={styles.whatWeDoService}>
                                <FontAwesomeIcon icon={faCheck} className={styles.whatWeDoIcon}/>
                                <p className={styles.whatWeDoP}>Repairing your bicycle to its standard before the accident happened</p>
                            </li>

                            <li className={styles.whatWeDoService}>
                                <FontAwesomeIcon icon={faCheck} className={styles.whatWeDoIcon}/>
                                <p className={styles.whatWeDoP}>Preparing an accident report</p>
                            </li>

                            <li className={styles.whatWeDoService}>
                                <FontAwesomeIcon icon={faCheck} className={styles.whatWeDoIcon}/>
                                <p className={styles.whatWeDoP}>Having a solicitor represent your interests and deal with the driver’s insurance company</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.whatWeDoImgContainer}>
                    <img src={mechanic} alt="cycle fix accident claim" className={styles.whatWeDoImg} />
                </div>
            </div>

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
        </div>
        </>
    )
}

export default Accident;
