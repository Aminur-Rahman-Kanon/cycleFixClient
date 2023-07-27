import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './downArrow.module.css';

const DownArrow = ({ clickHandler, h3 }) => {

    return (
        <div className={styles.downArrowContainer}>
            <h2>{h3}</h2>
            <div className={styles.downArrowMain} onClick={ clickHandler }>
                <FontAwesomeIcon icon={faCircleDown} className={styles.downArrow} data-testid="circle-icon"/>
            </div>
        </div>
    )
}

export default DownArrow;
