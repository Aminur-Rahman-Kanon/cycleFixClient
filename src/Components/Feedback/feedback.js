import React, { useEffect, useState } from "react";
import styles from './feedback.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../Others/Spinner/spinner";
import Modal from '../Others/Modal/modal';
import Backdrop from '../Backdrop/backdrop';
import { emailValidation } from "../Others/HelperFunction/helperFunction";

const Feedback = () => {

    const [rating, setRating] = useState(0);

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [emailValidity, setEmailValidity] = useState(true);

    const [comment, setComment] = useState('');

    const [btnDisable, setBtnDisable] = useState(true);

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setbackdrop] = useState(false);

    const [status, setStatus] = useState('');

    //this hook scroll to the top on componentOnMount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    //this hook validate email from user input
    useEffect(() => {
        const timer = emailValidation(email, setEmailValidity);

        return () => clearTimeout(timer);
    }, [email])

    //this hook toggle the submit form button enable/disable based on form validation
    useEffect(() => {
        if (name && email && comment && rating) {
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [name, email, comment, rating])

    //method to display stars based on ratings
    const ratings = () => {
        const totalStar = 5 - rating;
        const activeStar = Array.from(Array(rating).keys()).map((item, index) => <FontAwesomeIcon key={index} icon={faStar} className={styles.activeStar} />)
        const inActiveStar = Array.from(Array(totalStar).keys()).map((item, index) => <FontAwesomeIcon key={index + 5} icon={faStar} className={styles.inActiveStar} style={{cursor: 'default'}} />)
        
        return activeStar.concat(inActiveStar);
    }

    const displayRatings = Array.from(Array(5).keys()).map((star, index) => <FontAwesomeIcon icon={faStar}
                                                                                    key={index}
                                                                                    className={styles.inActiveStar}
                                                                                    onClick={() => setRating(index + 1)} />)

    //form submit handler                                                                                    
    const formHandler = async (e) => {
        e.preventDefault();
        setSpinner(true);

        await fetch('https://cyclefixserver.onrender.com/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, comment, rating
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

    let displayStatus = null;

    //status message handler
    if (status === 'success'){
        displayStatus = <div className={styles.statusMsgDisplay}>
            <h2 style={{color: '#7db2ed'}}>Feedback submitted</h2>
            <p>Thank you for your time</p>
            <button className={styles.statusMsgBtn} onClick={() => window.location.href = "/"}>Ok</button>
        </div>
    }
    else {
        displayStatus = <div className={styles.statusMsgDisplay}>
            <h2>Something went wrong</h2>
            <p>Please try again</p>
            <button className={styles.statusMsgBtn} onClick={() => {
                setStatus('');
                setModal(false);
                setbackdrop(false);
            }}>Ok</button>
        </div>
    }

    return (
        <>
        <Spinner spinner={spinner} />
        <Backdrop backdrop={backdrop} />
        <Modal switch={modal}>
            {displayStatus}
        </Modal>
        <div className={styles.feedbackMain}>
            <div className={styles.feedbackBg}>

            </div>

            <form className={styles.feedbackFromContainer}>
                <h2 className={styles.formHeader}>How did we do</h2>
                <div className={styles.formInputContainer}>
                    <input type="text"
                            className={styles.input}
                            placeholder="Your name"
                            onChange={(e) => setName(e.target.value)}/>
                    <FontAwesomeIcon icon={faSignature} className={styles.inputIcon}/>
                </div>
                <div className={emailValidity ? styles.formInputContainer : `${styles.formInputContainer} ${styles.wrongInput}`}>
                    <input type="email"
                            className={styles.input}
                            placeholder="Your email"
                            onChange={(e) => setEmail(e.target.value)}/>
                    <FontAwesomeIcon icon={faAt} className={styles.inputIcon}/>
                </div>
                <div className={styles.formTextAreaContainer}>
                    <textarea type="text"
                            rows="5"
                            className={styles.textarea}
                            placeholder="Write your comment here"
                            onChange={(e) => setComment(e.target.value)}/>
                    <FontAwesomeIcon icon={faPencil} className={styles.inputIcon} style={{margin: '15px 25px 0 0'}}/>
                </div>
                <div className={styles.formStarContainer}>
                    {rating ? ratings() : displayRatings}
                </div>
                <button disabled={btnDisable} className={styles.submitBtn} onClick={ formHandler }>Submit</button>
            </form>
        </div>
        </>
    )
}

export default Feedback;
