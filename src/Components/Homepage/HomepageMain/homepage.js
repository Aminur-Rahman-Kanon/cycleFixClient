import React, { useEffect, useState, useRef } from "react";
import styles from './homepage.module.css';
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/banner";
import HeaderContainer1 from "../HeaderContainer1/headerContainer1";
import HeaderContainer2 from "../HeaderContainer2/headerContainer2";
import Xiaomi from "../Xiaomi/xiaomi";
import Testimonial from "../Testimonial/testimonial";
import ProfessionalContainer from "../ProfessionalContainer/professionalContainer";
import AboutContainer from "../AboutContainer/aboutContainer";

const Homepage = () => {

    const aboutUs = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
        {/*Helmet header for google to crawl*/}
        <Helmet>
            <title>Cycle fix</title>
            <meta name="description" content="Bicycle repair shop"/>
            <link rel="canonical" href="/"/>
        </Helmet>
        <div className={styles.homepageMain}>
            <Banner />
            <HeaderContainer1 aboutUsRef={aboutUs}/>
            <HeaderContainer2 />
            <Xiaomi />
            <Testimonial />
            <ProfessionalContainer />
            <AboutContainer aboutUsRef={aboutUs}/>
        </div>
        </>
    )
}

export default Homepage;
