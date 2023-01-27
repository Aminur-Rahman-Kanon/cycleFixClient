import React, { useEffect, useRef } from 'react';
import styles from './workshopPriceList.module.css';
import { priceList } from '../../Data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faMagnifyingGlass, faSterlingSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DownArrow from '../Others/DownArrow/downArrow';
import workshop from '../../Assets/testWorkshop.jpg';
import Aos from 'aos';

const WorkshopPriceList = () => {

    const arrowRef = useRef(null);

    useEffect(() => {
        Aos.init({duration: 1500, once: true});
    }, [])

    let displayList = Object.values(priceList).map(lists => {
        return <div data-aos = "fade-right" key={lists.h2} className={styles.priceListMain}>
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

                </div>

                <div className={styles.workshopHeaderContainer}>
                    <h2>Cycle Fix Workshop Price List</h2>
                    <p className={styles.headerContainerP}>Here at Cycle Fix London our experienced mechanics are keen to help get you back on the road. We specialise in on-the-spot repairs as well as servicing for all makes and models of bicycle. Below you will find our workshop price list for all repairs and servicing. Please note these costs are for labour only unless otherwise stated.</p>
                    <DownArrow clickHandler={() => arrowRef.current.scrollIntoView(true)}
                    h3="Check the prices below"/>
                </div>
            </div>

            <div className={styles.priceListMainContainer} ref={arrowRef}>
                <h1 className={styles.priceListH1}>Workshop Price List</h1>
                {displayList}
            </div>

            <div className={styles.individualPriceMain}>
                <h1 className={styles.individualHeader}>Individual Repairs Price List</h1>
                <div className={styles.individualPriceTableMain}>
                    <div className={styles.individualPriceColumn}>
                        <div className={styles.individualPriceRow}>
                            <h3>Punctures (Excluding inner tube)</h3>
                            <div className={styles.individualPrices}>
                                <p>Puncture repair (loose wheel) – £5.</p>
                                <p>Puncture repair – £9.</p>
                                <p>Puncture repair Brompton hub motor – £12.</p>
                                <p>Puncture repair (hub gear) – £15.</p>
                                <p>Puncture repair Hub motor wheel from – £15.</p>
                                <p>Puncture repair Cargo Bike from – £15.</p>
                                <p>Puncture repair (hub gear enclosed chain) from – £20.</p>
                                <p>Puncture repair  Xiaomi E-scooter – £20</p>
                            </div>
                        </div>
                        <div className={styles.individualPriceRow}>
                            <h3>Wheels & Tyres</h3>
                            <div className={styles.individualPrices}>
                                <p>Tyre fitting (loose wheel) – £5.</p>
                                <p>Tyre fitting (per tyre) – £9.</p>
                                <p>Tyre fitting (per tyre hub gear) – £15.</p>
                                <p>Wheel truing (per wheel) – £15.</p>
                                <p>Wheel truing & spoke fitting – £20.</p>
                                <p>Hub service / axle fitting – £20.</p>
                                <p>Front wheel fitting – £15 (including brake setup).</p>
                                <p>Rear wheel fitting – £20 (including brake & rear gear setup).</p>
                                <p>Rear wheel fitting – £25 (including brake, rear gear setup & hanger straightening).</p>
                                <p>Wheel build – from £50 (per wheel).</p>
                            </div>
                        </div>

                        <div className={styles.individualPriceRow}>
                            <h3>Bottom Bracket</h3>
                            <div className={styles.individualPrices}>
                                <p>Bottom bracket fitting (cleaned & re-greased) – £25.</p>
                                <p>Bottom bracket service (chasing & facing) – £30.</p>
                                <p>Bottom bracket removal (seized) from – £40.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.individualPriceColumn}>
                        <div className={styles.individualPriceRow}>
                            <h3>Brakes</h3>
                            <div className={styles.individualPrices}>
                                <p>Brake pad fitting (per brake) – £10</p>
                                <p>Brake adjustment (per brake) – £10.</p>
                                <p>External brake cable fitting (per brake) – £10.</p>
                                <p>Internal brake cable fitting (per brake) from – £10.</p>
                                <p>Brake service (1 brake) – £15.</p>
                                <p>Brake service (both brakes) – £25.</p>
                                <p>Disc brake adjustment – £10.</p>
                                <p>Disc brake pad fitting – £10.</p>
                                <p>Disc brake pad & rotor fitting – £15.</p>
                                <p>Disc brake bleed (per brake) – £25.</p>
                            </div>
                        </div>

                        <div className={styles.individualPriceRow}>
                            <h3>Gears & Drivetrain</h3>
                            <div className={styles.individualPrices}>
                                <p>Chain fitting – £10.</p>
                                <p>Gear adjustment (per gear) – £10.</p>
                                <p>External gear cable fitting (per gear) – £10.</p>
                                <p>Internal gear cable fitting (per gear) – from £10.</p>
                                <p>Chain & freewheel fitting (single speed) – £15.</p>
                                <p>Chain & cassette fitting (including rear gear setup) – £20.</p>
                                <p>Hanger straightening (including rear gear setup) – £20.</p>
                                <p>Hanger fitting (including rear gear setup) – £20.</p>
                                <p>Rear mech fitting (including hanger straightening) – £25.</p>
                                <p>Gear service – £25.</p>
                                <p>Gear service with degrease with the removal of chain, cassette, rear mech, front mech & chainset – £35.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.individualPriceColumn}>
                        <div className={styles.individualPriceRow}>
                            <h3>Headers & Handle Bars</h3>
                            <div className={styles.individualPrices}>
                                <p>Bar tape fitting – £10.</p>
                                <p>Handlebar fitting from – £10.</p>
                                <p>Handlebar cutting from – £10.</p>
                                <p>Headset fitting – £25.</p>
                                <p>Headset service (cleaned & regreased) – £25.</p>
                            </div>
                        </div>
                        <div className={styles.individualPriceRow}>
                            <h3>Forks</h3>
                            <div className={styles.individualPrices}>
                                <p>Fork cutting – from £10.</p>
                                <p>Fork fitting (including cutting steerer tube) – £25.</p>
                            </div>
                        </div>
                        <div className={styles.individualPriceRow}>
                            <h3>Other jobs</h3>
                            <div className={styles.individualPrices}>
                                <p>Pedal fitting – £5.</p>
                                <p>Helicoil repair accessorie holes – £10</p>
                                <p>Crank arm Helicoil repair (Per arm) – £40.</p>
                                <p>Rear pannier rack fitting – £10.</p>
                                <p>Full-length mudguard fitting from – £10.</p>
                                <p>Bicycle disassembled for transport – from £25.</p>
                                <p>Bicycle assembly / build – from £25.</p>
                                <p>Bicycle disassembled – from £25.</p>
                                <p>Bicycle damage report – £30.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.notListedJob}>
                    <p className={styles.notListedJobP}>Jobs that are not listed above are quoted at an hourly rate of £50/hour, contact <a href='/contact' className={styles.contact}>Cycle Fix</a> London for more info.</p>
                </div>
            </div>
        </div>
    )
}

export default WorkshopPriceList;
