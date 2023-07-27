import React from "react";
import { SpinnerDotted } from 'spinners-react';
import styles from './spinner.module.css';

const Spinner = ({ spinner }) => {

    if (!spinner) return;

    return (
        <div data-testid="spinner" className={styles.spinnerMain}>
            <SpinnerDotted size={89} thickness={97} speed={100} color="rgba(57, 115, 172, 1)" secondarycolor="rgba(0, 0, 0, 0.44)" />
            <p className={styles.spinnerP}>Please wait</p>
        </div>
    )
}

export default Spinner;
