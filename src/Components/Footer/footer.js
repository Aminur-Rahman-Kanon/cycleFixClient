import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const Footer = () => {

    return (
        <div className={styles.footerMain}>
            <div className={styles.footerContainer}>
                <div className={styles.footerContainerItem}>
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="cycle fix logo" className={styles.logo} />
                    </div>
                    <h3 className={styles.cycleFixHeader}>Cycle Fix</h3>
                    <div className={styles.socialLinks}>
                        <a data-testid="facebook" href="https://www.facebook.com/cyclefixlondon/?locale=en_GB" target="_blank" className={styles.socialLink}>
                            <FontAwesomeIcon icon={faFacebook} className={styles.socialLinkIcon}/>
                        </a>
                        <a data-testid="twitter" href="https://mobile.twitter.com/cyclefixlondon" target="_blank" className={styles.socialLink}>
                            <FontAwesomeIcon icon={faTwitter} className={styles.socialLinkIcon}/>
                        </a>
                        <a data-testid="instagram" href="https://www.instagram.com/cyclefixlondon/?hl=en" target="_blank" className={styles.socialLink}>
                            <FontAwesomeIcon icon={faInstagram} className={styles.socialLinkIcon}/>
                        </a>
                        <a data-testid="youtube" href="#" className={styles.socialLink}>
                            <FontAwesomeIcon icon={faYoutube} className={styles.socialLinkIcon}/>
                        </a>
                    </div>
                </div>

                <div className={styles.footerContainerItem}>
                    <h2 className={styles.footerHeader}>Quick Links</h2>
                    <ul className={styles.quickLinksContainer}>
                        <li className={styles.quickLinksList}><Link to="/" className={styles.quickLinksLink}>Home</Link></li>
                        <li className={styles.quickLinksList}><Link to="/contact/query" className={styles.quickLinksLink}>Contact</Link></li>
                        <li className={styles.quickLinksList}><Link to="/workshop-price-list" className={styles.quickLinksLink}>Services</Link></li>
                        <li className={styles.quickLinksList}><Link to="/book-service" className={styles.quickLinksLink}>Appoinment</Link></li>
                        <li className={styles.quickLinksList}><Link to="/workshop-price-list/individual-price-lists" className={styles.quickLinksLink}>Individual Price List</Link></li>
                        {/* <li className={styles.quickLinksList}><Link to="/courtesy-bike" className={styles.quickLinksLink}>Courtesy Bike</Link></li> */}
                    </ul>
                </div>

                <div className={styles.footerContainerItem}>
                    <h2 className={styles.footerHeader}>Useful Links</h2>
                    <ul className={styles.usefulLinksContainer}>
                        <li className={styles.usefulLinksList}><Link to="#" className={styles.usefulLinksLink}>Terms and Condition</Link></li>
                        <li className={styles.usefulLinksList}><Link to="#" className={styles.usefulLinksLink}>Privacy Policy</Link></li>
                        <li className={styles.usefulLinksList}><Link to="#" className={styles.usefulLinksLink}>Disclaimer</Link></li>
                        <li className={styles.usefulLinksList}><Link to="#" className={styles.usefulLinksLink}>Support</Link></li>
                        <li className={styles.usefulLinksList}><Link to="#" className={styles.usefulLinksLink}>FAQ</Link></li>
                    </ul>
                </div>

                <div className={styles.footerContainerItem}>
                    <div>
                        <h2 className={styles.footerHeader}>Stay Connected</h2>
                        <ul className={styles.stayConnectedLists}>
                            <li className={styles.stayConnectedList}>
                                <a data-testid="location-logo" href="https://google.com/maps/place/Cycle+Fix+London/@51.4865153,-0.1115455,15z/data=!4m5!3m4!1s0x0:0xb267680d2f781652!8m2!3d51.4865153!4d-0.1115455" className={styles.stayConnectedLink} target="_blank">
                                    <FontAwesomeIcon icon={ faLocationDot } className={styles.stayConnectedIcon}/>
                                    <p className={styles.stayConnectedP}>338 Kennington Road, London, SE11 4LD</p>
                                </a>
                            </li>
                            <li className={styles.openingTimesContainer}>
                                <h3 className={styles.openingTimesHeader}>Opening Times</h3>
                                <ul data-testid="opening-times" className={styles.openingTimes}>
                                    <li className={styles.openingTime}>Monday - Friday: 8AM - 8PM</li>
                                    <li className={styles.openingTime}>Saturday: 9AM - 6PM</li>
                                    <li className={styles.openingTime}>Sunday: Closed</li>
                                    <li className={styles.openingTime}>Bank Holidays : Closed</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.copyright}>
                <h3 data-testid="copyright" className={styles.footerTrailerHeader}>Copyright &copy; 2021. All rights reserved</h3>
            </div>
        </div>
    )
}

export default Footer;
