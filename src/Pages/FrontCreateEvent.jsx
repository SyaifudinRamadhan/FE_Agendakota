import React, { useEffect, useState } from "react";
import styles from "./styles/FrontCreateEvent.module.css";
import styles2 from "./styles/CreateEvtAct.module.css";
import PopUp from "../partials/PopUp";
import EditorAddEvtAct from "../partials/EditorAddEvtAct";

const FrontCreateEvent = ({ isLoginBasic }) => {
	const cards = [
		{
			title: "Onsite Event",
			icon: "/images/icon_card_evt1.png",
			active: true,
		},
		{
			title: "Online Event",
			icon: "/images/icon_card_evt2.png",
			active: false,
		},
		{
			title: "Hybrid Event",
			icon: "/images/icon_card_evt3.png",
			active: false,
		},
	];
	const cards2 = [
		{
			title: "Attraction",
			icon: "/images/icon_card_evt4.png",
			active: true,
		},
		{
			title: "Tour Travel",
			icon: "/images/icon_card_evt5.png",
			active: true,
		},
		{
			title: "Daily Activities",
			icon: "/images/icon_card_evt6.png",
			active: true,
		},
	];
	const infoContent = (
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dicta sunt
			animi excepturi accusantium iusto iure quas vel earum unde ipsum
			perspiciatis, consequatur ab. Eligendi dignissimos unde consectetur
			debitis commodi.
		</p>
	);

	const [popUpOpen, setPopUp] = useState(false);
	const [openEditor, setOpenEditor] = useState(null);
	const [isLogin, setLogin] = useState(false);

	useEffect(() => {
		if (isLoginBasic) {
			setLogin(true);
		}
	}, [isLoginBasic]);

	return (
		<div className="content">
			<div className={styles2.DecorationBox}>
				<div className={styles2.Decoration}></div>
			</div>
			{console.log(isLoginBasic, isLogin)}
			{openEditor ? (
				<div className={styles.EditorContent}>
					<EditorAddEvtAct
						forEvtAct={openEditor}
						setForEvtAct={setOpenEditor}
						// eventId={"fda63e9e-5068-4097-b2ca-12115b71f456"}
						selectedOrgId={null}
						isLogin={isLogin}
						fnSetLogin={setLogin}
						typeEditor="front"
					/>
				</div>
			) : (
				<div className={styles2.MainContainer}>
					<PopUp
						isActive={popUpOpen}
						setActiveFn={setPopUp}
						title="Informasi"
						content={infoContent}
					/>
					<div className={styles2.Title}>Create New Event / Activity</div>
					<div className={styles2.SubTitle}>
						Choose what type of event do you want to create
					</div>
					<div className={styles2.ContentCard}>
						{cards.map((card) => (
							<div
								className={`${styles2.CardBox} ${
									card.active === false ? styles2.Disabled : ""
								}`}
								onClick={() => {
									card.active
										? setOpenEditor(
												card.title === "Tour Travel"
													? "Tour Travel (recurring)"
													: card.title
										  )
										: setOpenEditor(null);
								}}
							>
								{card.active === false ? (
									<div className={styles2.Badge}>Coming Soon</div>
								) : (
									<></>
								)}
								<div
									className={styles2.CardContainer}
									style={{ opacity: card.active ? 1 : 0.5 }}
								>
									<div className={styles2.IconCard}>
										<img src={card.icon} alt="" srcset="" />
									</div>
									<div className={styles2.TitleCard}>{card.title}</div>
								</div>
							</div>
						))}
					</div>
					<div style={{ marginTop: "30px", marginBottom: "-10px" }}>OR</div>
					<div className={styles2.ContentCard}>
						{cards2.map((card) => (
							<div
								className={`${styles2.CardBox} ${
									card.active === false ? styles2.Disabled : ""
								}`}
								onClick={() => {
									card.active
										? setOpenEditor(
												card.title === "Tour Travel"
													? "Tour Travel (recurring)"
													: card.title
										  )
										: setOpenEditor(null);
								}}
							>
								{card.active === false ? (
									<div className={styles2.Badge}>Coming Soon</div>
								) : (
									<></>
								)}
								<div
									className={styles2.CardContainer}
									style={{ opacity: card.active ? 1 : 0.5 }}
								>
									<div className={styles2.IconCard}>
										<img src={card.icon} alt="" srcset="" />
									</div>
									<div className={styles2.TitleCard}>{card.title}</div>
								</div>
							</div>
						))}
					</div>
					<div
						className={styles2.OpenNote}
						onClick={() => {
							setPopUp(true);
						}}
					>
						Apa perbedaan dari keenam tipe diatas ?
					</div>
				</div>
			)}
		</div>
	);
};

export default FrontCreateEvent;
