import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/EventDashboard.module.css";
import FieldBox from "../../../components/FieldBox";
import {
	BiArrowFromTop,
	BiArrowToBottom,
	BiBook,
	BiBox,
	BiCalendar,
	BiCameraMovie,
	BiCard,
	BiCheckCircle,
	BiConversation,
	BiCopy,
	BiEdit,
	BiFullscreen,
	BiGroup,
	BiPaperPlane,
	BiScreenshot,
	BiSearch,
	BiZoomIn,
	BiZoomOut,
} from "react-icons/bi";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../partials/ErrorPage";
import config from "../../../config";
import axios from "axios";
import PopUp from "../../../partials/PopUp";
import Chip from "../../../components/Chip";
import PopUpTicket from "../../../partials/PopUpTicket";
import EditorAddEvtAct from "../../../partials/EditorAddEvtAct";
import InputToogle from "../../../components/InputToogle";
import Alert from "../../../components/Alert";
import InputForm from "../../../components/InputForm";
import InputLabeled from "../../../components/InputLabeled";
import Select from "react-select";
import Button from "../../../components/Button";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { ChartArea, Line } from "react-chartjs-2";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
//   import faker from 'faker';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
	},
};

// ChartJS.register(ArcElement, Tooltip, Legend);

const test = [
	{
		label: "Series 1",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 83,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 64,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 13,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 31,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 32,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 91,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 53,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 36,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 44,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 5,
			},
		],
	},
	{
		label: "Series 2",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 5,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 95,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 44,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 37,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 19,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 6,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 46,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 27,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 5,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 49,
			},
		],
	},
	{
		label: "Series 3",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 62,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 24,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 3,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 69,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 44,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 27,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 7,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 49,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 27,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 95,
			},
		],
	},
	{
		label: "Series 4",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 59,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 7,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 80,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 12,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 41,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 89,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 98,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 36,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 3,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 89,
			},
		],
	},
	{
		label: "Series 5",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 88,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 38,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 12,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 49,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 78,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 56,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 46,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 26,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 60,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 100,
			},
		],
	},
	{
		label: "Series 6",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 28,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 24,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 41,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 75,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 22,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 22,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 17,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 53,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 66,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 22,
			},
		],
	},
	{
		label: "Series 7",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 16,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 48,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 57,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 47,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 26,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 32,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 94,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 91,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 23,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 76,
			},
		],
	},
	{
		label: "Series 8",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 36,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 70,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 5,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 23,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 55,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 24,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 97,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 66,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 69,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 81,
			},
		],
	},
	{
		label: "Series 9",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 20,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 55,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 34,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 88,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 39,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 82,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 93,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 65,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 87,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 67,
			},
		],
	},
	{
		label: "Series 10",
		data: [
			{
				primary: "2024-02-20T00:00:00.000Z",
				secondary: 41,
			},
			{
				primary: "2024-02-21T00:00:00.000Z",
				secondary: 92,
			},
			{
				primary: "2024-02-22T00:00:00.000Z",
				secondary: 23,
			},
			{
				primary: "2024-02-23T00:00:00.000Z",
				secondary: 17,
			},
			{
				primary: "2024-02-24T00:00:00.000Z",
				secondary: 30,
			},
			{
				primary: "2024-02-25T00:00:00.000Z",
				secondary: 37,
			},
			{
				primary: "2024-02-26T00:00:00.000Z",
				secondary: 47,
			},
			{
				primary: "2024-02-27T00:00:00.000Z",
				secondary: 50,
			},
			{
				primary: "2024-02-28T00:00:00.000Z",
				secondary: 82,
			},
			{
				primary: "2024-02-29T00:00:00.000Z",
				secondary: 85,
			},
		],
	},
];

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

