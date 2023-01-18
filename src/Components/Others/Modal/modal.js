import React from "react";
import ReactDom from 'react-dom';
import styles from './modal.module.css';

const modal = (props) => {

    if (!props.switch) return;

    return ReactDom.createPortal(
        <div className={styles.modalMain}>
            {props.children}
        </div>,
        document.getElementById('portal')
    )
}

export default modal;
