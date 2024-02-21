import React from "react";
import Skeleton from "../styles/Skeleton.module.css";
import style from "../styles/HeaderSkeleton.module.css";

const HeaderBox = () => {
	return <div className={`${Skeleton.Skeleton} ${style.HeaderBox}`}></div>;
};

export default HeaderBox;
