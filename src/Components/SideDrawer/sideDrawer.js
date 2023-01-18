import React from "react";
import Navbar from "../Topbar/Navbar/navbar";
import LoginBar from "../Topbar/LoginBar/loginBar";
import styles from './sideDrawer.module.css';
import logo from '../../Assets/logo.png';

const SideDrawer = (props) => {

    return (
        <div className={props.sideDrawer ? styles.sideDrawerOn : styles.sideDrawerOff}>
            <img src={logo} className={styles.sideDrawerLogo}/>
            <LoginBar />
            <Navbar />
        </div>
    )
}

export default SideDrawer;
