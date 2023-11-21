import React from 'react';
import styles from "./styles/Footer.module.css";
import { BiCopyright, BiEnvelope, BiPhone } from "react-icons/bi";
import config from "../config";

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div className={styles.Inner}>
                <div className={styles.FooterLeft}>
                    <img src="/images/logo.png" alt="Logo Agendakota" className={styles.Logo} />
                    <div style={{marginBottom: 30}}>
                        Koridor Coworking Space, Siola Lt. 3, Surabaya
                    </div>
                    <a href="mailto:halo@agendakota.id" className={styles.Inline}>
                        <BiEnvelope color={config.primaryColor} size={22} />
                        <div>halo@agendakota.id</div>
                    </a>
                    <a href="tel:+6288990079999" className={styles.Inline}>
                        <BiPhone color={config.primaryColor} size={22} />
                        <div>+62 889 9007 9999</div>
                    </a>
                </div>
                <div className={styles.Column}>
                    <div className={styles.Title}>Product</div>
                    <a href="https://company.agendakota.id/product/virtual-venue/" className={styles.Link} target="_blank">Virtual Venue</a>
                    <a href="https://company.agendakota.id/product/broadcast-studio/" className={styles.Link} target="_blank">Broadcast Studio</a>
                    <a href="https://company.agendakota.id/product/event-marketing/" className={styles.Link} target="_blank">Event Marketing</a>
                    <a href="https://company.agendakota.id/product/event-management/" className={styles.Link} target="_blank">Event Management</a>
                </div>
                <div className={styles.Column}>
                    <div className={styles.Title}>Solutions</div>
                    <a href="https://company.agendakota.id/solutions/virtual-events/" className={styles.Link} target="_blank">Virtual Event</a>
                    <a href="https://company.agendakota.id/solutions/onsite-events/" className={styles.Link} target="_blank">Onsite Event</a>
                    <a href="https://company.agendakota.id/solutions/hybrid-events/" className={styles.Link} target="_blank">Hybrid Event</a>
                    <a href="https://company.agendakota.id/solutions/internal-events/" className={styles.Link} target="_blank">Internal Event</a>
                    <a href="#" className={styles.Link} target="_blank">In-Person Event</a>
                </div>
                <div className={styles.Column}>
                    <div className={styles.Title}>Support</div>
                    <a href="#" className={styles.Link} target="_blank">FAQ</a>
                    <a href="https://company.agendakota.id/news" className={styles.Link} target="_blank">Blog</a>
                    <a href="https://company.agendakota.id/media-partner" className={styles.Link} target="_blank">Media Partner</a>
                    <a href="https://company.agendakota.id/help" className={styles.Link} target="_blank">Help</a>
                    <a href="https://company.agendakota.id/contact" className={styles.Link} target="_blank">Contact</a>
                </div>
            </div>
            <div className={styles.Bottom}>
                <div style={{flexGrow: 1,color: '#666'}}><BiCopyright /> Copyright 2023 Agendakota.id. All rights reserved.</div>
                <a href="#" className={`${styles.Link} ${styles.BottomLink}`}>Privacy</a>
                <a href="#" className={`${styles.Link} ${styles.BottomLink}`}>Terms</a>
            </div>
        </div>
    )
}

export default Footer;