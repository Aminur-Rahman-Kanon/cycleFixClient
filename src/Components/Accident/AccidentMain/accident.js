import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import cams from '../../../Assets/cams.jpg';
import mechanic from '../../../Assets/mechanic.jpg';
import styles from './accident.module.css';
import { Helmet } from 'react-helmet-async';
import CamsQueryContainer from '../CamsQueryContainer/camsQueryContainer';

const Accident = () => {

    const formRef = useRef();

    //scrolling to the top and initializing AOS
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
        <Helmet>
            <title>CAMS</title>
            <meta name="description" content="Cycling accident claim"/>
            <link rel="canonical" href="/cycling-accident"/>
        </Helmet>

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

            <CamsQueryContainer formRef={formRef} />
        </div>
        </>
    )
}

export default Accident;
