import React from "react";
import { useLocation } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {

    const location = useLocation().pathname;

    console.log(location);

    return (
        <div className={styles.navbarMain}>
            <ul className={styles.navbarContainer}>
                <li className={styles.navbarItem}><a href="/" className={location === '/' ? styles.navActive : styles.navItem}>Home</a></li>
                <li className={styles.navbarItem}><a href="/cycling-accident" className={location === '/cycling-accident' ? styles.navActive : styles.navItem}>Cycling Accident</a></li>
                <li className={styles.navbarItem}><a href="/booking" className={location === '/booking' ? styles.navActive : styles.navItem}>Book A Service</a></li>
                <li className={styles.navbarItem}><a href="/workshop-price-list" className={location === '/workshop-price-list' ? styles.navActive : styles.navItem}>Workshop Price List</a></li>
                <li className={styles.navbarItem}><a href="/e-scooter" className={location === 'e-scooter' ? styles.navActive : styles.navItem}>Xiaomi E-Scooter</a></li>
                <li className={styles.navbarItem}><a href="/courtesy-bike" className={location === 'courtesy-bike' ? styles.navActive : styles.navItem}>Courtesy Bike</a></li>
                <li className={styles.navbarItem}><a href="/contact" className={location === '/contact' ? styles.navActive : styles.navItem}>Contact</a></li>
            </ul>
        </div>
    )
}


export default Navbar;
