import React from "react";
import styles from './drawToggle.module.css';
import { connect } from 'react-redux';
import actionTypes from "../../../Reducer/actionTypes";

const DrawToggle = (props) => {

    return (
        <div className={styles.drawToggleMain} onClick={() => props.toggleSidedrawer()}>
            <div className={styles.drawToggleBar}></div>
            <div className={styles.drawToggleBar}></div>
            <div className={styles.drawToggleBar}></div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleSidedrawer: () => dispatch({ type: actionTypes.TOOGLE_SIDEDRAWER })
    }
}

export default connect (null, mapDispatchToProps) (DrawToggle);
