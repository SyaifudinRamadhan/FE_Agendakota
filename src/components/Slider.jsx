import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Slider.module.css";
import {
  BiArrowBack,
  BiArrowToLeft,
  BiDockLeft,
  BiDockRight,
} from "react-icons/bi";

const Slider = ({
  content,
  style = {},
  className = {},
  navigatorStyle = {},
  navigatorClasses = [],
  distanceCard = 0,
  widthCard = 313,
}) => {
  const mainFrameScroll = useRef(null);
  const sliderBox = useRef(null);
  const [framePosition, setFramePosition] = useState(0);
  const classNames = [styles.Content].concat(className);
  const classsNamesNav = [styles.Navigator].concat(navigatorClasses);

  const handleNext = (framePosition) => {
    try {
      let widthFrame = mainFrameScroll.current.offsetWidth;
      let widthSliderBox = sliderBox.current.clientWidth;
      let valScroll = widthCard + distanceCard;
      if (-framePosition >= widthFrame - widthSliderBox) {
        setFramePosition(0);
      } else {
        let position = framePosition - valScroll;
        if (widthFrame + position <= widthSliderBox) {
          setFramePosition(-(widthFrame - widthSliderBox));
        } else {
          setFramePosition(position);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const hanldePrev = (framePosition) => {
    try {
      let widthFrame = mainFrameScroll.current.offsetWidth;
      let widthSliderBox = sliderBox.current.clientWidth;
      let valScroll = widthCard + distanceCard;
      // console.log(widthFrame, widthSliderBox, valScroll, framePosition);
      if (-framePosition <= 0) {
        setFramePosition(-(widthFrame - widthSliderBox));
      } else {
        if (-framePosition - valScroll <= 0) {
          setFramePosition(0);
        } else {
          setFramePosition(framePosition + valScroll);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleWidth = () => {
    try {
      let widthFrame = mainFrameScroll.current.offsetWidth;
      let widthSliderBox = sliderBox.current.clientWidth;
      if (widthFrame < widthSliderBox) {
        mainFrameScroll.current.style.width = "100%";
      } else {
        mainFrameScroll.current.style.removeProperty("width");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleBasicScroll = ({ type = "left", value = 10, refTarget }) => {
    try {
      let scrollVal = refTarget.current.scrollLeft;

      refTarget.current.scrollLeft += type === "left" ? value : -value;

      if (scrollVal === refTarget.current.scrollLeft && scrollVal > 0) {
        refTarget.current.scrollLeft = 0;
      } else if (
        scrollVal === refTarget.current.scrollLeft &&
        scrollVal === 0
      ) {
        refTarget.current.scrollLeft = refTarget.current.scrollWidth;
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleWidth();
    window.addEventListener("resize", handleWidth);
  });

  return (
    <div className={styles.MainSliderBox}>
      <div className={classsNamesNav.join(" ")} style={navigatorStyle}>
        <div
          className={`${styles.ButtonNav} ${styles.ButtonNavLeft}`}
          onClick={() => {
            // hanldePrev(framePosition);
            handleBasicScroll({
              type: "left",
              value: widthCard,
              refTarget: sliderBox,
            });
          }}
        >
          <BiArrowBack className={styles.IconLeft} />
        </div>
        <div
          className={`${styles.ButtonNav} ${styles.ButtonNavRight}`}
          onClick={() => {
            // handleNext(framePosition);
            handleBasicScroll({
              type: "right",
              value: widthCard,
              refTarget: sliderBox,
            });
          }}
        >
          <BiArrowBack className={styles.IconRight} />
        </div>
      </div>
      <div className={styles.SliderBox} ref={sliderBox}>
        <div
          className={classNames.join(" ")}
          style={{ ...style, transform: `translate(${framePosition}px, 0px)` }}
          ref={mainFrameScroll}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Slider;
