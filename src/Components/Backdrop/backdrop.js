import React from 'react';
import styles from './backdrop.module.css';

const backdrop = ({ backdrop, toggleBackdrop }) => {

    return (
        <div data-testid="backdrop" className={styles.backdropMain}
             style={backdrop ? {display: 'block'} : {display: 'none'}}
             onClick={() => toggleBackdrop()}>
        </div>
    )
}

export default backdrop;
