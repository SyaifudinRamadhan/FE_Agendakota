import React, { useEffect, useState } from "react";
import styles from "../styles/CreateEvtAct.module.css";
import PopUp from "../../partials/PopUp";
import EditorAddEvtAct from "../../partials/EditorAddEvtAct";

const CreateEvtAct = ({
	organization,
	isLogin,
	fnSetLogin,
	forEvent = true,
}) => {
	const cards = forEvent
		? [
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
		  ]
		: [
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
	const infoContent = forEvent ? (
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dicta sunt
			animi excepturi accusantium iusto iure quas vel earum unde ipsum
			perspiciatis, consequatur ab. Eligendi dignissimos unde consectetur
			debitis commodi.
		</p>
	) : (
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam laborum
			tempora incidunt alias mollitia. Tempore adipisci magni dolorem numquam
			fugiat. Provident repellat rem dolor consequatur et quae fugit culpa
			deserunt.
		</p>
	);

	const [popUpOpen, setPopUp] = useState(false);
	const [openEditor, setOpenEditor] = useState(null);

	useEffect(() => {
		console.log("use effect landing create evt act");
	});

	return (
		<>
			<div className="content organizer">
				{openEditor ? (
					<EditorAddEvtAct
						forEvtAct={openEditor}
						setForEvtAct={setOpenEditor}
						// eventId={"fda63e9e-5068-4097-b2ca-12115b71f456"}
						selectedOrgId={organization[0].id}
						isLogin={isLogin}
						fnSetLogin={fnSetLogin}
					/>
				) : (
					<div className={styles.MainContainer}>
						<PopUp
							isActive={popUpOpen}
							setActiveFn={setPopUp}
							title="Informasi"
							content={infoContent}
						/>
						<div className={styles.Title}>
							Create New {forEvent ? "Event" : "Activity"}
						</div>
						<div className={styles.SubTitle}>
							Choose what type of event do you want to create
						</div>
						<div className={styles.ContentCard}>
							{cards.map((card) => (
								<div
									className={`${styles.CardBox} ${
										card.active === false ? styles.Disabled : ""
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
										<div className={styles.Badge}>Coming Soon</div>
									) : (
										<></>
									)}
									<div
										className={styles.CardContainer}
										style={{ opacity: card.active ? 1 : 0.5 }}
									>
										<div className={styles.IconCard}>
											<img src={card.icon} alt="" srcset="" />
										</div>
										<div className={styles.TitleCard}>{card.title}</div>
									</div>
								</div>
							))}
						</div>
						<div
							className={styles.OpenNote}
							onClick={() => {
								setPopUp(true);
							}}
						>
							Apa perbedaan dari ketiga tipe {forEvent ? "event" : "activity"} ?
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default CreateEvtAct;
