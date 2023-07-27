import React from "react";
import logo from '../../../Assets/logo.png';
import Navbar from "../Navbar/navbar";
import LoginBar from "../LoginBar/loginBar";
import DrawToggle from "../DrawToggle/drawToggle";
import styles from './topbar.module.css';
import { Link } from "react-router-dom";

const Topbar = (props) => {

    return (
        <div className={styles.topbarMain}>
            <Link to="/" className={styles.homeLink}>
                <img src={logo} alt="cycle fix logo" className={styles.logo} />
            </Link>
            <div className={styles.toggleElements} data-testid="navbar-container">
                <Navbar />
                <LoginBar />
            </div>
            <DrawToggle toggleSidedrawer={ props.toggleSideDrawer }/>
        </div>
    )
}

export default Topbar;
