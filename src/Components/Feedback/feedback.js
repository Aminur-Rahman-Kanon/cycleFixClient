import React, { useEffect, useState } from "react";
import styles from './feedback.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature, faAt, faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../Others/Spinner/spinner";
import Modal from '../Others/Modal/modal';
import Backdrop from '../Backdrop/backdrop';

const Feedback = () => {

    const [rating, setRating] = useState(0);

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState(true);

    const [comment, setComment] = useState('');

    const [btnDisable, setBtnDisable] = useState(true);

    const [spinner, setSpinner] = useState(false);

    const [modal, setModal] = useState(false);

    const [backdrop, setbackdrop] = useState(false);

    const [status, setStatus] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (email){
                const check1 = email.includes('@');
                const check2 = email.includes('.com');
        
                if (check1 && check2){
                    const checkDomain = email.slice(email.indexOf('@') + 1, email.indexOf('.com'))
                    if (checkDomain) setEmailValidation(true);
                }
                else setEmailValidation(false);
            }
        }, 1200) 

        return () => clearTimeout(timer);
    }, [email])

    useEffect(() => {
        if (name && email && comment && rating) {
            setBtnDisable(false);
        }
        else {
            setBtnDisable(true);
        }
    }, [name, email, comment, rating])

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

    const formHandler = (e) => {
        e.preventDefault();

        setSpinner(true);

        fetch('https://cyclefixserver.onrender.com/submit-feedback', {
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
        <Backdrop backdrop={backdrop} />
        <Modal switch={modal}>
            {displayStatus}
        </Modal>
        <div className={styles.feedbackMain}>
            <Spinner spinner={spinner} />
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
                <div className={emailValidation ? styles.formInputContainer : `${styles.formInputContainer} ${styles.wrongInput}`}>
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
