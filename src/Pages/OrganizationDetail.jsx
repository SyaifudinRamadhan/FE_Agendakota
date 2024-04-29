import React, { useEffect, useState } from "react";
import styles from "./styles/OrganizationDetail.module.css";
import { BiChevronRight } from "react-icons/bi";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import ErrorPage from "../partials/ErrorPage";
import Event from "../components/Event";

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

const loadOrg = async ({ orgId }) => {
	try {
		let res = await axios.get(
			process.env.REACT_APP_BACKEND_URL + "/api/org-profile/" + orgId,
			{
				headers: {
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const loadEvent = async ({ orgId }) => {
	try {
		let res = await axios.get(
			process.env.REACT_APP_BACKEND_URL +
				"/api/search?org_id=" +
				orgId +
				"&include_all=true",
			{
				headers: {
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const OrganizationDetail = () => {
	const { id } = useParams();

	// data and param
	const [organization, setOrganization] = useState(null);
	const [upcomings, setUpcomings] = useState(null);
	const [endeds, setEndeds] = useState(null);

	// state control
	const [isLoading, setLoading] = useState(true);
	const [errorState, setErrorState] = useState(false);

	useEffect(() => {
		if (!organization && !upcomings && !endeds) {
			loadOrg({ orgId: id }).then((res) => {
				if (res.status === 200) {
					setOrganization(res.data.organization);
				} else {
					setErrorState(true);
					setLoading(false);
				}
			});
			loadEvent({ orgId: id }).then((res) => {
				if (res.status === 200) {
					let now = new Date();
					let endeds = [];
					let upcomings = [];
					res.data.events.forEach((event) => {
						let end = new Date(event.end_date + "T" + event.end_time);
						if (end < now && event.visibility == 1) {
							endeds.push(event);
							console.log("ENDED");
						} else if (event.is_publish == 2 && event.visibility == 1) {
							upcomings.push(event);
							console.log("UPCOMING");
						}
					});
					setUpcomings(upcomings);
					setEndeds(endeds);
				} else if (res.status === 404) {
					setUpcomings([]);
					setEndeds([]);
				} else {
					setErrorState(true);
					setLoading(false);
				}
			});
		}
		if (organization && upcomings && endeds) {
			setLoading(false);
		}
	}, [organization, upcomings, endeds]);

	return (
		<div className={`content ${styles.MainContainer}`}>
			{isLoading ? (
				<div style={{ marginTop: "100px" }}>
					<Loading />
				</div>
			) : errorState ? (
				<ErrorPage />
			) : (
				<>
					<div className={styles.NavPane}>
						<div className={styles.NavItemSecondary}>
							<a href="/">Home</a>
						</div>
						<div className={styles.NavItemSecondary}>
							<BiChevronRight />
						</div>
						<div className={styles.NavItemSecondary}>
							<a href="/explore">explore</a>
						</div>
						<div className={styles.NavItemSecondary}>
							<BiChevronRight />
						</div>
						<div
							className={styles.NavItemPrimary}
							style={{ width: "calc(100% - 157px)" }}
						>
							{organization.name}
						</div>
					</div>
					<div className={styles.MainBody}>
						<div
							className={styles.BoxBanner}
							style={{
								backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${organization.banner})`,
							}}
						></div>
						<div className={styles.ProfileContent}>
							<div className={styles.BasicInfoBox}>
								<img
									src={process.env.REACT_APP_BACKEND_URL + organization.photo}
									alt=""
								/>
								<div className={styles.BasicInfoTitle}>
									<div style={{ width: "100%" }}>
										<div className={`${styles.TitleBox} ${styles.OrgName}`}>
											{organization.name}
										</div>
										<div>
											<img src="/images/verify.png" alt="" />
										</div>
									</div>
									<div
										className={styles.SecondaryText}
										style={{ overflowWrap: "anywhere", width: "100%" }}
									>
										{organization.email}
									</div>
								</div>
								<div
									className={`${styles.BasicInfoTitle2} ${styles.BasicInfoTitle2Def}`}
								>
									<div className={styles.TitleBox}>{upcomings.length}</div>
									<div className={styles.SecondaryText}>Upcoming Events</div>
								</div>
								<div
									className={`${styles.BasicInfoTitle2} ${styles.BasicInfoTitle2Def}`}
								>
									<div className={styles.TitleBox}>{endeds.length}</div>
									<div className={styles.SecondaryText}>Past Events</div>
								</div>
							</div>
							<div
								className={`${styles.BasicInfoBox} ${styles.BasicInfoBoxWrapper}`}
							>
								<div
									className={styles.BasicInfoTitle2}
									style={{ marginLeft: "auto" }}
								>
									<div className={styles.TitleBox}>{upcomings.length}</div>
									<div className={styles.SecondaryText}>Upcoming Events</div>
								</div>
								<div
									className={styles.BasicInfoTitle2}
									style={{ marginRight: "auto" }}
								>
									<div className={styles.TitleBox}>{endeds.length}</div>
									<div className={styles.SecondaryText}>Past Events</div>
								</div>
							</div>
							<div className={styles.DescBox}>
								<div className={styles.TitleBox}>Tentang Organisasi</div>
								<div
									className={styles.SecondaryText}
									style={{ marginTop: "20px" }}
									dangerouslySetInnerHTML={{ __html: organization.desc }}
								></div>
							</div>
							<div>
								<div className={styles.TitleBox}>
									Upcoming Events and Activities
								</div>
								<div className={styles.EventBox}>
									{upcomings.length > 0 ? (
										upcomings.map((event) => (
											<Event data={event} className={[styles.EventCard]} />
										))
									) : (
										<div className={styles.EventBlank}>
											<img src="/images/blank_events.png" alt="" />
											<div>Data Tidak Tersedia</div>
										</div>
									)}
								</div>
							</div>
							<div>
								<div className={styles.TitleBox} style={{ marginTop: "25px" }}>
									Past Events and Activities
								</div>
								<div className={styles.EventBox}>
									{endeds.length > 0 ? (
										endeds.map((event) => (
											<Event data={event} className={[styles.EventCard]} />
										))
									) : (
										<div className={styles.EventBlank}>
											<img src="/images/blank_events.png" alt="" />
											<div>Data Tidak Tersedia</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default OrganizationDetail;