const loadDetail = async ({ orgId, eventId }) => {
	try {
		let res = await axios.get(
			process.env.REACT_APP_BACKEND_URL +
				"/api/org/" +
				orgId +
				"/event?event_id=" +
				eventId,
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

const loadTickets = async ({ eventId, orgId }) => {
	try {
		let res = await axios.get(
			process.env.REACT_APP_BACKEND_URL +
				"/api/org/" +
				orgId +
				"/event/" +
				eventId +
				"/manage/tickets",
			{
				headers: {
					"x-api-key": process.env.REACT_APP_BACKEND_KEY,
					Authorization: "Bearer " + localStorage.getItem("access_token"),
				},
			}
		);
		return handleSuccess(res);
	} catch (error) {
		return handleError(error);
	}
};

const setPublish = async ({ orgId, event_id, code_pub_state }) => {
	try {
		let res = await axios.post(
			process.env.REACT_APP_BACKEND_URL +
				"/api/org/" +
				orgId +
				"/event/change-state",
			{
				event_id,
				code_pub_state,
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

const EventDashboard = ({ organization, isLogin, fnSetLogin }) => {
	const [title, setTile] = useState(null);
	const [banner, setBanner] = useState(null);
	const [url, setUrl] = useState(null);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [availableDays, setAvlDays] = useState([]);
	const [address, setAddress] = useState(null);
	const [exeType, setExeType] = useState(null);
	const [category, setCategory] = useState(null);
	const [firstLoad, setFirstLoadState] = useState(null);
	const [isPublish, setPubState] = useState(false);
	const [eventId, setEvtId] = useState(null);
	const [purchases, setPchsData] = useState(null);
	const [attendees, setAttendees] = useState([]);
	const [buyers, setBuyers] = useState([]);
	const [selledDataGraph, setDataGraph] = useState({
		total: 0,
		graph: {
			label: [],
			data: [],
		},
	});
	const [goupedSelledTable, setGroupSelledTable] = useState([]);
	// const [selledTicketTable, setSelledTicketTable] = useState([]);
	// const [organization, setOrganization] = useState(organizer);
	const [isLoading, setLoading] = useState(true);
	const [error, setErrorState] = useState(false);
	const [pausedProcess, setPausedProcess] = useState(null);
	const [popUpActive, setPopUpActive] = useState(false);
	const [popUpTitle, setPopUpTitle] = useState("");
	const [popUpContent, setPopUpContent] = useState(<></>);
	const [contentBody, setContentBody] = useState("General");
	const [tickets, setTickets] = useState([]);
	const [ticketSettings, setTicketSettingsData] = useState({
		limitPchs: null,
		singleTrxs: null,
		maxLimitRsc: null,
		globalSeatMap: null,
	});
	const [orderForm, setOrderForm] = useState([]);
	const [openEditor, setOpenEditor] = useState(null);
	const [basicEndEvt, setBasicEndEvent] = useState(null);
	const [basicStartEvt, setBasicStartEvt] = useState(null);
	const [alert, setAlert] = useState({
		state: false,
		type: "",
		content: "",
	});
	const [numberFormat, setNumFormat] = useState(Intl.NumberFormat("id-ID"));
	const [graphNav, setGraphNav] = useState("All time");
	const [sellTableNav, setSellTable] = useState("All time");
	const [filterSearch, setFilterSearch] = useState(null);
	const [filterOrder, setFilterOrder] = useState("Terbaru");

	const publishToogle = useRef();

	const resetAlert = () => {
		setTimeout(() => {
			setAlert({
				state: false,
				content: "",
				type: "",
			});
		}, 2000);
	};

	const openTicket = () => {
		setPopUpActive(true);
		setPopUpTitle("Tickets");
	};

	const cardFeature = [
		{
			title: "Edit",
			icon: <BiEdit className={`${styles.CardIcon}`} />,
			desc: "Update and review your event / activities basic info",
			fnOnClick: () => {
				setOpenEditor(
					category === "Attraction" ||
						category === "Daily Activities" ||
						category === "Tour Travel (recurring)"
						? category
						: exeType === "online"
						? "Online Event"
						: exeType === "offline"
						? "Onsite Event"
						: "Hybrid Event"
				);
			},
			disabled: false,
			isAddOn: false,
		},
		{
			title: "Ticket",
			icon: <BiCard className={`${styles.CardIcon}`} />,
			desc: "Manage your event sessions with different agendas",
			fnOnClick: openTicket,
			disabled: false,
			isAddOn: false,
		},
		{
			title: "Handbook",
			icon: <BiBook className={`${styles.CardIcon}`} />,
			desc: "Manage your event sessions with different agendas",
			fnOnClick: () => {},
			disabled: true,
			isAddOn: false,
		},
		{
			title: "Sessions",
			icon: <BiCalendar className={`${styles.CardIcon}`} />,
			desc: "Manage your event sessions with different agendas",
			fnOnClick: () => {},
			disabled: true,
			isAddOn: false,
		},
		{
			title: "Stage",
			icon: <BiScreenshot className={`${styles.CardIcon}`} />,
			desc: "Manage your event sessions with different agendas",
			fnOnClick: () => {},
			disabled: true,
			isAddOn: false,
		},
		{
			title: "Speakers",
			icon: <BiGroup className={`${styles.CardIcon}`} />,
			desc: "Manage your event sessions with different agendas",
			fnOnClick: () => {},
			disabled: true,
			isAddOn: false,
		},
		// {
		// 	title: "Landing Page",
		// 	icon: <BiPaperPlane className={`${styles.CardIcon}`} />,
		// 	desc: "Manage your event sessions with different agendas",
		// 	fnOnClick: () => {},
		// 	disabled: false,
		// 	isAddOn: true,
		// },
		// {
		// 	title: "Press Release",
		// 	icon: <BiConversation className={`${styles.CardIcon}`} />,
		// 	desc: "Manage your event sessions with different agendas",
		// 	fnOnClick: () => {},
		// 	disabled: false,
		// 	isAddOn: true,
		// },
		// {
		// 	title: "Broadcasting",
		// 	icon: <BiCameraMovie className={`${styles.CardIcon}`} />,
		// 	desc: "Manage your event sessions with different agendas",
		// 	fnOnClick: () => {},
		// 	disabled: false,
		// 	isAddOn: true,
		// },
	];

	const copyHandle = (url) => {
		// process to copy
		navigator.clipboard.writeText(url);
		setPopUpTitle("Salin Link Event / Activites");
		setPopUpActive(true);
		setPopUpContent(
			<div className={styles.PopupNotify}>
				<div>Link berhasil di salin ke clipboard</div>
				<div className={styles.IconPopUp}>
					<BiCheckCircle color={"green"} fontWeight={"600"} />
				</div>
			</div>
		);
		setTimeout(() => {
			setPopUpActive(false);
		}, 1000);
	};

	const handlePublish = (publishState) => {
		setLoading(true);
		setPublish({
			orgId: organization[0].id,
			event_id: eventId,
			code_pub_state: publishState == true ? 2 : 1,
		}).then((res) => {
			if (res.status === 202) {
				setAlert({
					state: true,
					type: "success",
					content: "Status publikasi berhasil diubah",
				});
				resetAlert();
				setPubState(publishState);
			} else if (res.status === 401) {
				fnSetLogin(false);
				setPausedProcess(`publish~!@!~${publishState == true ? 1 : 0}`);
			} else {
				setAlert({
					state: true,
					type: "danger",
					content: "Status publikasi gagal diubah",
				});
				resetAlert();
				setPubState(!publishState);
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		if (organization.length > 0 && !firstLoad) {
			setLoading(true);
			loadDetail({
				orgId: organization[0].id,
				eventId: localStorage.getItem("active-event"),
			}).then((res) => {
				if (res.status === 200) {
					setFirstLoadState(true);
					console.log(res.data.available_reschedule);
					let start = new Date(
						res.data.event.start_date + " " + res.data.event.start_time
					);
					let end = new Date(
						res.data.event.end_date + " " + res.data.event.end_time
					);
					setTile(res.data.event.name);
					setBanner(res.data.event.logo);
					setUrl(window.location.host + "/" + res.data.event.slug);
					setBasicStartEvt(
						res.data.event.start_date + " " + res.data.event.start_time
					);
					setStart(
						`${config.days[start.getDay()]}, ${start.getDate()} ${
							config.months[start.getMonth()]
						} ${start.getFullYear()} | ${start
							.getHours()
							.toString()
							.padStart(2, "0")}:${start
							.getMinutes()
							.toString()
							.padStart(2, "0")} WIB`
					);
					setBasicEndEvent(
						res.data.event.end_date + " " + res.data.event.end_time
					);
					setEnd(
						`${config.days[end.getDay()]}, ${end.getDate()} ${
							config.months[end.getMonth()]
						} ${end.getFullYear()} | ${end
							.getHours()
							.toString()
							.padStart(2, "0")}:${end
							.getMinutes()
							.toString()
							.padStart(2, "0")} WIB`
					);
					let availableDays = [];

					res.data.available_days.forEach((avldt) => {
						availableDays.push(
							`${config.dayEnToInd[avldt.day]} | ${avldt.start_time
								.slice(0, 5)
								.toString()} WIB - ${avldt.max_limit_time.slice(0, 5)} WIB`
						);
					});
					setAvlDays(availableDays);
					setAddress(res.data.event.location);
					setCategory(res.data.event.category);
					setExeType(res.data.event.exe_type);
					setLoading(false);
					setOrderForm(res.data.event.custom_fields);
					setPubState(res.data.event.is_publish == 1 ? false : true);
					setEvtId(res.data.event.id);
					ticketSettings.singleTrxs = res.data.event.single_trx;
					ticketSettings.maxLimitRsc = res.data.available_reschedule
						? res.data.available_reschedule.limit_time
						: null;
					ticketSettings.globalSeatMap = res.data.event.seat_map;

					// setTickets(res.data.event.tickets);
				} else if (res.status === 401) {
					fnSetLogin(false);
					setFirstLoadState(null);
				} else {
					setErrorState(true);
				}
			});
			loadTickets({
				eventId: localStorage.getItem("active-event"),
				orgId: organization[0].id,
			}).then((res) => {
				if (res.status === 200) {
					setFirstLoadState(true);
					let tickets = [];
					res.data.tickets.forEach((ticket) => {
						tickets.push({
							id: ticket.id,
							name: ticket.name,
							cover: ticket.cover,
							desc: ticket.desc,
							type_price: ticket.type_price,
							price: ticket.price,
							quantity: ticket.quantity,
							start_date: ticket.start_date,
							end_date: ticket.end_date,
							seat_number: ticket.seat_number,
							max_purchase: ticket.max_purchase,
							seat_map: ticket.seat_map,
							limit_daily: ticket.limit_daily
								? ticket.limit_daily.limit_quantity
								: null,
						});
					});
					setTickets(tickets);
					setPchsData(res.data.tickets);
				} else if (res.status === 401) {
					fnSetLogin(false);
					setFirstLoadState(null);
				} else if (res.status !== 404) {
					setErrorState(true);
				}
			});
		}
	}, [organization, firstLoad]);

	useEffect(() => {
		if (tickets.length > 0 && title) {
			setTicketSettingsData({
				limitPchs: tickets[0].max_purchase,
				singleTrxs: ticketSettings.singleTrxs,
				maxLimitRsc: ticketSettings.maxLimitRsc,
				globalSeatMap: ticketSettings.globalSeatMap,
			});
		}
		console.log(tickets);
	}, [tickets, title]);

	useEffect(() => {
		if (isLogin && pausedProcess) {
			if (pausedProcess.split("~!@!~")[0] === "publish") {
				handlePublish(pausedProcess.split("~!@!~")[1] == 1 ? true : false);
			}
			setPausedProcess(null);
		}
	}, [isLogin, pausedProcess]);

	useEffect(() => {
		if (purchases) {
			let buyers = [];
			let attendees = [];
			purchases.forEach((ticket) => {
				ticket.purchases.forEach((pch) => {
					buyers.push({
						user: pch.user,
						ticketId: ticket.id,
						checkin: pch.checkin,
						visitDate: pch.visitDate,
						seatNumber: pch.seatNumber,
						purchaseData: pch,
					});
					if (pch.checkin) {
						attendees.push({
							user: pch.user,
							ticketId: ticket.id,
							checkin: pch.checkin,
							visitDate: pch.visitDate,
							seatNumber: pch.seatNumber,
							purchaseData: pch,
						});
					}
				});
			});
			setBuyers(buyers);
			setAttendees(attendees);
			buyers = null;
			attendees = null;
		}
	}, [purchases]);

	useEffect(() => {
		if (graphNav == "All time" && buyers.length > 0) {
			let labels = [];
			let datas = [];
			let distanceMonth =
				new Date(basicEndEvt).getMonth() -
				new Date(buyers[0].purchaseData.created_at).getMonth() +
				1;
			for (let i = 0; i < distanceMonth; i++) {
				labels.push(config.months[i]);
				datas.push(
					buyers.filter(
						(buyer) => new Date(buyer.purchaseData.created_at).getMonth() == i
					).length
				);
			}
			setDataGraph({
				total: buyers.reduce(
					(currentVal, accumulator) =>
						currentVal + accumulator.purchaseData.amount,
					0
				),
				graph: {
					label: labels,
					data: datas,
				},
			});
		} else if (graphNav == "Today" && buyers.length > 0) {
			let labels = [];
			let datas = [];
			let distanceMonth =
				new Date(basicEndEvt).getMonth() -
				new Date(buyers[0].purchaseData.created_at).getMonth() +
				1;
			for (let i = 0; i < distanceMonth; i++) {
				labels.push(config.months[i]);
				datas.push(
					buyers.filter(
						(buyer) =>
							new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) ==
							new Date().setHours(0, 0, 0)
					).length
				);
			}
			setDataGraph({
				total: buyers
					.filter(
						(buyer) =>
							new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) ==
							new Date().setHours(0, 0, 0)
					)
					.reduce(
						(currentVal, accumulator) =>
							currentVal + accumulator.purchaseData.amount,
						0
					),
				graph: {
					label: labels,
					data: datas,
				},
			});
		} else if (graphNav == "This Week" && buyers.length > 0) {
			let now = new Date().getDay();
			let labels = [];
			let datas = [];
			let distanceMonth =
				new Date(basicEndEvt).getMonth() -
				new Date(buyers[0].purchaseData.created_at).getMonth() +
				1;
			for (let i = 0; i < distanceMonth; i++) {
				labels.push(config.months[i]);
				datas.push(
					buyers.filter(
						(buyer) =>
							new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) >=
								new Date(
									new Date().setDate(new Date().getDate() - now)
								).setHours(0, 0, 0) &&
							new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) <=
								new Date(
									new Date().setDate(new Date().getDate() + (6 - now))
								).setHours(0, 0, 0)
					).length
				);
			}
			setDataGraph({
				total: buyers
					.filter(
						(buyer) =>
							new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) >=
								new Date(
									new Date().setDate(new Date().getDate() - now)
								).setHours(0, 0, 0) &&
							new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) <=
								new Date(
									new Date().setDate(new Date().getDate() + (6 - now))
								).setHours(0, 0, 0)
					)
					.reduce(
						(currentVal, accumulator) =>
							currentVal + accumulator.purchaseData.amount,
						0
					),
				graph: {
					label: labels,
					data: datas,
				},
			});
		}
	}, [graphNav, buyers]);

	useEffect(() => {
		if (sellTableNav == "All time") {
			let grouped = Object.groupBy(buyers, (buyer) => buyer.ticketId);
			setGroupSelledTable(
				Object.entries(grouped).map((group) => {
					let ticket = tickets.find((ticket) => ticket.id == group[0]);
					return {
						type: ticket.name,
						totalSale: `${group[1].length} dari ${
							ticket.quantity == -1 ? ticket.limit_day : ticket.quantity
						}`,
						total: group[1].reduce(
							(currentVal, accumulator) =>
								accumulator.purchaseData.amount + currentVal,
							0
						),
					};
				})
			);
		} else if (sellTableNav == "Today") {
			let date = new Date();
			let grouped = Object.groupBy(
				buyers.filter(
					(buyer) =>
						new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) ===
						date.setHours(0, 0, 0)
				),
				(buyer) => buyer.ticketId
			);
			setGroupSelledTable(
				Object.entries(grouped).map((group) => {
					let ticket = tickets.find((ticket) => ticket.id == group[0]);
					return {
						type: ticket.name,
						totalSale: `${group[1].length} dari ${
							ticket.quantity == -1 ? ticket.limit_day : ticket.quantity
						}`,
						total: group[1].reduce(
							(currentVal, accumulator) =>
								accumulator.purchaseData.amount + currentVal,
							0
						),
					};
				})
			);
		} else if (sellTableNav == "This Week") {
			let now = new Date().getDay();
			let grouped = Object.groupBy(
				buyers.filter(
					(buyer) =>
						new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) >=
							new Date(new Date().setDate(new Date().getDate() - now)).setHours(
								0,
								0,
								0
							) &&
						new Date(buyer.purchaseData.created_at).setHours(0, 0, 0) <=
							new Date(
								new Date().setDate(new Date().getDate() + (6 - now))
							).setHours(0, 0, 0)
				),
				(buyer) => buyer.ticketId
			);

			setGroupSelledTable(
				Object.entries(grouped).map((group) => {
					let ticket = tickets.find((ticket) => ticket.id == group[0]);
					return {
						type: ticket.name,
						totalSale: `${group[1].length} dari ${
							ticket.quantity == -1 ? ticket.limit_day : ticket.quantity
						}`,
						total: group[1].reduce(
							(currentVal, accumulator) =>
								accumulator.purchaseData.amount + currentVal,
							0
						),
					};
				})
			);
		}
	}, [sellTableNav, buyers]);

	return openEditor ? (
		<div className="content organizer">
			<EditorAddEvtAct
				selectedOrgId={organization[0].id}
				forEvtAct={openEditor}
				setForEvtAct={setOpenEditor}
				eventId={localStorage.getItem("active-event")}
				isLogin={isLogin}
				fnSetLogin={fnSetLogin}
			/>
		</div>
	) : (
		<>
			<div className={styles.DecorationBox}>
				<div className={styles.Decoration}></div>
			</div>
			{console.log(
				purchases,
				buyers,
				attendees,
				selledDataGraph,
				goupedSelledTable
			)}
			<div className="content organizer">
				<PopUp
					width="45%"
					isActive={popUpActive && popUpTitle !== "Tickets"}
					setActiveFn={setPopUpActive}
					title={popUpTitle}
					content={
						<div className={styles.PopupNotify}>
							{isLoading ? <Loading /> : popUpContent}
						</div>
					}
				/>
				<PopUpTicket
					isLogin={isLogin}
					fnSetLogin={fnSetLogin}
					isPopActive={popUpActive && popUpTitle === "Tickets"}
					titlePopUp={popUpTitle}
					setPopUpActive={setPopUpActive}
					tickets={tickets}
					ticketSetup={ticketSettings}
					orderForm={orderForm}
					fnSetOrderForm={setOrderForm}
					evtActId={localStorage.getItem("active-event")}
					endEvent={basicEndEvt}
					forEvtAct={
						category === "Attraction" ||
						category === "Daily Activities" ||
						category === "Tour Travel (recurring)"
							? category
							: exeType === "online"
							? "Online Event"
							: exeType === "offline"
							? "Onsite Event"
							: "Hybrid Event"
					}
					orgId={organization.length > 0 ? organization[0].id : null}
				/>

				<div className={styles.Header}>
					<div className={styles.Navigator}>
						<p className={styles.Subtitle}>Personal Event</p>
						<p>&gt;</p>
						<p>{title}</p>
					</div>
					<div className={styles.ChipBox}>
						<Chip
							options={[
								"General",
								"Analityc",
								// "More"
							]}
							value={contentBody}
							setValue={setContentBody}
							multiple={false}
							showLimit={3}
							itemStyle={{ fontSize: "14px", padding: "5px" }}
						/>
					</div>
				</div>
				<Alert
					isShow={alert.state}
					setShowFn={() => {}}
					type={alert.type}
					message={alert.content}
					closeBtn={false}
				/>
				{error ? (
					<ErrorPage />
				) : isLoading ? (
					<div className={styles.Loading}>
						<Loading />
					</div>
				) : (
					<div className={styles.Content}>
						<div
							id="General"
							className={`${styles.ContentBody} ${
								contentBody === "General" ? "" : "d-none"
							}`}
						>
							<div className={styles.TopInfo}>
								<div className={styles.LeftInfo}>
									<div className={styles.Banner}>
										<img
											src={process.env.REACT_APP_BACKEND_URL + banner}
											alt=""
										/>
									</div>
									<div className={styles.Link}>
										<FieldBox label={url}>
											<BiCopy
												onClick={() => {
													copyHandle(url);
												}}
											/>
										</FieldBox>
									</div>
								</div>
								<div className={styles.RightInfo}>
									<h5 className={styles.InfoTitle}>{title}</h5>
									<p className={styles.Address}>
										{address.split("<p>").length === 1
											? address
											: address.split("<p>")[1].split("</p>")[0]}
									</p>
									<div className={styles.BoxTime}>
										{availableDays.length === 0 ? (
											<>
												<div className={styles.Time}>
													<p className={styles.Date}>{start.split("|")[0]}</p>
													<p className={styles.Clock}>
														{" "}
														|&nbsp; {start.split("|")[1]}
													</p>
												</div>
												<div className={styles.Time}>
													<p className={styles.Date}>{end.split("|")[0]}</p>
													<p className={styles.Clock}>
														{" "}
														|&nbsp; {end.split("|")[1]}
													</p>
												</div>
											</>
										) : (
											availableDays.map((avldt) => {
												// return <p className={styles.Time}>{avldt}</p>;
												return (
													<div className={styles.Time}>
														<p className={styles.Date}>{avldt.split("|")[0]}</p>
														<p className={styles.Clock}>
															{" "}
															|&nbsp; {avldt.split("|")[1]}
														</p>
													</div>
												);
											})
										)}
									</div>
									<div className={styles.FooterInfo}>
										<div className={styles.Subtitle}>Diadakan oleh</div>
										{organization.length === 0 ? (
											<></>
										) : (
											<div className={styles.InfoOrg}>
												<img
													src={
														process.env.REACT_APP_BACKEND_URL +
														organization[0].photo
													}
													alt=""
												/>
												<p>{organization[0].name}</p>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className={styles.PartialTitle}>Pamper your event</div>
							<div className={styles.PublishBanner}>
								<FieldBox
									style={{ backgroundColor: "#fff" }}
									label={
										<div className={styles.PartialTitle}>Publish State</div>
									}
								>
									<InputToogle
										style={{ marginLeft: "auto" }}
										checked={isPublish}
										onChange={() => {
											handlePublish(isPublish == true ? false : true);
										}}
										refData={publishToogle}
									/>
									{console.log("Publish state now ", isPublish)}
								</FieldBox>
							</div>
							<div className={styles.FeatureBox}>
								{cardFeature.map((feature) => {
									return (
										<div
											className={`${styles.CardFeature} ${
												feature.disabled ? styles.Disabled : ""
											}`}
											onClick={feature.fnOnClick}
										>
											{feature.isAddOn ? (
												<div className={styles.Badge}>Add On</div>
											) : (
												<></>
											)}
											<div className={styles.CardFeatureTop}>
												{feature.icon}
												<BiFullscreen
													className={`${styles.CardIcon} ${styles.CardOpenIcon}`}
												/>
											</div>
											<div className={styles.CardFeatureBottom}>
												<div className={styles.CardFeatureTitle}>
													{feature.title}
												</div>
												<div className={styles.CardFeatureDesc}>
													{feature.desc}
												</div>
											</div>
										</div>
									);
								})}
							</div>
							<div className={styles.Rundown}></div>
						</div>
						<div
							id="Analityc"
							className={`${styles.ContentBody} ${
								contentBody === "Analityc" ? "" : "d-none"
							}`}
						>
							<div className={styles.Split} style={{ marginBottom: "25px" }}>
								<div
									className={styles.BasicCardInfo}
									style={{ width: "calc(50% - 10px)" }}
								>
									<div className={styles.CardInfoTitle1}>ATTENDEES</div>
									<div>
										<div className={styles.CardInfoContent}>
											{attendees.length}
										</div>
										<div className={styles.CardInfoSubtitle1}>
											{new Date() > new Date(basicEndEvt)
												? "Evennt telah selesai"
												: new Date() <= new Date(basicEndEvt) &&
												  new Date() >= new Date(basicStartEvt)
												? "Event sedang dilaksanakan"
												: "Event telah selesai"}
										</div>
									</div>
								</div>
								<div
									className={styles.BasicCardInfo}
									style={{ width: "calc(50% - 10px)", marginLeft: "auto" }}
								>
									<div className={styles.CardInfoTitle1}>PENDAFTAR</div>
									<div>
										<div className={styles.CardInfoContent}>
											{buyers.length}
										</div>
										<div className={styles.CardInfoSubtitle1}>Pendaftar</div>
									</div>
								</div>
							</div>
							<div
								className={styles.BasicCardInfo}
								style={{ marginBottom: "10px" }}
							>
								<div className={styles.Split}>
									<div className={styles.CardInfoTitle2}>
										Tickets Revenue Selling
									</div>
									<div className={styles.GraphNav}>
										<Chip
											options={["All time", "Today", "This Week"]}
											setValue={setGraphNav}
											value={graphNav}
											multiple={false}
											showLimit={3}
											itemStyle={{ fontSize: "14px", padding: "5px" }}
										/>
									</div>
								</div>
								<div className={styles.CardInfoContent}>
									<div className={styles.Price}>
										<div className={styles.Currency1}>IDR</div>
										{numberFormat.format(selledDataGraph.total)}
										,-
									</div>
									<div className={styles.CardInfoSubtitle1}>
										{selledDataGraph.graph.data.reduce(
											(current, acc) => current + acc,
											0
										)}{" "}
										Terjual{" "}
										{tickets.length > 0
											? tickets[0].quantity == -1
												? ""
												: `Dari ${tickets.reduce(
														(current, acc) => current + acc.quantity,
														0
												  )} Tiket`
											: ""}
									</div>
								</div>

								<div className={styles.GraphBox}>
									<Line
										datasetIdKey="id"
										options={options}
										data={{
											labels: selledDataGraph.graph.label,
											datasets: [
												{
													fill: true,
													id: 1,
													label: "Penjualan Tiket",
													data: selledDataGraph.graph.data,
													borderColor: "#CA0C64",
													backgroundColor: "#CA0C6433",
												},
											],
										}}
									/>
								</div>
							</div>
							<div
								className={styles.BasicCardInfo}
								style={{ marginBottom: "26px" }}
							>
								<div className={styles.Split}>
									<div className={styles.CardInfoTitle2}>By Type</div>
									<div className={styles.GraphNav}>
										<Chip
											options={["All time", "Today", "This Week"]}
											setValue={setSellTable}
											value={sellTableNav}
											multiple={false}
											showLimit={3}
											itemStyle={{ fontSize: "14px", padding: "5px" }}
										/>
									</div>
								</div>
								<div className={styles.BasicTable}>
									<table>
										{goupedSelledTable.map((data) => {
											return (
												<tr>
													<td width={"60%"}>{data.type}</td>
													<td>
														<b>{data.totalSale.split(" dari ")[0]}</b> dari{" "}
														{data.totalSale.split(" dari ")[1]} Terjual
													</td>
													<td>
														<div
															className={styles.Split}
															style={{ gap: "5px" }}
														>
															<div className={styles.Currency2}>Rp</div>
															<b>{numberFormat.format(data.total)}</b>
														</div>
													</td>
												</tr>
											);
										})}
									</table>
									{goupedSelledTable.length === 0 ? (
										<div
											className={styles.Subtitle1}
											style={{ textAlign: "center" }}
										>
											Data belum tersedia
										</div>
									) : (
										""
									)}
								</div>
							</div>
							<div className={styles.Split} style={{ marginBottom: "16px" }}>
								<div className={styles.SearchBox}>
									<FieldBox
										label={<BiSearch style={{ marginTop: "5px" }} />}
										style={{ width: "100%" }}
									>
										<InputForm
											placeholder={"Cari Transaksi"}
											type={"text"}
											style={{ textAlign: "left" }}
											onInput={(e) => {
												setFilterSearch(e.value);
											}}
										/>
									</FieldBox>
								</div>
								<div className={styles.SelectBox}>
									<FieldBox
										label={<div className={styles.Subtitle}>Transaksi:</div>}
									>
										<Select
											options={["Terbaru", "Terbesar", "Terkecil"]}
											styles={{
												option: (basicStyle, state) => ({
													...basicStyle,
													backgroundColor: state.isFocused
														? "#fecadf"
														: "white",
												}),
												control: (basicStyle, state) => ({
													...basicStyle,
													display: "flex",
													flexDirection: "row",
													borderStyle: "none!important",
													boxShadow: "none!important",
												}),
												container: (basicStyle, state) => ({
													...basicStyle,
													width: "100%",
													margin: "unset",
													borderRadius: "8px",
												}),
											}}
											onChange={(e) => {
												setFilterOrder(e);
											}}
										/>
									</FieldBox>
								</div>
								{console.log(filterOrder, filterSearch)}
								<div className={styles.DownloadBox}>
									<FieldBox label={<BiArrowToBottom />}>
										<Button
											title={"Download XLS"}
											style={{ width: "unset", boxShadow: "none", padding: 0 }}
											bgColor={"#fff"}
											borderColor={"#fff"}
											textColor={"#000"}
										/>
									</FieldBox>
								</div>
							</div>
							<div className={styles.BasicTable}>
								<table>
									<thead>
										<tr>
											<th>ID</th>
											<th>Ticket</th>
											<th>Buyer</th>
											<th>Qty</th>
											<th>Total</th>
											<th>Date</th>
										</tr>
									</thead>
									<tbody>
										<tr className={styles.PTable}>
											<td>1</td>
											<td>VVIP Phoenix</td>
											<td>Aletia Galdea Vesperitio</td>
											<td>2</td>
											<td>100.000</td>
											<td>23-01-2024</td>
										</tr>
										<tr className={styles.PTable}>
											<td>1</td>
											<td>VVIP Phoenix</td>
											<td>Aletia Galdea Vesperitio</td>
											<td>2</td>
											<td>100.000</td>
											<td>23-01-2024</td>
										</tr>
										<tr className={styles.PTable}>
											<td>1</td>
											<td>VVIP Phoenix</td>
											<td>Aletia Galdea Vesperitio</td>
											<td>2</td>
											<td>100.000</td>
											<td>23-01-2024</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div
							id="More"
							className={`${styles.ContentBody} ${
								contentBody === "More" ? "" : "d-none"
							}`}
						></div>
					</div>
				)}
			</div>
		</>
	);
};

export default EventDashboard;
