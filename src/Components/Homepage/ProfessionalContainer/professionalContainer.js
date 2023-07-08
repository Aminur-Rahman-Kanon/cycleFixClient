import React from "react";
import styles from './professionalContainer.module.css';
import p1 from '../../../Assets/p1.jpg';
import p2 from '../../../Assets/p2.jpeg';
import p3 from '../../../Assets/p3.jpg';

const ProfessionalContainer = () => {
    return (
        <div className={styles.professionalsMain}>
            <div className={styles.professionalsHeader}>
                <h2 className={styles.professionalsH1}>OUR TEAM</h2>
                <h3 className={styles.professionalsH2}>Meet Our Expert Team</h3>
                <p className={styles.professionalsP}>Today we run the store with a small but knowledgeable team who are passionately committed to their work</p>
            </div>

            <div className={styles.professionalsContainer}>
                <div className={styles.professionalsImgContainer}>
                    <img src={p1} alt="cycle fix team member" className={styles.professionalsContainerImg}/>
                </div>

                <div className={styles.professionalsImgContainer}>
                    <img src={p2} alt="cycle fix team member" className={styles.professionalsContainerImg}/>
                </div>

                <div className={styles.professionalsImgContainer}>
                    <img src={p3} alt="cycle fix team member" className={styles.professionalsContainerImg}/>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalContainer;
