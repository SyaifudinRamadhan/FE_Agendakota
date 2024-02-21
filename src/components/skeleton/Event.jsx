import React, { useEffect, useState } from "react";
import styles from "../styles/Event.module.css";
import Skeleton from "../styles/Skeleton.module.css";
import moment, { locale } from "moment";
import {
	BiCheckCircle,
	BiCopy,
	BiDownArrow,
	BiError,
	BiQuestionMark,
	BiTrash,
	BiUpArrow,
} from "react-icons/bi";
import config from "../../config";
import Button from "../Button";
import PopUp from "../../partials/PopUp";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import Chip from "./Chip";

const Event = ({ style = {}, className = [], forOrganizer = false }) => {
	const classNames = [styles.Event].concat(className);

	return (
		<>
			<div className={classNames.join(" ")} style={style}>
				<div className={`${Skeleton.Skeleton} ${styles.ImgSkeleton}`}></div>
				<div style={{ marginTop: 10 }}>
					<div
						className={`${Skeleton.Skeleton} ${styles.Title} ${styles.TextSkeleton1}`}
					></div>
					<div
						className={`${Skeleton.Skeleton} ${styles.Price} ${styles.TextSkeleton2}`}
					></div>
					<div
						className={`${Skeleton.Skeleton} ${styles.Info} ${styles.TextSkeleton2}`}
					></div>
					<div
						className={`${Skeleton.Skeleton} ${styles.Info} ${styles.TextSkeleton2}`}
					></div>
					<hr className={styles.HrSeparator}></hr>
					{forOrganizer ? (
						<div className={styles.Organizer}>
							<div
								className={`${Skeleton.Skeleton} ${styles.Title} ${styles.TextSkeleton2}`}
							></div>
							<Chip numOfShow={1} />
						</div>
					) : (
						<div className={styles.Organizer}>
							<div
								className={`${Skeleton.Skeleton} ${styles.SkeletonProfileIcon}`}
							></div>
							<div
								className={`${Skeleton.Skeleton} ${styles.Title} ${styles.TextSkeleton1}`}
							></div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Event;
