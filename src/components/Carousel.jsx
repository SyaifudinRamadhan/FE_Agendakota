import React, { useEffect, useRef, useState } from "react";
import styles from './styles/Carousel.module.css';
import { BiArrowBack } from "react-icons/bi";

const Carousel = ({contents = [], navigatorClasses = [], navigatorStyle = {}, contentStyle = {}, contentClasses = []}) => {
    const [position, setPosition] = useState(0);
    const [pxTranslate, setTranslate] = useState(0);
    const box = useRef(null);
    const classsNamesNav = [styles.Navigator].concat(navigatorClasses);
    
    const handlePrev = () => {
        if(position === 0){
            setPosition(contents.length - 1);
        }else{
            setPosition(position - 1);
        }
    }

    const handleNext = () => {
        if(position === (contents.length - 1) ){
            setPosition(0);
        }else{
            setPosition(position + 1);
        }
    }

    useEffect(() => {
        setTranslate(-(box.current.clientWidth * position));
    }, [position]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setTranslate(-(box.current.clientWidth * position));
        });
    })

    return (<div className={styles.CarouselBox} ref={box}>
        <ul className={styles.Carousel} style={{transform: `translate(${pxTranslate}px, 0px)`}}>
            {contents.map((data, e) => {
                {console.log(data)}
                return (
                <li key={e} className={styles.CarouselInner}>
                    <div>
                        <img style={contentStyle} className={contentClasses.join(' ')} src={data.photo} alt="carousel image" />
                    </div>
                </li>);
            })}
        </ul>
        <div className={classsNamesNav.join(' ')} style={navigatorStyle}>
                <div className={`${styles.ButtonNav} ${styles.ButtonNavLeft}`} onClick={handlePrev}>
                    <BiArrowBack className={styles.IconLeft}/>
                </div>
                <div className={`${styles.ButtonNav} ${styles.ButtonNavRight}`} onClick={handleNext}>
                    <BiArrowBack className={styles.IconRight}/>
                </div>
        </div>
    </div>);
}

export default Carousel;