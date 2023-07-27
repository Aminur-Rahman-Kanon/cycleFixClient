import React, { useEffect } from "react";
import styles from './professionalContainer.module.css';
import p1 from '../../../Assets/person1.jpg';
import p2 from '../../../Assets/person2.jpg';
import p3 from '../../../Assets/person3.jpg';
import Aos from "aos";
import 'aos/dist/aos.css';

const ProfessionalContainer = () => {

    useEffect(() => {
        Aos.init({ duration: 1300, once: true })
    }, [])

    return (
        <div className={styles.professionalsMain}>
            <div className={styles.professionalsHeader}>
                <h3 className={styles.professionalsH2}>Meet Our Expert Team</h3>
                <p className={styles.professionalsP}>Today we run the store with a small but knowledgeable team who are passionately committed to their work</p>
            </div>

            <div className={styles.professionalsContainer}>
                <div data-aos="flip-up" className={styles.professionalsImgContainer}>
                    <img src={p1} alt="cycle fix team member 1" className={styles.professionalsContainerImg}/>
                    <div className={styles.professionalsDetails}>
                        <p className={styles.professionalsDetailsP}><strong>Name: </strong>&nbsp;Alex John</p>
                        <p className={styles.professionalsDetailsP}><strong>Age: </strong>&nbsp;25</p>
                        <p className={styles.professionalsDetailsP}><strong>Ttile: </strong>&nbsp;CEO</p>
                    </div>
                </div>

                <div data-aos="flip-up" className={styles.professionalsImgContainer}>
                    <img src={p2} alt="cycle fix team member 2" className={styles.professionalsContainerImg}/>
                    <div className={styles.professionalsDetails}>
                        <p className={styles.professionalsDetailsP}><strong>Name: </strong>&nbsp;Smith Martin</p>
                        <p className={styles.professionalsDetailsP}><strong>Age: </strong>&nbsp;22</p>
                        <p className={styles.professionalsDetailsP}><strong>Ttile: </strong>&nbsp;Manager</p>
                    </div>
                </div>

                <div data-aos="flip-up" className={styles.professionalsImgContainer}>
                    <img src={p3} alt="cycle fix team member 3" className={styles.professionalsContainerImg}/>
                    <div className={styles.professionalsDetails}>
                        <p className={styles.professionalsDetailsP}><strong>Name: </strong>&nbsp;Jonathan Bruno</p>
                        <p className={styles.professionalsDetailsP}><strong>Age: </strong>&nbsp;28</p>
                        <p className={styles.professionalsDetailsP}><strong>Ttile: </strong>&nbsp;Mechanic</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalContainer;
