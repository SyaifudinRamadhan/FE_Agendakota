import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Carousel.module.css";
import Skeleton from "../styles/Skeleton.module.css";
import { BiArrowBack } from "react-icons/bi";

const Carousel = ({ contentStyle = {}, contentClasses = [] }) => {
	const [position, setPosition] = useState(0);
	const [pxTranslate, setTranslate] = useState(0);
	const box = useRef(null);

	useEffect(() => {
		try {
			setTranslate(-(box.current.clientWidth * position));
		} catch (error) {
			console.log(error);
		}
	}, [position]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			try {
				setTranslate(-(box.current.clientWidth * position));
			} catch (error) {
				console.log(error);
			}
		});
	});

	return (
		<div className={styles.CarouselBox} ref={box}>
			<ul
				className={styles.Carousel}
				style={{ transform: `translate(${pxTranslate}px, 0px)` }}
			>
				<li className={styles.CarouselInner}>
					<div>
						<div
							className={`${styles.Skeleton} ${Skeleton.Skeleton}`}
							alt="carousel image"
						/>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Carousel;
