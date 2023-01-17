import React from "react";
import { SpinnerDotted } from 'spinners-react';
import styles from './spinner.module.css';

const spinner = (props) => {

    return (
        <div className={styles.spinnerMain} style={props.switch ? {display: 'flex'} : {display: 'none'}}>
            <SpinnerDotted size={89} thickness={97} speed={100} color="rgba(57, 115, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
            <p className={styles.spinnerP}>Please wait</p>
        </div>
    )
}

export default spinner;
