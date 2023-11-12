import React from "react";
import styles from './styles/CardBasic.module.css';
import config from "../config";

const CardBasic = ({className = [], style = {}, data = {info : "", title: "", cover : "", desc: ""}}) => {
    const classNames = [styles.Card].concat(className);
    return (
        <div className={classNames.join(" ")} style={style}>
            <img src={data.cover} descalt={data.title} className={styles.Cover} style={config !== null && config.hasOwnProperty('coverStyle') ? config.coverStyle : null} />
            <div style={{marginTop: 10}}>
                <div className={styles.Info}>{data.info}</div>
                <div className={styles.Title}>{data.title}</div>
                <div className={styles.Info}>{data.desc}</div>
            </div>
        </div>
    );
}

export default CardBasic;