import React from "react";
import styles from './drawToggle.module.css';

const drawToggle = (props) => {

    return (
        <div className={styles.drawToggleMain} onClick={() => props.toggleSidedrawer()}>
            <div className={styles.drawToggleBar}></div>
            <div className={styles.drawToggleBar}></div>
            <div className={styles.drawToggleBar}></div>
        </div>
    )
}

export default drawToggle;
