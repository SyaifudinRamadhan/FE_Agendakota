import React, { useEffect, useRef, useState } from "react";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import styles from "../styles/PersonalEvent.module.css";
import styles2 from "../styles/Team.module.css";
import CardProfile from "../../components/CardProfile";
import Button from "../../components/Button";
import CardBasic from "../../components/CardBasic";
import {
	BiCheckCircle,
	BiError,
	BiPlusCircle,
	BiQuestionMark,
	BiTrash,
} from "react-icons/bi";
import PopUp from "../../partials/PopUp";
import Loading from "../../components/Loading";
import InputForm from "../../components/InputForm";

const OrganizerTeam = () => {
	const [orgSelected, setOrgSelected] = useState(null);
	const [popUpActive, setPopUpActive] = useState(false);
	const [popUpTitle, setPopUpTitle] = useState("");
	const [popUpContent, setPopUpContent] = useState(<></>);
	const [popUpLoading, setPopUPLoading] = useState(false);

	const emailTarget = useRef(null);

	const teams = [
		{
			id: "9a26ceca-2536-4d2e-bd76-04e51c7dc720",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			user_id: "9a26b3ed-aa1f-45f2-b4b7-bf0649a8f466",
			created_at: "2023-09-17T01:38:07.000000Z",
			updated_at: "2023-09-17T01:38:07.000000Z",
			user: {
				id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				f_name: "Ahmad",
				l_name: "Syaifudin",
				name: "ASR",
				email: "syaifudinramadhan@gmail.com",
				email_verified_at: null,
				g_id: "112668041094238806306",
				photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
				is_active: "1",
				phone: "088217466532",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				created_at: "2023-09-17T00:39:25.000000Z",
				updated_at: "2023-09-17T00:59:07.000000Z",
			},
		},
		{
			id: "9a26ceca-2536-4d2e-bd76-04e51c7dc720",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			user_id: "9a26b3ed-aa1f-45f2-b4b7-bf0649a8f466",
			created_at: "2023-09-17T01:38:07.000000Z",
			updated_at: "2023-09-17T01:38:07.000000Z",
			user: {
				id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				f_name: "Ahmad",
				l_name: "Syaifudin",
				name: "ASR",
				email: "syaifudinramadhan@gmail.com",
				email_verified_at: null,
				g_id: "112668041094238806306",
				photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
				is_active: "1",
				phone: "088217466532",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				created_at: "2023-09-17T00:39:25.000000Z",
				updated_at: "2023-09-17T00:59:07.000000Z",
			},
		},
		{
			id: "9a26ceca-2536-4d2e-bd76-04e51c7dc720",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			user_id: "9a26b3ed-aa1f-45f2-b4b7-bf0649a8f466",
			created_at: "2023-09-17T01:38:07.000000Z",
			updated_at: "2023-09-17T01:38:07.000000Z",
			user: {
				id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				f_name: "Ahmad",
				l_name: "Syaifudin",
				name: "ASR",
				email: "syaifudinramadhan@gmail.com",
				email_verified_at: null,
				g_id: "112668041094238806306",
				photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
				is_active: "1",
				phone: "088217466532",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				created_at: "2023-09-17T00:39:25.000000Z",
				updated_at: "2023-09-17T00:59:07.000000Z",
			},
		},
		{
			id: "9a26ceca-2536-4d2e-bd76-04e51c7dc720",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			user_id: "9a26b3ed-aa1f-45f2-b4b7-bf0649a8f466",
			created_at: "2023-09-17T01:38:07.000000Z",
			updated_at: "2023-09-17T01:38:07.000000Z",
			user: {
				id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				f_name: "Ahmad",
				l_name: "Syaifudin",
				name: "ASR",
				email: "syaifudinramadhan@gmail.com",
				email_verified_at: null,
				g_id: "112668041094238806306",
				photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
				is_active: "1",
				phone: "088217466532",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				created_at: "2023-09-17T00:39:25.000000Z",
				updated_at: "2023-09-17T00:59:07.000000Z",
			},
		},
	];

	const dummyLoad = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, 3000);
		});
	};

	const handleOpenDelete = (id) => {
		setPopUpContent(
			<>
				<div className={styles2.PopUpText}>
					Apakah kamu ingin menghapus salah satu anggota mu ?
				</div>
				<BiQuestionMark
					className={styles2.IconPopUp}
					color={"rgb(202, 12, 100"}
				/>
				<div className={styles2.FormControl}>
					<Button
						title={"Hapus"}
						center={true}
						fnOnClick={() => {
							handleDelete(id);
						}}
					/>
					<Button
						title={"Batal"}
						bgColor={"white"}
						textColor={"rgb(202, 12, 100"}
						center={true}
						fnOnClick={handleCancel}
					/>
				</div>
			</>
		);
		setPopUpTitle("Hapus Member");
		setPopUpActive(true);
	};

	const handleDelete = (id) => {
		setPopUPLoading(true);
		dummyLoad().then((res) => {
			res
				? setPopUpContent(
						<>
							<div className={styles2.PopUpText}>
								Data anggota team berhasil dihapus
							</div>
							<BiCheckCircle color="green" className={styles2.IconPopUp} />
						</>
				  )
				: setPopUpContent(
						<>
							<div className={styles2.PopUpText}>
								Data gagal dihapus. Coba lagi !
							</div>
							<BiError className={styles2.IconPopUp} color="#CA0C64" />
						</>
				  );
			setPopUPLoading(false);
			// fn reload data teams
			setTimeout(() => {
				setPopUpContent(<></>);
				setPopUpActive(false);
			}, 3000);
		});
	};

	const handleOpenAdd = () => {
		setPopUpContent(
			<form onSubmit={handleAddMember}>
				<div className={styles2.InputForm}>
					<label>Email Tujuan :</label>
					<InputForm
						type={"text"}
						placeholder={"Input alamat email temanmu !"}
						refData={emailTarget}
					/>
				</div>
				<div className={styles2.FormControl}>
					<Button title={"Submit"} typeBtn="submit" center={true} />
					<Button
						title={"Batal"}
						bgColor={"white"}
						textColor={"rgb(202, 12, 100"}
						center={true}
						fnOnClick={handleCancel}
					/>
				</div>
			</form>
		);
		setPopUpTitle("Tambah Anggota");
		setPopUpActive(true);
	};

	const handleAddMember = () => {
		if (
			!emailTarget.current.value ||
			emailTarget.current.value === "" ||
			emailTarget.current.value === ""
		) {
			setPopUpContent(
				<>
					<div className={styles2.PopUpText}>
						Field email tujuan / target wajib diisi !
					</div>
					<BiError className={styles2.IconPopUp} color="#CA0C64" />
				</>
			);
			setTimeout(() => {
				handleOpenAdd();
			}, 3000);
		} else {
			setPopUPLoading(true);
			dummyLoad().then((res) => {
				res
					? setPopUpContent(
							<>
								<div className={styles2.PopUpText}>
									Data anggota team berhasil ditambahkan
								</div>
								<BiCheckCircle color="green" className={styles2.IconPopUp} />
							</>
					  )
					: setPopUpContent(
							<>
								<div className={styles2.PopUpText}>
									Data gagal ditambahkan. Coba lagi !
								</div>
								<BiError className={styles2.IconPopUp} color="#CA0C64" />
							</>
					  );
				setPopUPLoading(false);
				// fn reload data teams
				setTimeout(() => {
					if (res) {
						setPopUpContent(<></>);
						setPopUpActive(false);
					} else {
						handleOpenAdd();
					}
				}, 3000);
			});
		}
	};

	const handleCancel = () => {
		setPopUpContent(<></>);
		setPopUpActive(false);
	};

	useEffect(() => {
		document.title = "Team - Agendakota";
	});
	return (
		<>
			<PopUp
				isActive={popUpActive}
				title={popUpTitle}
				content={popUpLoading ? <Loading /> : popUpContent}
				setActiveFn={setPopUpActive}
				width="45%"
			/>
			<HeaderOrganizer
				active={"team"}
				activeOrg={localStorage.getItem("active-org")}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
			/>
			<SidebarOrganizer
				active={"team"}
				activeOrg={localStorage.getItem("active-org")}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
			/>
			<div className="content organizer">
				<h1 className={styles.Title}>Team</h1>
				<div className={styles.Inline} style={{ marginTop: 20 }}>
					{teams.length > 0 ? (
						<>
							<CardBasic
								className={styles2.CardPlus}
								customContent={
									<div
										className={styles2.ContentCardPlus}
										onClick={handleOpenAdd}
									>
										<BiPlusCircle className={styles2.CardPlusIcon} />
										<div className={styles2.CardPlusText}>
											Tambah Anggota Tim Organizer
										</div>
									</div>
								}
							/>
							{teams.map((team) => {
								return (
									<CardProfile
										style={{ marginTop: "60px" }}
										data={{
											cover: team.user.photo,
											title: team.user.name,
											info: team.user.email,
											desc: "Anggota dari tim organizer",
										}}
										customNavButton={
											<>
												<Button
													title={"Hapus"}
													center={true}
													icon={<BiTrash />}
													classes={styles2.DeleteCard}
													fnOnClick={() => {
														handleOpenDelete(team.id);
													}}
												/>
											</>
										}
									/>
								);
							})}
						</>
					) : (
						<div className={styles.BlankData}>
							<img
								className={`${styles.IconBlank}`}
								src="/images/blank_teams.png"
								style={{ width: "unset", marginTop: "40px" }}
							/>
							<div className={styles.BlankTitle}>
								Buat tim untuk organisasimu
							</div>
							<div className={styles.BlankDesc}>
								Tap pada tombol ‘Tambah Angggota’ untuk menambah anggota baru
							</div>
							<Button
								icon={<BiPlusCircle />}
								title={"Tambah Anggota"}
								style={{ width: "unset", margin: "auto" }}
								fnOnClick={handleOpenAdd}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default OrganizerTeam;
