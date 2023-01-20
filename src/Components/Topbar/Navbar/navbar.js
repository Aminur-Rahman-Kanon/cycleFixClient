import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {

    return (
        <div className={styles.navbarMain}>
            <ul className={styles.navbarContainer}>
                <li className={styles.navbarItem}><NavLink to="/" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Home</NavLink></li>
                <li className={styles.navbarItem}><NavLink to="/cycling-accident" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Cycling Accident</NavLink></li>
                <li className={styles.navbarItem}><NavLink to="/booking" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Book A Service</NavLink></li>
                <li className={styles.navbarItem}><NavLink to="/workshop-price-list"  className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Workshop Price List</NavLink></li>
                <li className={styles.navbarItem}><NavLink to="/e-scooter" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Xiaomi E-Scooter</NavLink></li>
                <li className={styles.navbarItem}><NavLink to="/courtesyBike" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Courtesy Bike</NavLink></li>
                <li className={styles.navbarItem}><NavLink to="/contact" className={({isActive}) => isActive ? styles.navActive : styles.navItem}>Contact</NavLink></li>
            </ul>
        </div>
    )
}


export default Navbar;
