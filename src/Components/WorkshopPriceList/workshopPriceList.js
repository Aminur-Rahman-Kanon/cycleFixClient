import React, { useEffect, useRef } from 'react';
import styles from './workshopPriceList.module.css';
import { priceList } from '../../Data/data';
import clipboard from '../../Assets/clipboard.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faScrewdriverWrench, faMagnifyingGlass, faSterlingSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const WorkshopPriceList = () => {

    const arrowRef = useRef(null);

    let displayList = Object.values(priceList).map(lists => {
        return <div key={lists.h2} className={styles.priceListMain}>
            <h2 className={styles.priceListMainH2}>{lists.h2}</h2>
            <div className={styles.poundSignMain}>
                <FontAwesomeIcon icon={ faSterlingSign } className={styles.poundSign}/>
                <p className={styles.price}>{lists.price}</p>
            </div>
            <div className={styles.priceListsContainer}>
                <div className={styles.priceListsContainer1}>
                    <div className={styles.priceLists}>
                        {lists.list.map((list, index) => {
                            if (index === 0){
                                return <div key={index} className={styles.priceList}>
                                    <FontAwesomeIcon icon={ faMagnifyingGlass } className={styles.priceListIcon} />
                                    <p className={styles.priceListP}>{list}</p>
                                </div>
                            }
                            else {
                                return <div key={index+16} className={styles.priceList}>
                                    <FontAwesomeIcon icon={ faScrewdriverWrench } className={styles.priceListIcon} />
                                    <p className={styles.priceListP}>{list}</p>
                                </div>
                            }
                        })}
                    </div>
                </div>

                <div className={styles.priceListsContainer2}>
                    <h3 className={styles.bookNowH3}>Book For This Service !</h3>
                    <Link to="#" className={styles.bookNowBtn}>Book Now</Link>
                </div>
            </div>
        </div>
    })

    return (
        <div className={styles.workshopMain}>
            <div className={styles.workshopHeader}>
                <div className={styles.workshopHeaderBg}>
                    <img src={clipboard} className={styles.workshopHeaderImg}/>
                </div>

                <div className={styles.workshopHeaderContainer}>
                    <h2>Cycle Fix Workshop Price List</h2>
                    <p className={styles.headerContainerP}>Here at Cycle Fix London our experienced mechanics are keen to help get you back on the road. We specialise in on-the-spot repairs as well as servicing for all makes and models of bicycle. Below you will find our workshop price list for all repairs and servicing. Please note these costs are for labour only unless otherwise stated.</p>
                    <div className={styles.downArrowContainer}>
                        <h3>Check the price list below</h3>
                        <div className={styles.downArrowMain} onClick={() => arrowRef.current.scrollIntoView(true)}>
                            <FontAwesomeIcon icon={faCircleDown} className={styles.downArrow}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.priceListMainContainer} ref={arrowRef}>
                <h1 className={styles.priceListH1}>Workshop Price List</h1>
                {displayList}
            </div>
        </div>
    )
}

export default WorkshopPriceList;
