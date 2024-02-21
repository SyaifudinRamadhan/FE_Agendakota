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
import CardProfile2 from "../../components/CardProfile2";
import axios from "axios";
import ErrorPage from "../../partials/ErrorPage";

const handleSuccess = (res) => {
	return {
		data: res.data,
		status: res.status,
	};
};

const handleError = (error) => {
	console.log(error);
	if (error.response === undefined) {
		return {
			data: { data: [error.message] },
			status: 500,
		};
	} else {
		return {
			data: error.response,
			status: error.response.status,
		};
	}
};

const loadData = async ({ orgId }) => {
	try {
		let res = await axios.get(
			process.env.REACT_APP_BACKEND_URL + "/api/org/teams?org_id=" + orgId,
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const addTeam = async ({ orgId, email }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/org/team/invite",
			{
				email: email,
				org_id: orgId,
			},
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const deleteMember = async ({ orgId, teamId }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL + "/api/org/team/delete",
			{
				team_id: teamId,
				org_id: orgId,
				_method: "DELETE",
			},
			{
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token"),
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const OrganizerTeam = ({ organization, fnSetLogin, isLogin }) => {
	const [orgSelected, setOrgSelected] = useState(null);
	const [popUpActive, setPopUpActive] = useState(false);
	const [popUpTitle, setPopUpTitle] = useState("");
	const [popUpContent, setPopUpContent] = useState(<></>);
	const [popUpLoading, setPopUPLoading] = useState(false);
	const [teams, setTeams] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [errorLoad, setErrorState] = useState(false);
	const [pausedProcess, setPausedProcess] = useState(null);
	const [firstLoad, setFirstLoad] = useState(true);

	const emailTarget = useRef(null);

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
		setPopUpActive(false);
		setLoading(true);
		deleteMember({ orgId: orgSelected, teamId: id }).then((res) => {
			if (res.status === 202) {
				setTeams(teams.filter((team) => team.id !== id));
				setPopUpContent(
					<>
						<div className={styles2.PopUpText}>
							Data anggota team berhasil dihapus
						</div>
						<BiCheckCircle color="green" className={styles2.IconPopUp} />
					</>
				);
				setFirstLoad(true);
			} else if (res.status === 401) {
				fnSetLogin(false);
				setPopUpActive(true);
				setPausedProcess("delete~!@!~" + id);
			} else {
				setPopUpContent(
					<>
						<div className={styles2.PopUpText}>
							Data gagal dihapus. Coba lagi !
						</div>
						<BiError className={styles2.IconPopUp} color="#CA0C64" />
					</>
				);
			}
			setLoading(false);
			if (res.status !== 401) {
				setPopUpActive(true);
				setTimeout(() => {
					setPopUpActive(false);
				}, 1000);
			}
		});
	};

	const handleAddMember = (e) => {
		if (e) {
			e.preventDefault();
		}
		if (
			!emailTarget.current ||
			emailTarget.current.value === "" ||
			emailTarget.current.value === " "
		) {
			setPopUpContent(
				<>
					<div className={styles2.PopUpText}>
						Field email tujuan / target wajib diisi !
					</div>
					<BiError className={styles2.IconPopUp} color="#CA0C64" />
				</>
			);
			setPopUpActive(true);
			setTimeout(() => {
				setPopUpActive(false);
			}, 1000);
		} else {
			setLoading(true);
			addTeam({ orgId: orgSelected, email: emailTarget.current.value }).then(
				(res) => {
					if (res.status === 202) {
						setPopUpContent(
							<>
								<div className={styles2.PopUpText}>
									Undangan email berhasil dikirim !!!
								</div>
								<BiCheckCircle color="green" className={styles2.IconPopUp} />
							</>
						);
						emailTarget.current.value = "";
					} else if (res.status === 401) {
						fnSetLogin(false);
						setPausedProcess("add-data");
					} else if (res.status === 403) {
						setPopUpContent(
							<>
								<div className={styles2.PopUpText}>
									Email sudah terdaftar sebagai member di organisasimu !!!
								</div>
								<BiError className={styles2.IconPopUp} color="#CA0C64" />
							</>
						);
					} else {
						setPopUpContent(
							<>
								<div className={styles2.PopUpText}>
									Undangan email gagal dikirim. Coba lagi !!!
								</div>
								<BiError className={styles2.IconPopUp} color="#CA0C64" />
							</>
						);
					}
					setLoading(false);
					if (res.status !== 401) {
						setPopUpActive(true);
						setTimeout(() => {
							setPopUpActive(false);
						}, 2000);
					}
				}
			);
		}
	};

	const handleCancel = () => {
		setPopUpActive(false);
	};

	useEffect(() => {
		document.title = "Team - Agendakota";
		if (organization.length === 0) {
			setLoading(true);
		} else if (firstLoad) {
			setLoading(true);
			loadData({ orgId: organization[0].id }).then((res) => {
				if (res.status === 200) {
					setTeams(res.data.teams);
					setFirstLoad(false);
				} else if (res.status === 401) {
					fnSetLogin(false);
				} else if (res.status !== 404) {
					setErrorState(true);
				} else {
					setTeams([]);
				}
				setOrgSelected(organization[0].id);
				setLoading(false);
			});
		}
	}, [organization, firstLoad]);

	useEffect(() => {
		if (isLogin && pausedProcess) {
			if (pausedProcess === "add-data") {
				handleAddMember();
			} else if (pausedProcess.split("~!@!~")[0] === "delete") {
				handleDelete(pausedProcess.split("~!@!~")[1]);
			}
			setPausedProcess(null);
		}
	}, [isLogin, pausedProcess]);

	return (
		<>
			<PopUp
				isActive={popUpActive}
				title={popUpTitle}
				content={popUpContent}
				setActiveFn={setPopUpActive}
				width="45%"
			/>
			<div className="content organizer">
				{errorLoad ? (
					<ErrorPage />
				) : (
					<>
						<h1 className={styles.Title}>Team</h1>
						<p className={styles.SubTitle}>
							Add members to the organizers team where they can gain access to
							managing and tracking the event
						</p>
						<form style={{ marginTop: "10px" }} onSubmit={handleAddMember}>
							<div className={styles2.InputForm}>
								<label>Email of invite</label>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										gap: "10px",
									}}
								>
									<InputForm
										type={"email"}
										placeholder={"Input alamat email temanmu !"}
										refData={emailTarget}
										style={{ width: "100%", maxWidth: "370px" }}
									/>
									<Button title={"Invite"} typeBtn="submit" center={true} />
								</div>
							</div>
						</form>
						<div className={styles.Inline} style={{ marginTop: 20 }}>
							{isLoading ? (
								<div
									className={styles.BlankData}
									style={{ marginTop: "140px" }}
								>
									<Loading />
								</div>
							) : teams && teams.length > 0 ? (
								teams.map((team) => {
									return (
										<CardProfile2
											style={{ marginTop: "60px" }}
											data={{
												cover:
													process.env.REACT_APP_BACKEND_URL + team.user.photo,
												title: team.user.name,
												info: team.user.email,
												desc: "Anggota dari tim organizer",
											}}
											customNavButton={
												<>
													<Button
														title={"Hapus Member"}
														center={true}
														classes={styles2.DeleteCard}
														fnOnClick={() => {
															handleOpenDelete(team.id);
														}}
														style={{ width: "unset", margin: "auto" }}
													/>
												</>
											}
										/>
									);
								})
							) : (
								<div className={styles.BlankData}>
									<img
										className={`${styles.IconBlank}`}
										src="/images/f2d838169942be81b70e17d60fc9f3c7.png"
										style={{ width: "unset", marginTop: "40px" }}
									/>
									<div className={styles.BlankTitle}>
										Yuk, Buat Team eventmu
									</div>
									<div className={styles.BlankDesc}>
										Tambahkan member untuk membentuk team organizermu
									</div>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default OrganizerTeam;
