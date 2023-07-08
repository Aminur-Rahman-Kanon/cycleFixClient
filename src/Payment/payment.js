import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from '@fortawesome/free-solid-svg-icons';
import styles from './payment.module.css';
import Modal from "../Components/Others/Modal/modal";
import Backdrop from "../Components/Backdrop/backdrop";
import Spinner from "../Components/Others/Spinner/spinner";
import logo from '../Assets/logo.png';

const cardStyle = {
    hidePostalCode: true,
    iconStyle: 'solid',
    style: {
      base: {
        color: "#7db2ed",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "lightgray"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };


const Payment = () => {

    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const [name, setName] = useState('');

    const [authCode, setAuthCode]  = useState('');

    const [bookingStatus, setbookingStatus] = useState('');

    let userData = {};
    let totalPrice = null;

    if (sessionStorage.length > 0) {
        userData = JSON.parse(sessionStorage.getItem('userData'));
        totalPrice = parseInt(userData.packagePrice) + parseInt(userData.additionalCost)
    }

    const subtotal = totalPrice * 100

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (backdrop){
            document.body.style.position = 'sticky';
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.position = 'unset';
            document.body.style.overflow = 'auto';
        }
    }, [backdrop])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        console.log(paymentMethod);

        if (!error) {
            try {
                const { id } = paymentMethod;

                await fetch('https://cyclefixserver.onrender.com/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ amount: 2500, id: id })
                }).then(res => res.json())
                .then(async data => {
                    if (data.success){
                        setSpinner(true)
                        setSuccess(true);
                        setModal(true);
                        setBackdrop(true);
                        const genAuthCode = genRanHex(12);
                        setAuthCode(genAuthCode);
                        userData.paymentStatus = 'Paid';
                        userData.authCode = genAuthCode;
                        userData.totalPrice = subtotal;
                        await fetch('https://cyclefixserver.onrender.com/payment-success', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({userData})
                        }).then(res => res.json()).then(data => {
                            setSpinner(false);
                            setbookingStatus(data.status);
                        }).catch(err => {
                            setSpinner(false);
                            setbookingStatus('error');
                        })
                    }
                })
            } catch (error) {
                setSpinner(false)
                setError(true);
                setBackdrop(true)
                setModal(true)
            }
        }
    }

    const closePopupMsg = () => {
        setModal(false);
        setBackdrop(false);
        setError(false);
    }

    let displayMsg = null;

    let displaybookingStatus = <div className={styles.displayMsgMain}>
        <h1 style={{color: '#7db2ed'}}>Technical difficulties</h1>
        <p style={{textAlign: 'center'}}>Extremely sorry for the inconvenience</p>
        <p style={{textAlign: 'center'}}>The payment gone through but something wrong with the booking</p>
        <p style={{textAlign: 'center'}}>Please contact cycle fix on 02078200028</p>
        <button className={styles.displayMsgBtn} onClick={closePopupMsg}>Ok</button>
    </div>

    if (success) {
        displayMsg = <div className={styles.displayMsgMain}>
            <h1 style={{color: '#7db2ed'}}>Payment received</h1>
            <p style={{textAlign: 'center'}}>{`${userData.service} service has been booked on ${userData.date} at 9.00 AM`}</p>
            <p>Your authorization code: {authCode}</p>
            <p>See you soon!</p>
            <button className={styles.displayMsgBtn} onClick={() => window.location.assign('/')}>Finish</button>
        </div>
    }
    else if (error){
        displayMsg = <div className={styles.displayMsgMain}>
            <h1>Something went wrong</h1>
            <p style={{textAlign: 'center'}}>The payment didn't go through</p>
            <p style={{textAlign: 'center'}}>Please check the credentials and try again</p>
            <button className={styles.displayMsgBtn} onClick={closePopupMsg}>Try again</button>
        </div>
    }

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    return (
        <>
        <Backdrop backdrop={backdrop} toogleBackdrop={() => {/*Does nothing*/}}/>
        <Modal switch={modal}>
            { bookingStatus === 'error' && !error ? displaybookingStatus : displayMsg}
        </Modal>
        <div className={styles.paymentMain}>
            <Spinner switch={spinner} />
            <div className={styles.paymentFormIntro}>
                <h1 className={styles.paymentFormIntroH1}>Enter your payment details</h1>
                <div className={styles.paymentFormMain}>
                    <div className={styles.userInformationMain}>
                        <div className={styles.logoContainer}>
                            <img src={logo} alt="cycle fix logo"/>
                        </div>
                        <div className={styles.userInformationContainer}>
                            <h2 className={styles.userInformationH2}>Service name</h2>
                            <p className={styles.userInformationP}>{Object.keys(userData).length > 0 ? userData.service : 'No information'}</p>
                        </div>
                        <div className={styles.userInformationContainer}>
                            <p className={styles.userInformationP}>Date: {Object.keys(userData).length > 0 ? `${userData.date} at 9 AM` : 'No information'}</p>
                        </div>
                        <div className={styles.userInformationContainer}>
                            <h2 className={styles.userInformationH2}>Customer details</h2>
                            <div className={styles.innerDetails}>
                                <h4 className={styles.innerDetailsH4}>Full name</h4>
                                <p className={styles.userInformationP}>{Object.keys(userData).length > 0 ? `${userData.firstName} ${userData.lastName}` : 'No information'}</p>
                            </div>
                            <div className={styles.innerDetails}>
                                <h4 className={styles.innerDetailsH4}>Email</h4>
                                <p className={styles.userInformationP}>{Object.keys(userData).length > 0 ? userData.email : 'No information'}</p>
                            </div>
                            <div className={styles.innerDetails}>
                                <h4 className={styles.innerDetailsH4}>Phone</h4>
                                <p className={styles.userInformationP}>{Object.keys(userData).length > 0 ? userData.phone : 'No information'}</p>
                            </div>
                            <div className={styles.innerDetails}>
                                <h4 className={styles.innerDetailsH4}>Package price</h4>
                                <p className={styles.userInformationP}>{Object.keys(userData).length > 0 ? `£${userData.packagePrice}` : 'No information'}</p>
                            </div>
                            <div className={styles.innerDetails}>
                                <h4 className={styles.innerDetailsH4}>Additional cost</h4>
                                <p className={styles.userInformationP}>{Object.keys(userData).length > 0 ? `£${userData.additionalCost}` : 'No information'}</p>
                            </div>
                            <div className={styles.innerDetails}>
                                <h4 className={styles.innerDetailsH4}>Subtotal</h4>
                                <p className={styles.userInformationP}>{Object.keys(userData).length > 0 ? `£${totalPrice}` : 'No information'}</p>
                            </div>
                            <div className={styles.innerDetails}>
                                <div className={styles.innerDetailsDeposit}>
                                    <h4 className={styles.innerDetailsH4}>Deposit: {Object.keys(userData).length > 0 ? `£${userData.deposit}` : '£25'}</h4>
                                    <h3 className={styles.innerDetailsH4}>You just need to pay the deposit to make a booking</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <form className={styles.paymentFormContainer}>
                        <div className={styles.fieldSet}>
                            <FontAwesomeIcon icon={ faSignature } className={styles.formIcon}/>
                            <input type="text"
                                className={styles.formInput}
                                placeholder="Name on Card"
                                onChange={(e) => setName(e.target.value)}
                                />
                        </div>

                        <div className={styles.paymentCardContainer}>
                            {stripe ? <CardElement options={cardStyle} /> : <p style={{margin: '0', color: 'lightgray'}}>Loading failed</p>}
                        </div>
                        
                        <div className={styles.btnContainer}>
                            <button onClick={ handleSubmit }
                                    className={styles.payBtn}
                                    disabled={!name}
                                    >Pay £25 deposit and Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Payment;
