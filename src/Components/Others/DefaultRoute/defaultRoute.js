import React from "react";
import styles from './defaultRoute.module.css';
import notFound from '../../../Assets/404.png';
import { useNavigate } from 'react-router-dom';

const DefaultRoute = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.defaultRouteMain}>
            <img src={notFound} className={styles.notFound} alt="cycle fix page not found"/>
            <button className={styles.notFoundBtn} onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}

export default DefaultRoute;
