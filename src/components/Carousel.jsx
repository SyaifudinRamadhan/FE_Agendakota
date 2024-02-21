import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Carousel.module.css";
import { BiArrowBack } from "react-icons/bi";

const Carousel = ({
	contents = [],
	navigatorClasses = [],
	navigatorStyle = {},
	contentStyle = {},
	contentClasses = [],
}) => {
	const [position, setPosition] = useState(0);
	const [pxTranslate, setTranslate] = useState(0);
	const box = useRef(null);
	const classsNamesNav = [styles.Navigator].concat(navigatorClasses);

	const handlePrev = () => {
		try {
			if (position === 0) {
				setPosition(contents.length - 1);
			} else {
				setPosition(position - 1);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleNext = () => {
		try {
			if (position === contents.length - 1) {
				setPosition(0);
			} else {
				setPosition(position + 1);
			}
		} catch (error) {
			console.log(error);
		}
	};

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
				{contents.map((data, e) => {
					{
						// console.log(data);
					}
					return (
						<li key={e} className={styles.CarouselInner}>
							<div>
								<img
									style={contentStyle}
									className={contentClasses.join(" ")}
									src={process.env.REACT_APP_BACKEND_URL + data.photo}
									alt="carousel image"
									onClick={() => {
										window.open(data.url);
									}}
								/>
							</div>
						</li>
					);
				})}
			</ul>
			<div className={classsNamesNav.join(" ")} style={navigatorStyle}>
				<div
					className={`${styles.ButtonNav} ${styles.ButtonNavLeft}`}
					onClick={handlePrev}
				>
					<BiArrowBack className={styles.IconLeft} />
				</div>
				<div
					className={`${styles.ButtonNav} ${styles.ButtonNavRight}`}
					onClick={handleNext}
				>
					<BiArrowBack className={styles.IconRight} />
				</div>
			</div>
		</div>
	);
};

export default Carousel;
