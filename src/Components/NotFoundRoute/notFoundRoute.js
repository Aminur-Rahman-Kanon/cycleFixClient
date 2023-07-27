import React from "react";
import styles from './notFoundRoute.module.css';
import notFound from '../../Assets/404.png';
import { useNavigate } from 'react-router-dom';

const NotFoundRoute = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.defaultRouteMain}>
            <img src={notFound} className={styles.notFound} alt="cycle fix page not found"/>
            <button className={styles.notFoundBtn} onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}

export default NotFoundRoute;
