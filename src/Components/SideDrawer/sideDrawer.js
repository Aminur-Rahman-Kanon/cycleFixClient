import React from "react";
import Navbar from "../Topbar/Navbar/navbar";
import LoginBar from "../Topbar/LoginBar/loginBar";
import styles from './sideDrawer.module.css';
import logo from '../../Assets/logo.png';

const SideDrawer = ({ sideDrawer }) => {

    return (
        <div data-testid="sidedrawer" className={sideDrawer ? `${styles.sideDrawer} ${styles.on}` : `${styles.sideDrawer} ${styles.off}`}>
            <div className={styles.logoContainer}>
                <img src={logo} className={styles.sideDrawerLogo}/>
                <div className={styles.loginBarSidedrawer}>
                    <LoginBar />
                </div>
            </div>
            <div className={styles.navBarSidedrawer}>
                <Navbar />
            </div>
        </div>
    )
}

export default SideDrawer;
