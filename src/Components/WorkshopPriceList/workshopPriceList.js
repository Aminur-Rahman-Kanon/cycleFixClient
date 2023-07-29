import React, { useEffect, useRef } from 'react';
import styles from './workshopPriceList.module.css';
import { priceList } from '../../Data/data';
import ServicesContainer from '../BookAservice/ServiesContainer/servicesContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import DownArrow from '../Others/DownArrow/downArrow';
import Aos from 'aos';
import { Helmet } from 'react-helmet-async';

const WorkshopPriceList = () => {

    const params = useParams();

    const arrowRef = useRef(null);

    const individualPriceListRef = useRef(null);

    //scroll to the top on componentOnMount
    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({duration: 1000, once: true});
    }, [])

    //handling services and individual price lists container scolling to the top
    useEffect(() => {
        if (Object.keys(params).length > 0 && params.hasOwnProperty('services')){
            if (params.services === 'services'){
                arrowRef.current.scrollIntoView(true);
            }
        }

        if (Object.keys(params).length > 0 && params.hasOwnProperty('services')){
            if (params.services === 'individual-price-lists'){
                individualPriceListRef.current.scrollIntoView(true);
            }
        }
    }, [params])

    let displayList = priceList.map(lists => {
        return <div data-aos = "zoom-in" key={lists.h2} className={styles.priceListMain}>
            <div className={styles.priceListBg}>
                <img src={lists.img} alt="Bike repair services" className={styles.priceListBgImg} />
            </div>
            <h2 className={styles.priceListMainH2}>{lists.h2}</h2>
            <div className={styles.poundSignMain}>
                {/* <FontAwesomeIcon icon={ faSterlingSign } className={styles.poundSign}/> */}
                <p className={styles.price}>&pound;{lists.price}</p>
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
                    <Link to={`/book-service/${lists.h2.toLowerCase()}/${lists.price}`} className={styles.bookNowBtn}>Book Now</Link>
                </div>
            </div>
        </div>
    })

    return (
        <>
        <Helmet>
            <title>Cycle fix price list</title>
            <meta name="description" content="cycle repair price list"/>
            <link rel="canonical" href="/workshop-price-list"/>
        </Helmet>
        <div className={styles.workshopMain}>
            <div className={styles.workshopHeader}>
                <div className={styles.workshopHeaderBg}>

                </div>

                <div className={styles.workshopHeaderContainer}>
                    <h1>Workshop Price List</h1>
                    <p className={styles.headerContainerP}>Here at Cycle Fix London our experienced mechanics are keen to help get you back on the road. We specialise in on-the-spot repairs as well as servicing for all makes and models of bicycle. Below you will find our workshop price list for all repairs and servicing. Please note these costs are for labour only unless otherwise stated.</p>
                    <DownArrow clickHandler={() => arrowRef.current.scrollIntoView(true)}
                    h3="Check the prices below"/>
                </div>
            </div>

            <div className={styles.priceListMainContainer} ref={arrowRef}>
                <h2 className={styles.priceListH1}>Workshop Price List</h2>
                <ServicesContainer />
            </div>

            <div className={styles.individualPriceMain} ref={individualPriceListRef}>
                <h2 className={styles.individualHeader}>Individual Repairs Price List</h2>
                <div className={styles.individualPriceTableMain}>
                    <div className={styles.individualPriceColumn}>
                        <div className={styles.individualPriceRow}>
                            <h3 className={styles.individualPriceH3}>Punctures (Excluding inner tube)</h3>
                            <div className={styles.individualPrices}>
                                <p className={styles.individualPriceP}>Puncture repair (loose wheel) – £5.</p>
                                <p className={styles.individualPriceP}>Puncture repair – £9.</p>
                                <p className={styles.individualPriceP}>Puncture repair Brompton hub motor – £12.</p>
                                <p className={styles.individualPriceP}>Puncture repair (hub gear) – £15.</p>
                                <p className={styles.individualPriceP}>Puncture repair Hub motor wheel from – £15.</p>
                                <p className={styles.individualPriceP}>Puncture repair Cargo Bike from – £15.</p>
                                <p className={styles.individualPriceP}>Puncture repair (hub gear enclosed chain) from – £20.</p>
                                <p className={styles.individualPriceP}>Puncture repair  Xiaomi E-scooter – £20</p>
                            </div>
                        </div>
                        <div className={styles.individualPriceRow}>
                            <h3 className={styles.individualPriceH3}>Wheels & Tyres</h3>
                            <div className={styles.individualPrices}>
                                <p className={styles.individualPriceP}>Tyre fitting (loose wheel) – £5.</p>
                                <p className={styles.individualPriceP}>Tyre fitting (per tyre) – £9.</p>
                                <p className={styles.individualPriceP}>Tyre fitting (per tyre hub gear) – £15.</p>
                                <p className={styles.individualPriceP}>Wheel truing (per wheel) – £15.</p>
                                <p className={styles.individualPriceP}>Wheel truing & spoke fitting – £20.</p>
                                <p className={styles.individualPriceP}>Hub service / axle fitting – £20.</p>
                                <p className={styles.individualPriceP}>Front wheel fitting – £15 (including brake setup).</p>
                                <p className={styles.individualPriceP}>Rear wheel fitting – £20 (including brake & rear gear setup).</p>
                                <p className={styles.individualPriceP}>Rear wheel fitting – £25 (including brake, rear gear setup & hanger straightening).</p>
                                <p className={styles.individualPriceP}>Wheel build – from £50 (per wheel).</p>
                            </div>
                        </div>

                        <div className={styles.individualPriceRow}>
                            <h3 className={styles.individualPriceH3}>Bottom Bracket</h3>
                            <div className={styles.individualPrices}>
                                <p className={styles.individualPriceP}>Bottom bracket fitting (cleaned & re-greased) – £25.</p>
                                <p className={styles.individualPriceP}>Bottom bracket service (chasing & facing) – £30.</p>
                                <p className={styles.individualPriceP}>Bottom bracket removal (seized) from – £40.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.individualPriceColumn}>
                        <div className={styles.individualPriceRow}>
                            <h3 className={styles.individualPriceH3}>Brakes</h3>
                            <div className={styles.individualPrices}>
                                <p className={styles.individualPriceP}>Brake pad fitting (per brake) – £10</p>
                                <p className={styles.individualPriceP}>Brake adjustment (per brake) – £10.</p>
                                <p className={styles.individualPriceP}>External brake cable fitting (per brake) – £10.</p>
                                <p className={styles.individualPriceP}>Internal brake cable fitting (per brake) from – £10.</p>
                                <p className={styles.individualPriceP}>Brake service (1 brake) – £15.</p>
                                <p className={styles.individualPriceP}>Brake service (both brakes) – £25.</p>
                                <p className={styles.individualPriceP}>Disc brake adjustment – £10.</p>
                                <p className={styles.individualPriceP}>Disc brake pad fitting – £10.</p>
                                <p className={styles.individualPriceP}>Disc brake pad & rotor fitting – £15.</p>
                                <p className={styles.individualPriceP}>Disc brake bleed (per brake) – £25.</p>
                            </div>
                        </div>

                        <div className={styles.individualPriceRow}>
                            <h3 className={styles.individualPriceH3}>Gears & Drivetrain</h3>
                            <div className={styles.individualPrices}>
                                <p className={styles.individualPriceP}>Chain fitting – £10.</p>
                                <p className={styles.individualPriceP}>Gear adjustment (per gear) – £10.</p>
                                <p className={styles.individualPriceP}>External gear cable fitting (per gear) – £10.</p>
                                <p className={styles.individualPriceP}>Internal gear cable fitting (per gear) – from £10.</p>
                                <p className={styles.individualPriceP}>Chain & freewheel fitting (single speed) – £15.</p>
                                <p className={styles.individualPriceP}>Chain & cassette fitting (including rear gear setup) – £20.</p>
                                <p className={styles.individualPriceP}>Hanger straightening (including rear gear setup) – £20.</p>
                                <p className={styles.individualPriceP}>Hanger fitting (including rear gear setup) – £20.</p>
                                <p className={styles.individualPriceP}>Rear mech fitting (including hanger straightening) – £25.</p>
                                <p className={styles.individualPriceP}>Gear service – £25.</p>
                                <p className={styles.individualPriceP}>Gear service with degrease with the removal of chain, cassette, rear mech, front mech & chainset – £35.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.individualPriceColumn}>
                        <div className={styles.individualPriceRow}>
                            <h3 className={styles.individualPriceH3}>Headers & Handle Bars</h3>
                            <div className={styles.individualPrices}>
                                <p className={styles.individualPriceP}>Bar tape fitting – £10.</p>
                                <p className={styles.individualPriceP}>Handlebar fitting from – £10.</p>
                                <p className={styles.individualPriceP}>Handlebar cutting from – £10.</p>
                                <p className={styles.individualPriceP}>Headset fitting – £25.</p>
                                <p className={styles.individualPriceP}>Headset service (cleaned & regreased) – £25.</p>
                            </div>
                        </div>
                        <div className={styles.individualPriceRow}>
                            <h3 className={styles.individualPriceH3}>Forks</h3>
                            <div className={styles.individualPrices}>
                                <p className={styles.individualPriceP}>Fork cutting – from £10.</p>
                                <p className={styles.individualPriceP}>Fork fitting (including cutting steerer tube) – £25.</p>
                            </div>
                        </div>
                        <div className={styles.individualPriceRow}>
                            <h3 className={styles.individualPriceH3}>Other jobs</h3>
                            <div className={styles.individualPrices}>
                                <p className={styles.individualPriceP}>Pedal fitting – £5.</p>
                                <p className={styles.individualPriceP}>Helicoil repair accessorie holes – £10</p>
                                <p className={styles.individualPriceP}>Crank arm Helicoil repair (Per arm) – £40.</p>
                                <p className={styles.individualPriceP}>Rear pannier rack fitting – £10.</p>
                                <p className={styles.individualPriceP}>Full-length mudguard fitting from – £10.</p>
                                <p className={styles.individualPriceP}>Bicycle disassembled for transport – from £25.</p>
                                <p className={styles.individualPriceP}>Bicycle assembly / build – from £25.</p>
                                <p className={styles.individualPriceP}>Bicycle disassembled – from £25.</p>
                                <p className={styles.individualPriceP}>Bicycle damage report – £30.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.notListedJob}>
                    <p className={styles.notListedJobP}>Jobs that are not listed above are quoted at an hourly rate of £50/hour, contact <a href='/contact' className={styles.contact}>Cycle Fix</a> London for more info.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default WorkshopPriceList;
