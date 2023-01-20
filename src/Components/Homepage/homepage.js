import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faPersonBiking, faPersonDigging, faCircleExclamation, faMotorcycle, faChargingStation, faStar, faAngleLeft, faAngleRight, faLocationPin, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import bg2 from '../../Assets/bg2.jpg';
import Aos from "aos";
import 'aos/dist/aos.css';
import xiaomi from '../../Assets/xiaomi.png';
import p1 from '../../Assets/p1.jpg';
import p2 from '../../Assets/p2.jpeg';
import p3 from '../../Assets/p3.jpg';
import styles from './homepage.module.css';

const Homepage = () => {

    const [testimonial, setTestimonial] = useState([]);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    useEffect(() => {
        Aos.init({duration: '1500', once: true});
        
        fetch('http://localhost:8000/testimonial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setTestimonial(data.data))
        .catch(err => console.log(err))
        
    }, [])

    //Testimonial calculation
    let displayRatings = null;
    const itemToView = 3;
    const totalPage = Math.ceil(testimonial.length / itemToView);

    const calculateStars = (count) => {
        const addStar = 5 - count;

        const calculateStar = Array.from(Array(count).keys()).map(star => {
            return <FontAwesomeIcon key={star} icon={faStar}/>
        });

        const finalCalculation = Array.from(Array(addStar).keys()).map((star, index) => {
            return <FontAwesomeIcon key={star + 6} icon={faStar} style={{color: 'lightgray'}}/>
        })

        return calculateStar.concat(finalCalculation);
    }

    if (testimonial !== null) {
        displayRatings = testimonial.slice(testimonialIndex*itemToView, (testimonialIndex*itemToView) + itemToView).map(ratings => {
            return <div key={ratings.comment} className={styles.testimonialCard}>
            <p>{ratings.comment}</p>       
            <div className={styles.testimonialStars}>
                <h2>{ratings.name}</h2>
                {Number(ratings.rating) === 5 ? Array.from(Array(Number(ratings.rating)).keys()).map((star, index) => {
                    return <FontAwesomeIcon key={index + 12} icon={faStar} className={styles.testimonialStar}/>
                })
                : calculateStars(Number(ratings.rating))
                }
            </div>
        </div>
        })
    }

    return (
        <div className={styles.homepageMain}>
            <div className={styles.headerContainer1}>
                <div className={styles.headerContainer1Card}>
                    <h1 className={styles.headerContainer1H1}>Your Reliable Local Bicycle Repair Shop</h1>
                    <div className={styles.headerContainer1Banner}>
                        <h2 className={styles.headerContainer1H2}>Repair</h2>
                        <h2 className={styles.headerContainer1H2}>Accessories</h2>
                        <h2 className={styles.headerContainer1H2}>Service</h2>
                    </div>
                    <div className={styles.headerContainer1Btn}>
                        <p className={styles.bookingBtnP}>Book A Service</p>
                        <FontAwesomeIcon icon={ faScrewdriverWrench } className={styles.screwDriver}/>
                    </div>
                </div>
            </div>

            <div className={styles.headerContainer2}>
                <div className={styles.headerContainer2Part1} >
                    <img src={bg2} className={styles.headerContainer2Img}/>
                </div>

                <div data-aos="fade-left" className={styles.headerContainer2Part2}>
                    <h2 className={styles.headerContainer2H2}>Bicycle Workshop</h2>
                    <h1 className={styles.headerContainer2H1}>Servicing & Repair</h1>
                    <p className={styles.headerContainer2P}>Are you in need of urgent bike repairs in the London area? If so, then you should choose Cycle Fix for your local bicycle repair shop.
                       At Cycle Fix we aim to service and repair your bike quickly so you can get right back to cycling. “Walk in, ride out” is the motto of our bike repair shop. We will do all we can to ensure your bike returns to you in perfect working order.
                       No matter how complex the repair job, our passionate team have the engineering know-how to find the best solution. We are proud of our service to the community as your local bike shop.
                       Here at Cycle Fix we aim to provide an on-the-spot repair wherever possible. Our motto is “walk in, ride out” and we go out of our way to provide a solution to get you back on your bike. We service all types of bikes and we also pride ourselves in engineering solutions for your complex bike repair problems.
                    </p>
                </div>
            </div>

            <div className={styles.headerContainer3Main}>
                <div className={styles.headerContainer3ImgContainer}>
                    <div className={styles.headerContainer3Cards}>
                        <div data-aos="fade-right" className={styles.headerContainer3Header}>
                            <h2 className={styles.headerContainer3Header3H2}>Our Services</h2>
                            <h1 className={styles.headerContainer3Header3H1}>Your Reliable Local Bicycle Repair Shop</h1>
                            <p className={styles.headerContainer3HeaderP}>Among the services we offer at our bicycle repair shop, foremost is our servicing and repair options. From a simple safety check to a complete rebuild, we will thoroughly assess your bike and let you know what we need to do.</p>
                        </div>

                        <div data-aos="fade-left" className={styles.headerContainer3Services}>
                            <div className={styles.headerContainer3Service}>
                                <FontAwesomeIcon icon={ faCircleExclamation } className={styles.headerContainer3ServiceIcon} />
                                <h2 className={styles.headerContainer3H2}>Walk in Ride out</h2>
                                <p>Here at Cycle Fix we aim to provide an on-the-spot repair wherever possible. Our motto is “walk in, ride out” and we go out of our way to provide a solution to get you back on your bike. </p>
                            </div>

                            <div className={styles.headerContainer3Service}>
                                <FontAwesomeIcon icon={ faScrewdriverWrench } className={styles.headerContainer3ServiceIcon} />
                                <h2 className={styles.headerContainer3H2}>Wide range of stocks</h2>
                                <p>We have a specialist custom spoke cutter and a new threading tool to repair your damaged cranks. This can save valuable time and hundreds of pounds for our customers.</p>
                            </div>

                            <div className={styles.headerContainer3Service}>
                                <FontAwesomeIcon icon={ faPersonDigging } className={styles.headerContainer3ServiceIcon} />
                                <h2 className={styles.headerContainer3H2}>Experienced professional</h2>
                                <p>knowledgeable team who are passionately committed to their work. We pride ourselves on our dedication to customer satisfaction</p>
                            </div>

                            <div className={styles.headerContainer3Service}>
                                <FontAwesomeIcon icon={ faChargingStation } className={styles.headerContainer3ServiceIcon} />
                                <h2 className={styles.headerContainer3H2}>Accessories</h2>
                                <p>Whether you’re a professional rider or casual biker. The unrivalled choice of bike accessories includes everything you need to make cycling more fun from some of the world's biggest brands.</p>
                            </div>

                            <div className={styles.headerContainer3Service}>
                                <FontAwesomeIcon icon={ faPersonBiking} className={styles.headerContainer3ServiceIcon} />
                                <h2 className={styles.headerContainer3H2}>Courtesy bike</h2>
                                <p>Our courtesy bikes are high quality hybrid Trek bikes which are both comfortable and easy to ride. All our bikes have a safety check after each use.</p>
                            </div>

                            <div className={styles.headerContainer3Service}>
                                <FontAwesomeIcon icon={ faMotorcycle } className={styles.headerContainer3ServiceIcon} />
                                <h2 className={styles.headerContainer3H2}>Xiaomi E-scooter</h2>
                                <p>We specialise in repairing the popular Xiaomi M365 electric scooters</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.xiaomiMain}>
                <div data-aos = "fade-up-left" className={styles.xiaomiContainer}>
                    <h1 className={styles.xiaomiH1}>Xiaomi Electric Scooter Repair Services</h1>
                    <h2 className={styles.xiaomiH2}>We specialise in repairing the popular Xiaomi M365 electric scooters</h2>
                    <button className={styles.xiaomiBtn}>Explore</button>
                </div>

                <div data-aos = "fade-up-right" className={styles.xiaomiImgContainer}>
                    <img src={xiaomi} className={styles.xiaomiImg} />
                </div>
            </div>

            <div className={styles.testimonialMain}>
                <div className={styles.testimonialBackground}>

                </div>

                <div className={styles.testimonialContainer}>
                    <div className={styles.testimonialHeader}>
                        <h1>Testomonials</h1>
                        <h2>What our client say</h2>
                    </div>

                    <div className={styles.testimonialCards}>
                        { displayRatings }
                    </div>

                    <div className={styles.testimonialPaginationMain}>
                        <div className={styles.testimonialPaginationContainer}>
                            <button onClick={() => setTestimonialIndex(testimonialIndex - 1)}
                                    disabled={testimonialIndex <= 0}
                                    className={styles.testimonialBtn}>
                                <FontAwesomeIcon icon={ faAngleLeft } className={styles.testimonialPaginationArrow}/>
                            </button>

                            <button className={styles.testimonialBtn}
                                    disabled={testimonialIndex + 1 >= totalPage}
                                    onClick={() => setTestimonialIndex(testimonialIndex + 1)}
                                    >
                                <FontAwesomeIcon icon={ faAngleRight } className={styles.testimonialPaginationArrow} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.professionalsMain}>
                <div className={styles.professionalsHeader}>
                    <h1 className={styles.professionalsH1}>OUR TEAM</h1>
                    <h2 className={styles.professionalsH2}>Meet Our Expert Team</h2>
                    <p className={styles.professionalsP}>Today we run the store with a small but knowledgeable team who are passionately committed to their work</p>
                </div>

                <div className={styles.professionalsContainer}>
                    <div className={styles.professionalsImgContainer}>
                        <img src={p1} className={styles.professionalsContainerImg}/>
                    </div>

                    <div className={styles.professionalsImgContainer}>
                        <img src={p2} className={styles.professionalsContainerImg}/>
                    </div>

                    <div className={styles.professionalsImgContainer}>
                        <img src={p3} className={styles.professionalsContainerImg}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
