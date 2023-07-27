import React from 'react';
import styles from './createStar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function CreateStar ({ rating, changeRating }) {
    if (!rating) return Array.from(Array(5).keys()).map((star, index) => 
    <div data-testid="inactive-star" key={index}>
        <FontAwesomeIcon icon={faStar}
                         className={styles.inActiveStar}
                         onClick={() => changeRating(index + 1)} />
    </div>)

    const totalStar = 5 - rating;
    
    const activeStar = Array.from(Array(rating).keys()).map((item, index) => 
    <div data-testid="active-star" key={index}>
        <FontAwesomeIcon icon={faStar} className={styles.activeStar} />
    </div>)
    
    const inActiveStar = Array.from(Array(totalStar).keys()).map((item, index) => 
    <div data-testid="inactive-star" key={index + 5}>
        <FontAwesomeIcon icon={faStar} className={styles.inActiveStar} style={{cursor: 'default'}} />
    </div>)
    
    return activeStar.concat(inActiveStar);
}

export default CreateStar;
