import React from 'react';
import styles from './backdrop.module.css';

const backdrop = (props) => {

    return (
        <div className={styles.backdropMain}
             style={props.backdrop ? {display: 'block'} : {display: 'none'}}
             onClick={() => props.toggleBackdrop()}>
        </div>
    )
}

export default backdrop;
