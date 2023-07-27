import React, { useEffect, useState } from "react";
import styles from './testimonial.module.css';
import { Link } from "react-router-dom";
import Spinner from "../../Others/Spinner/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faStar } from '@fortawesome/free-solid-svg-icons';

const Testimonial = () => {

    const [testimonial, setTestimonial] = useState([]);
    
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    
    const [spinner, setSpinner] = useState(false);

    //fetching testimonial data from the server
    useEffect(() => {
        fetch('https://cyclefixserver.onrender.com/testimonial').then(res => res.json()).then(data => {
            if (data.status === 'success'){
                setSpinner(false);
                setTestimonial(data.data);
            }
        }).catch(err => {
            setSpinner(false);
        })
    }, []);

    //calculating stars based on ratings
    //and pagination system
    let displayRatings = <p className={styles.testimonialP} style={{color: 'lightgray'}}>No comments yet</p>

    const itemToView = 3;
    const totalPage = Math.ceil(testimonial.length / itemToView);

    const calculateStars = (count) => {
        const addStar = 5 - count;

        const calculateStar = Array.from(Array(count).keys()).map(star => {
            return <FontAwesomeIcon key={star} icon={faStar}/>
        });

        const finalCalculation = Array.from(Array(addStar).keys()).map(star => {
            return <FontAwesomeIcon key={star + 6} icon={faStar} style={{color: 'lightgray'}}/>
        })

        return calculateStar.concat(finalCalculation);
    }

    //if there is data in testimonial variable then display it
    if (testimonial.length) {
        displayRatings = testimonial.slice(testimonialIndex*itemToView, (testimonialIndex*itemToView) + itemToView).map(ratings => {
            return <div key={ratings.comment} className={styles.testimonialCard}>
            <p style={{color: 'lightgray'}}>{ratings.comment}</p>       
            <div className={styles.testimonialStars}>
                <h4 className={styles.testimonialH4}>{ratings.name}</h4>
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
        <div className={styles.testimonialMain}>
            <Spinner spinner={spinner} />
            <Link to="/feedback" className={styles.addFeedBack}>
                <p style={{margin: '5px'}}>Add feedback</p>
            </Link>
            <div className={styles.testimonialBackground}>

            </div>

            <div className={styles.testimonialContainer}>
                <h3 className={styles.testimonialH3}>What our client say</h3>
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
    )
}

export default Testimonial;
