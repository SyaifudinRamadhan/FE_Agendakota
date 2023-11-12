import React from "react";
import styles from "./styles/PopUp.module.css";
import { BiX, BiXCircle } from "react-icons/bi";

const PopUp = ({content, isActive = false, setActiveFn}) => {
    const closePopUp = () => {
        setActiveFn(false);
    }
    return (
        <div className={styles.Wrapper} style={isActive ? {display: 'block'} : {display: 'none'}}>
            <div className={styles.ModalDialog}>
                <div className={styles.PopUpBox}>
                    <div className={styles.Header}>
                        <h5>Create Organizer</h5>
                        <a href="#" className={styles.CloseButton}>
                            <BiX onClick={closePopUp}/>
                        </a>
                    </div>
                    <div className={styles.Content}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUp;