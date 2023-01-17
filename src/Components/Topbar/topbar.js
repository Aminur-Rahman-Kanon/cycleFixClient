import React from "react";
import logo from '../../Assets/logo.png';
import Navbar from "./Navbar/navbar";
import LoginBar from "./LoginBar/loginBar";
import DrawToggle from "./DrawToggle/drawToggle";
import styles from './topbar.module.css';

const Topbar = () => {

    return (
        <div className={styles.topbarMain}>
            <img src={logo} className={styles.logo} />
            <div className={styles.toggleElements}>
                <Navbar />
                <LoginBar />
            </div>
            <DrawToggle />
        </div>
    )
}

export default Topbar;
