import React from 'react';
import styles from "./styles/InfoCard.module.css";

const InfoCard = ({title, description, action = null}) => {
    return (
        <div className={styles.Card}>
            <div className={styles.Circle}></div>
            <div className={styles.Title}>{title}</div>
            <div className={styles.Description}>{description}</div>
            {
                action !== null &&
                <div style={{display: 'flex',flexDirection: 'row'}}>
                    <a href={action.link} className={styles.Button} target={action.target}>
                        {action.text}
                    </a>
                </div>
            }
        </div>
    )
}

export default InfoCard;