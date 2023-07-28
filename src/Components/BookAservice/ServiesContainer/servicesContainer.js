import React, { useState } from 'react';
import styles from './servicesContainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faAnglesUp ,faMagnifyingGlass, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { priceList } from '../../../Data/data';
import { Link } from 'react-router-dom';

function ServicesContainer() {

    const [expandIcon, setExpandIcon] = useState(false);

    const [itemName, setItemName] = useState('');

    let display = <h4>No information</h4>;

    //if pricelist contains data then display it
    if (priceList.length) {
        display = priceList.map(item => {
            return <div key={item.h2} className={styles.chooseServicesCards}>
                <div className={styles.chooseServicesCard}>
                    <div className={styles.chooseServicesImgContainer}>
                        <img src={item.img} alt={item.h2} className={styles.chooseServicesImg} />
                    </div>
                    <div className={styles.chooseServicesPriceContainer}>
                        <div className={styles.chooseServicesInfo}>
                            <h2 className={styles.chooseServicesH2}>{item.h2}</h2>
                            <p className={styles.chooseServicesP}>{item.p}</p>
                        </div>
                        <p className={styles.price}>&pound;{item.price}</p>
                        <Link to = {`/book-service/${item.h2}/${item.price}`} className={styles.selectLink}>Select {item.h2}</Link>
                    </div>
    
                </div>
                <div className={styles.chooseServicesInfoContainer}>
                    <div className={styles.chooseServicesIncludedMain}>
                        <p className={styles.included} style={expandIcon && itemName === item.h2 ? {display: 'none'} : {display: 'block', color: '#4c8ed7'}}>What included?</p>
                        <button data-testid="expand-button"
                                className={styles.expandButton}
                                style={!expandIcon || itemName !== item.h2 ? {display: 'block'} : {display: 'none'}}
                                onClick={() => {
                                                setExpandIcon(true)
                                                setItemName(item.h2);
                                            }}>
                            <FontAwesomeIcon icon={ faAnglesDown } className={styles.chooseServicesIcon}/>
                        </button>
                        <div data-testid="expand-menu" className={expandIcon && itemName === item.h2 ? styles.chooseServicesIncluded : `${styles.chooseServicesIncluded} ${styles.chooseServicesIncludedOff}`}>
                            {item.list.map((service, index) => {
                                return <div key={ item.list[index] } className={styles.chooseService}>
                                    <FontAwesomeIcon icon={ index === 0 ? faMagnifyingGlass : faScrewdriverWrench } className={styles.chooseServiceIcon}/>
                                    <p className={styles.service}>{service}</p>
                                </div>
                            })}
                            <div className={styles.collapseIconContainer}>
                                <FontAwesomeIcon icon={ faAnglesUp }
                                                    className={ styles.chooseServicesIcon }
                                                    style={expandIcon && itemName === item.h2 ? {visibility: 'visible'} : {visibility: 'hidden'}}
                                                    onClick={() => {
                                                    setExpandIcon(false)
                                                    setItemName(item.h2);
                                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        });
    }

    return display;
}

export default ServicesContainer;
