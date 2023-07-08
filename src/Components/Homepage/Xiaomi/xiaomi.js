import React from "react";
import { Link } from 'react-router-dom';
import styles from './xiaomi.module.css';
import xiaomi from '../../../Assets/xiaomi.png';

const Xiaomi = () => {
    return (
        <div className={styles.xiaomiMain}>
            <div data-aos = "fade-up-left" className={styles.xiaomiContainer}>
                <h2 className={styles.xiaomiH1}>Xiaomi Electric Scooter Repair Services</h2>
                <p className={styles.xiaomiH2}>We specialise in repairing the popular Xiaomi M365 electric scooters</p>
                <Link to='/xiaomi-e-scooter' className={styles.xiaomiBtn}>Explore</Link>
            </div>

            <div data-aos = "fade-right" className={styles.xiaomiImgContainer}>
                <img src={xiaomi} alt="xiaomi e scooter" className={styles.xiaomiImg} />
            </div>
        </div>
    )
}

export default Xiaomi;
