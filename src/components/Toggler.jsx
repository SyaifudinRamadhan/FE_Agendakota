import React from 'react';
import styles from "./styles/Toggler.module.css";

const Toggler = ({options, value, setValue}) => {
    return (
        <div className={styles.Area}>
            {
                options.map((option, o) => (
                    <div key={o} className={`${styles.Option} ${value === option ? styles.OptionActive: ''}`} onClick={() => {
                        setValue(option)
                    }}>
                        {option}
                    </div>
                ))
            }
        </div>
    )
}

export default Toggler