import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/PersonalEvent.module.css";
import styles2 from "../styles/Billing.module.css";
import styles3 from "../styles/TableBordered.module.css";
import HeaderOrganizer from "../../partials/HeaderOrganizer";
import SidebarOrganizer from "../../partials/SidebarOrganizer";
import Toggler from "../../components/Toggler";
import Select from "react-select";
import Button from "../../components/Button";
import {
	BiDownload,
	BiError,
	BiCheckCircle,
	BiPlusCircle,
	BiTrash,
	BiCheck,
	BiX,
	BiQuestionMark,
	BiTimer,
} from "react-icons/bi";
import { Table } from "react-bootstrap";
import PopUp from "../../partials/PopUp";
import Loading from "../../components/Loading";
import xlsx from "json-as-xlsx";
import InputForm from "../../components/InputForm";
import moment from "moment";

const OrganizerBilling = () => {
	const numberFormat = Intl.NumberFormat("id-ID");
	const [orgSelected, setOrgSelected] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [viewing, setViewing] = useState("Report");
	const [dataTable, setDataTable] = useState(null);
	const [selectedAccBank, setSelectedAccBank] = useState(null);
	const [isLoadingPopUp, setLoadingPopUp] = useState(false);
	const [popUpTitle, setPopUpTitle] = useState("");
	const [contentNotify, setContentNotify] = useState(null);
	const [popupNotify, setpopupNotify] = useState(false);
	const [formAddBank, setFormAddBank] = useState(<></>);
	const fieldFormAddBank = {
		bank: useRef(null),
		accName: useRef(null),
		accNum: useRef(null),
	};
	const fieldOtp = {
		fieldOtp: useRef(null),
		idBank: useRef(null),
	};

	const events = [
		{
			id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			slug: "testing-updated",
			name: "Australia & UK Top Ranked Universities - Application Day",
			category: "-",
			topics: "-",
			logo: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230922011910.jpg",
			desc: "-",
			snk: "-",
			exe_type: "online",
			location: "-",
			province: "-",
			city: "-",
			start_date: "2023-09-20",
			end_date: "2023-09-25",
			start_time: "08:00:00",
			end_time: "12:00:00",
			is_publish: 1,
			instagram: "-",
			twitter: "-",
			website: "-",
			twn_url: "-",
			custom_fields: "",
			seat_map: null,
			single_trx: 0,
			deleted: 0,
			created_at: "2023-09-17T01:39:14.000000Z",
			updated_at: "2023-09-24T09:26:56.000000Z",
			available_days: [],
			org: {
				id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
				user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				type: "test2",
				name: "Agendakota",
				slug: "test-update",
				photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
				banner:
					"/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
				interest: "-",
				email: "-",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				website: "-",
				desc: "lorem ipsum dolor sit amet",
				deleted: 0,
				created_at: "2023-09-17T01:25:15.000000Z",
				updated_at: "2023-09-17T01:30:44.000000Z",
			},
			tickets: [
				{
					id: "9a271fce-b9e8-480e-9efc-70139a1e5633",
					event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
					name: "Ticket 1",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 1,
					price: 0,
					quantity: 3,
					start_date: "2023-09-17",
					end_date: "2023-09-17",
					seat_number: 0,
					max_purchase: 0,
					deleted: 0,
					created_at: "2023-09-17T05:24:40.000000Z",
					updated_at: "2023-09-21T03:19:50.000000Z",
				},
				{
					id: "9a2bde6a-0d61-4791-8155-43dd6ecbab29",
					event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
					name: "Ticket 3",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 3,
					price: 0,
					quantity: 7,
					start_date: "2023-09-17",
					end_date: "2023-09-19",
					seat_number: 0,
					max_purchase: 0,
					deleted: 0,
					created_at: "2023-09-19T14:00:57.000000Z",
					updated_at: "2023-09-21T06:17:23.000000Z",
				},
				{
					id: "9a27205d-cedf-4125-91e4-cb0abf12ec54",
					event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
					name: "Ticket 2",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 2,
					price: 25000,
					quantity: 6,
					start_date: "2023-09-17",
					end_date: "2023-09-17",
					seat_number: 0,
					max_purchase: 0,
					deleted: 0,
					created_at: "2023-09-17T05:26:14.000000Z",
					updated_at: "2023-09-21T06:17:23.000000Z",
				},
				{
					id: "9a2de1ec-8123-43cb-80a0-95d05fb64231",
					event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
					name: "Ticket 4.5",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 2,
					price: 25000,
					quantity: 7,
					start_date: "2023-09-17",
					end_date: "2023-09-20",
					seat_number: 0,
					max_purchase: 0,
					deleted: 0,
					created_at: "2023-09-20T14:02:25.000000Z",
					updated_at: "2023-09-20T14:03:08.000000Z",
				},
			],
		},
		{
			id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			slug: "testing-attraction-2",
			name: "[SOLO] MLBB SULTAN CUP RISING STAR",
			category: "Attraction",
			topics: "-",
			logo: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230926120219_651265db31ebb.jpg",
			desc: "-",
			snk: "-",
			exe_type: "offline",
			location: "-",
			province: "-",
			city: "-",
			start_date: "2023-10-20",
			end_date: "2024-10-20",
			start_time: "23:54:34",
			end_time: "23:54:34",
			is_publish: 1,
			instagram: "-",
			twitter: "-",
			website: "-",
			twn_url: "-",
			custom_fields:
				"Dapat info dari mana|Kamu tahu dari apa|Kapan kamu sadarnya",
			seat_map:
				"/storage/seat_maps/Screenshot 2023-09-18 204658_1697820874.png",
			single_trx: 1,
			deleted: 0,
			created_at: "2023-10-20T16:54:34.000000Z",
			updated_at: "2023-10-20T16:54:34.000000Z",
			available_days: [
				{
					id: "9a6a7903-5de6-45b2-a8b9-ea7af9202b50",
					event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
					day: "Tue",
					max_limit_time: "21:00:00",
					created_at: "2023-10-20T16:54:34.000000Z",
					updated_at: "2023-10-20T16:54:34.000000Z",
				},
				{
					id: "9a6a7903-624f-4e42-8b37-09e17906638f",
					event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
					day: "Wed",
					max_limit_time: "22:00:00",
					created_at: "2023-10-20T16:54:34.000000Z",
					updated_at: "2023-10-20T16:54:34.000000Z",
				},
				{
					id: "9a6a7903-65ac-419c-9fcd-bc8a5b43be35",
					event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
					day: "Thu",
					max_limit_time: "17:00:00",
					created_at: "2023-10-20T16:54:34.000000Z",
					updated_at: "2023-10-20T16:54:34.000000Z",
				},
			],
			org: {
				id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
				user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				type: "test2",
				name: "Agendakoat 2",
				slug: "test-update",
				photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
				banner:
					"/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
				interest: "-",
				email: "-",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				website: "-",
				desc: "lorem ipsum dolor sit amet",
				deleted: 0,
				created_at: "2023-09-17T01:25:15.000000Z",
				updated_at: "2023-09-17T01:30:44.000000Z",
			},
			tickets: [
				{
					id: "9a6562c2-c65e-4156-88f4-110922e7cc48",
					event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
					name: "Ticket B",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 3,
					price: 0,
					quantity: -1,
					start_date: "2023-10-21",
					end_date: "2024-10-21",
					seat_number: 1,
					max_purchase: 3,
					deleted: 0,
					created_at: "2023-10-18T04:13:13.000000Z",
					updated_at: "2023-10-20T17:02:10.000000Z",
				},
				{
					id: "9a6562f0-d915-48b8-b147-9cde766bca95",
					event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
					name: "Ticket C",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 1,
					price: 0,
					quantity: -1,
					start_date: "2023-10-21",
					end_date: "2024-10-21",
					seat_number: 1,
					max_purchase: 2,
					deleted: 0,
					created_at: "2023-10-18T04:13:43.000000Z",
					updated_at: "2023-10-20T17:02:10.000000Z",
				},
				{
					id: "9a656237-31ab-4839-bfb8-56d6a8498955",
					event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
					name: "Ticket A",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 2,
					price: 25000,
					quantity: -1,
					start_date: "2023-10-21",
					end_date: "2024-10-21",
					seat_number: 1,
					max_purchase: 2,
					deleted: 0,
					created_at: "2023-10-18T04:11:41.000000Z",
					updated_at: "2023-10-20T17:02:10.000000Z",
				},
			],
		},
		{
			id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			slug: "testing-updated",
			name: "ASPEK DAN PERLINDUNGAN HUKUM ATAS MEREK",
			category: "-",
			topics: "-",
			logo: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20231012142401_65279f11e3b17.jpg",
			desc: "-",
			snk: "-",
			exe_type: "online",
			location: "-",
			province: "-",
			city: "-",
			start_date: "2023-09-20",
			end_date: "2023-09-25",
			start_time: "08:00:00",
			end_time: "12:00:00",
			is_publish: 1,
			instagram: "-",
			twitter: "-",
			website: "-",
			twn_url: "-",
			custom_fields: "",
			seat_map: null,
			single_trx: 0,
			deleted: 0,
			created_at: "2023-09-17T01:39:14.000000Z",
			updated_at: "2023-09-24T09:26:56.000000Z",
			available_days: [],
			org: {
				id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
				user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				type: "test2",
				name: "Agendakota",
				slug: "test-update",
				photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
				banner:
					"/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
				interest: "-",
				email: "-",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				website: "-",
				desc: "lorem ipsum dolor sit amet",
				deleted: 0,
				created_at: "2023-09-17T01:25:15.000000Z",
				updated_at: "2023-09-17T01:30:44.000000Z",
			},
			tickets: [],
		},
		{
			id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4879",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			slug: "testing-attraction-2",
			name: "Rock in Solo Festival 2023",
			category: "Attraction",
			topics: "-",
			logo: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230905110542_64f6a91690d6f.jpg",
			desc: "-",
			snk: "-",
			exe_type: "offline",
			location: "-",
			province: "-",
			city: "-",
			start_date: "2023-10-20",
			end_date: "2024-10-20",
			start_time: "23:54:34",
			end_time: "23:54:34",
			is_publish: 1,
			instagram: "-",
			twitter: "-",
			website: "-",
			twn_url: "-",
			custom_fields:
				"Dapat info dari mana|Kamu tahu dari apa|Kapan kamu sadarnya",
			seat_map:
				"/storage/seat_maps/Screenshot 2023-09-18 204658_1697820874.png",
			single_trx: 1,
			deleted: 0,
			created_at: "2023-10-20T16:54:34.000000Z",
			updated_at: "2023-10-20T16:54:34.000000Z",
			available_days: [
				{
					id: "9a6a7903-5de6-45b2-a8b9-ea7af9202b50",
					event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
					day: "Tue",
					max_limit_time: "21:00:00",
					created_at: "2023-10-20T16:54:34.000000Z",
					updated_at: "2023-10-20T16:54:34.000000Z",
				},
				{
					id: "9a6a7903-624f-4e42-8b37-09e17906638f",
					event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
					day: "Wed",
					max_limit_time: "22:00:00",
					created_at: "2023-10-20T16:54:34.000000Z",
					updated_at: "2023-10-20T16:54:34.000000Z",
				},
				{
					id: "9a6a7903-65ac-419c-9fcd-bc8a5b43be35",
					event_id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
					day: "Thu",
					max_limit_time: "17:00:00",
					created_at: "2023-10-20T16:54:34.000000Z",
					updated_at: "2023-10-20T16:54:34.000000Z",
				},
			],
			org: {
				id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
				user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				type: "test2",
				name: "Agendakoat 2",
				slug: "test-update",
				photo: "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
				banner:
					"/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
				interest: "-",
				email: "-",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				website: "-",
				desc: "lorem ipsum dolor sit amet",
				deleted: 0,
				created_at: "2023-09-17T01:25:15.000000Z",
				updated_at: "2023-09-17T01:30:44.000000Z",
			},
			tickets: [
				{
					id: "9a6562c2-c65e-4156-88f4-110922e7cc48",
					event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
					name: "Ticket B",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 3,
					price: 0,
					quantity: -1,
					start_date: "2023-10-21",
					end_date: "2024-10-21",
					seat_number: 1,
					max_purchase: 3,
					deleted: 0,
					created_at: "2023-10-18T04:13:13.000000Z",
					updated_at: "2023-10-20T17:02:10.000000Z",
				},
				{
					id: "9a6562f0-d915-48b8-b147-9cde766bca95",
					event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
					name: "Ticket C",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 1,
					price: 0,
					quantity: -1,
					start_date: "2023-10-21",
					end_date: "2024-10-21",
					seat_number: 1,
					max_purchase: 2,
					deleted: 0,
					created_at: "2023-10-18T04:13:43.000000Z",
					updated_at: "2023-10-20T17:02:10.000000Z",
				},
				{
					id: "9a656237-31ab-4839-bfb8-56d6a8498955",
					event_id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
					name: "Ticket A",
					desc: "Lorem ipsum dolor sit amet",
					type_price: 2,
					price: 25000,
					quantity: -1,
					start_date: "2023-10-21",
					end_date: "2024-10-21",
					seat_number: 1,
					max_purchase: 2,
					deleted: 0,
					created_at: "2023-10-18T04:11:41.000000Z",
					updated_at: "2023-10-20T17:02:10.000000Z",
				},
			],
		},
	];
	const availableWds = {
		data: [
			{
				event: {
					id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
					org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
					slug: "testing-updated",
					name: "testing updated",
					category: "-",
					topics: "-",
					logo: "/storage/event_banners/Screenshot 2023-09-14 220354_1694915108.png",
					desc: "-",
					snk: "-",
					exe_type: "online",
					location: "-",
					province: "-",
					city: "Kota",
					start_date: "2023-09-20",
					end_date: "2023-09-25",
					start_time: "08:00:00",
					end_time: "12:00:00",
					is_publish: 1,
					instagram: "-",
					twitter: "-",
					website: "-",
					twn_url: "-",
					custom_fields: "",
					seat_map: null,
					single_trx: 0,
					deleted: 0,
					created_at: "2023-09-17T01:39:14.000000Z",
					updated_at: "2023-09-24T09:26:56.000000Z",
				},
				amount: 25000,
				origin_amount: 25000,
				commision: 0,
				admin_fee: 0,
			},
			{
				event: {
					id: "9a654201-ef5e-487c-be43-2cb7af4281ab",
					org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
					slug: "testing-attraction-updated",
					name: "testing Attraction updated",
					category: "Attraction",
					topics: "-",
					logo: "/storage/event_banners/Screenshot 2023-09-11 215348_1697596897.png",
					desc: "-",
					snk: "-",
					exe_type: "offline",
					location: "-",
					province: "-",
					city: "Kota 1",
					start_date: "2023-10-21",
					end_date: "2024-10-21",
					start_time: "00:02:10",
					end_time: "00:02:10",
					is_publish: 2,
					instagram: "-",
					twitter: "-",
					website: "-",
					twn_url: "-",
					custom_fields: "Kamu siapa|Anatawa dare ?",
					seat_map:
						"/storage/seat_maps/Screenshot 2023-09-18 204658_1697821330.png",
					single_trx: 1,
					deleted: 0,
					created_at: "2023-10-18T02:41:37.000000Z",
					updated_at: "2023-10-20T17:02:10.000000Z",
				},
				amount: 107500,
				origin_amount: 107500,
				commision: 0,
				admin_fee: 0,
			},
			{
				event: {
					id: "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
					org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
					slug: "testing-attraction-2",
					name: "testing attraction 2",
					category: "Attraction",
					topics: "-",
					logo: "/storage/event_banners/Screenshot 2023-09-11 215348_1697820874.png",
					desc: "-",
					snk: "-",
					exe_type: "offline",
					location: "-",
					province: "-",
					city: "Kota",
					start_date: "2023-10-20",
					end_date: "2024-10-20",
					start_time: "23:54:34",
					end_time: "23:54:34",
					is_publish: 1,
					instagram: "-",
					twitter: "-",
					website: "-",
					twn_url: "-",
					custom_fields:
						"Dapat info dari mana|Kamu tahu dari apa|Kapan kamu sadarnya",
					seat_map:
						"/storage/seat_maps/Screenshot 2023-09-18 204658_1697820874.png",
					single_trx: 1,
					deleted: 0,
					created_at: "2023-10-20T16:54:34.000000Z",
					updated_at: "2023-10-20T16:54:34.000000Z",
				},
				amount: 0,
				origin_amount: 0,
				commision: 0,
				admin_fee: 0,
			},
		],
		total_amount: 132500,
	};
	const banks = [
		{
			id: "9a34adfc-ca0d-4489-a040-f6f09b0ebc1e",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			acc_name: "Syaifudin Ramadhan",
			bank_name: "Bank Tabungan Negara (BTN)",
			acc_number: "62537215451877712",
			status: 0,
			deleted: 0,
			created_at: "2023-09-23T23:08:00.000000Z",
			updated_at: "2023-09-23T23:41:05.000000Z",
			icon: "/images/008.png",
		},
		{
			id: "9a34adfc-ca0d-4489-a040-f6f09b0ebc2e",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			acc_name: "Syaifudin Ramadhan",
			bank_name: "Bank Tabungan Negara (BTN)",
			acc_number: "9346934287942994",
			status: 1,
			deleted: 0,
			created_at: "2023-09-23T23:08:00.000000Z",
			updated_at: "2023-09-23T23:41:05.000000Z",
			icon: "/images/008.png",
		},
		{
			id: "9a34adfc-ca0d-4489-a040-f6f09b0ebc3e",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			acc_name: "Syaifudin Ramadhan",
			bank_name: "Bank Tabungan Negara (BTN)",
			acc_number: "556247284525838",
			status: 0,
			deleted: 0,
			created_at: "2023-09-23T23:08:00.000000Z",
			updated_at: "2023-09-23T23:41:05.000000Z",
			icon: "/images/008.png",
		},
	];
	//   const banks = [];
	const banksName = {
		200: "Bank Tabungan Negara (BTN)",
		213: "Bank BTPN",
		422: "Bank BRI Syariah (BSI)",
		427: "Bank BNI Syariah (BSI)",
		441: "Bank Bukopin",
		451: "Bank Mandiri Syariah (BSI)",
		536: "Bank BCA Syariah",
		"008": "Bank Mandiri",
		"002": "Bank Rakyat Indonesia (BRI)",
		"014": "Bank Central Asia (BCA)",
		"009": "Bank Negara Indonesia (BNI)",
		"022": "Bank CIMB Niaga",
		"028": "Bank OCBC NISP",
		"019": "Panin Bank",
		"011": "Bank Danamon",
		"---": "Other Bank",
	};

	const wds = [
		{
			id: "9a358b56-c5e0-49dc-9710-3170659017b2",
			event_id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
			org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
			bill_acc_id: "9a358aaa-6ad6-47ed-9534-6bd820667506",
			nominal: 25000,
			status: 0,
			created_at: "2023-09-24T09:26:56.000000Z",
			updated_at: "2023-09-24T09:26:56.000000Z",
			event: {
				id: "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
				org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
				slug: "testing-updated",
				name: "testing updated",
				category: "-",
				topics: "-",
				logo: "/storage/event_banners/Screenshot 2023-09-14 220354_1694915108.png",
				desc: "-",
				snk: "-",
				exe_type: "online",
				location: "-",
				province: "-",
				city: "-",
				start_date: "2023-09-20",
				end_date: "2023-09-23",
				start_time: "08:00:00",
				end_time: "12:00:00",
				is_publish: 4,
				instagram: "-",
				twitter: "-",
				website: "-",
				twn_url: "-",
				deleted: 0,
				created_at: "2023-09-17T01:39:14.000000Z",
				updated_at: "2023-09-24T09:26:56.000000Z",
			},
			organization: {
				id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
				user_id: "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
				type: "test2",
				name: "test update",
				slug: "test-update",
				photo:
					"/storage/org_avatars/Screenshot 2023-09-11 231858_1694914178.png",
				banner:
					"/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
				interest: "-",
				email: "-",
				linkedin: "-",
				instagram: "-",
				twitter: "-",
				whatsapp: "-",
				website: "-",
				desc: "lorem ipsum dolor sit amet",
				deleted: 0,
				created_at: "2023-09-17T01:25:15.000000Z",
				updated_at: "2023-09-17T01:30:44.000000Z",
			},
			bank: {
				id: "9a358aaa-6ad6-47ed-9534-6bd820667506",
				org_id: "9a26ca30-4579-48fa-99fb-7d487ac702da",
				bank_name: "200",
				acc_number: "fsrtdfygfdyfg67488y",
				status: 1,
				created_at: "2023-09-24T09:25:03.000000Z",
				updated_at: "2023-09-24T09:26:48.000000Z",
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

	const handleOpenDeleteWd = (wdId) => {
		setContentNotify(
			<>
				<div>Apakah kamu ingin menghapus pengajuan withdraw ini ?</div>
				<div className={styles2.IconPopUp}>
					<BiQuestionMark color={"#CA0C64"} fontWeight={"600"} />
				</div>
				<div className={styles2.FormControl}>
					<Button
						title={"Hapus"}
						center={true}
						fnOnClick={() => {
							handleDeleteProcessWd(wdId);
						}}
					/>
					<Button
						title={"Batal"}
						bgColor={"white"}
						textColor={"rgb(202, 12, 100"}
						center={true}
						fnOnClick={handleCancelProcess}
					/>
				</div>
			</>
		);
		setPopUpTitle("Hapus Withdraw");
		setpopupNotify(true);
	};

	const handleDeleteProcessWd = (wdId) => {
		setLoadingPopUp(true);
		// calling backend
		dummyLoad().then((res) => {
			res
				? setContentNotify(
						<>
							<div>Withdraw telah dihapus</div>
							<div className={styles2.IconPopUp}>
								<BiCheckCircle style={{ color: "green" }} fontWeight={600} />
							</div>
						</>
				  )
				: setContentNotify(
						<>
							<div>Withdraw gagal dihapus</div>
							<div className={styles2.IconPopUp}>
								<BiError color={"#CA0C64"} fontWeight={"600"} />
							</div>
						</>
				  );
			// execute reload function if res === true
			setLoadingPopUp(false);
			setTimeout(() => {
				setpopupNotify(false);
				setContentNotify(<></>);
			}, 2000);
		});
	};

	const handleOpenFormOtp = (bankAccId) => {
		setPopUpTitle("Verifikasi Rekening");
		setContentNotify(
			<form onSubmit={handleVerifyOtpProcess}>
				<div className={styles2.InputForm}>
					<input
						type="hidden"
						name="id"
						value={bankAccId}
						ref={fieldOtp.idBank}
					/>
					<label>Kode OTP :</label>
					<InputForm
						type={"text"}
						placeholder={"Input Kode OTP"}
						refData={fieldOtp.fieldOtp}
					/>
				</div>
				<div className={styles2.FormControl}>
					<Button title={"Verifikai"} typeBtn="submit" center={true} />
					<Button
						title={"Batal"}
						bgColor={"white"}
						textColor={"rgb(202, 12, 100"}
						center={true}
						fnOnClick={handleCancelProcess}
					/>
				</div>
			</form>
		);
		setpopupNotify(true);
	};

	const handleVerifyOtpProcess = (evt) => {
		evt.preventDefault();
		let idBank = fieldOtp.idBank.current.value;
		if (
			!fieldOtp.fieldOtp.current.value ||
			fieldOtp.fieldOtp.current.value === "" ||
			fieldOtp.fieldOtp.current.value === " " ||
			!fieldOtp.idBank.current.value ||
			fieldOtp.idBank.current.value === "" ||
			fieldOtp.idBank.current.value === " "
		) {
			setContentNotify(
				<>
					<div>Kode OTP Wajib Diisi !!!</div>
					<div className={styles2.IconPopUp}>
						<BiError color={"#CA0C64"} fontWeight={"600"} />
					</div>
				</>
			);
			setTimeout(() => {
				console.log(idBank);
				handleOpenFormOtp(idBank);
			}, 2000);
		} else {
			setLoadingPopUp(true);
			// calling Backend
			dummyLoad().then((res) => {
				res
					? setContentNotify(
							<>
								<div>Verifikasi Berhasil</div>
								<div className={styles2.IconPopUp}>
									<BiCheckCircle
										fontWeight={"600"}
										style={{ color: "green" }}
									/>
								</div>
							</>
					  )
					: setContentNotify(
							<>
								<div>Verifikasi Gagal. Silahkan coba lagi !!!</div>
								<div className={styles2.IconPopUp}>
									<BiError color={"#CA0C64"} fontWeight={"600"} />
								</div>
							</>
					  );
				// reload function
				setLoadingPopUp(false);
				setTimeout(() => {
					if (res) {
						setpopupNotify(false);
						setContentNotify(<></>);
					} else {
						handleOpenFormOtp(idBank);
					}
				}, 2000);
			});
		}
	};

	const handleOpenDelete = (idBank) => {
		setPopUpTitle("Hapus Rekening");
		setContentNotify(
			<>
				<div>Apakah kamu ingin menghapus rekening ini ?</div>
				<div className={styles2.IconPopUp}>
					<BiQuestionMark color={"#CA0C64"} fontWeight={"600"} />
				</div>
				<div className={styles2.FormControl}>
					<Button
						title={"Hapus"}
						center={true}
						fnOnClick={() => {
							handleDeleteProcess(idBank);
						}}
					/>
					<Button
						title={"Batal"}
						bgColor={"white"}
						textColor={"rgb(202, 12, 100"}
						center={true}
						fnOnClick={handleCancelProcess}
					/>
				</div>
			</>
		);
		setpopupNotify(true);
	};

	const handleDeleteProcess = (idBank) => {
		setLoadingPopUp(true);
		// calling backend
		dummyLoad().then((res) => {
			res
				? setContentNotify(
						<>
							<div>Rekening telah dihapus</div>
							<div className={styles2.IconPopUp}>
								<BiCheckCircle style={{ color: "green" }} fontWeight={600} />
							</div>
						</>
				  )
				: setContentNotify(
						<>
							<div>Rekening gagal dihapus</div>
							<div className={styles2.IconPopUp}>
								<BiError color={"#CA0C64"} fontWeight={"600"} />
							</div>
						</>
				  );
			// execute reload function if res === true
			setLoadingPopUp(false);
			setTimeout(() => {
				setpopupNotify(false);
				setContentNotify(<></>);
			}, 2000);
		});
	};

	const handleCancelProcess = () => {
		setPopUpTitle("");
		setContentNotify(<></>);
		setpopupNotify(false);
	};

	const handleAddBankRq = () => {
		setFormAddBank(
			<tr>
				<td>
					<div style={{ marginBottom: "310px" }}>
						<Select
							placeholder={"Pilih Bank"}
							ref={fieldFormAddBank.bank}
							options={Object.keys(banksName).map((key) => {
								return {
									label: (
										<div className={styles3.LabeledColumn}>
											<img
												className={styles3.IconLabel}
												src={"/images/008.png"}
											/>
											<div className={styles3.TitleLabel}>{banksName[key]}</div>
										</div>
									),
									value: key,
								};
							})}
							styles={{
								option: (basicStyle, state) => ({
									...basicStyle,
									backgroundColor: state.isFocused ? "#fecadf" : "white",
								}),
							}}
							onChange={(value) => {
								fieldFormAddBank.bank.current.value = value;
							}}
						/>
					</div>
				</td>
				<td>
					<div style={{ marginBottom: "310px", marginTop: "auto" }}>
						<InputForm
							type={"text"}
							placeholder={"Pemilik Rekening"}
							refData={fieldFormAddBank.accName}
						/>
					</div>
				</td>
				<td>
					<div style={{ marginBottom: "310px", marginTop: "auto" }}>
						<InputForm
							type={"text"}
							placeholder={"Nomor Rekening"}
							refData={fieldFormAddBank.accNum}
						/>
					</div>
				</td>
				<td>
					<Button
						style={{ marginBottom: "310px" }}
						title={"Simpan"}
						bgColor={"white"}
						textColor={"rgb(202, 12, 100"}
						center={true}
						fnOnClick={handleSubmitAddBank}
					/>
				</td>
				<td>
					<Button
						icon={<BiX />}
						center={true}
						bgColor={"red"}
						textColor={"white"}
						style={{ width: "unset", marginBottom: "310px" }}
						fnOnClick={handleCancelAddBankRq}
					/>
				</td>
			</tr>
		);
	};

	const handleCancelAddBankRq = () => {
		setFormAddBank(<></>);
	};

	const handleSubmitAddBank = () => {
		const fnSetNotify = (msg) => {
			setPopUpTitle("Tambah Rekening");
			setContentNotify(
				<>
					<div>{msg}</div>
					<div className={styles2.IconPopUp}>
						<BiError color={"#CA0C64"} fontWeight={"600"} />
					</div>
				</>
			);
			setpopupNotify(true);
			setTimeout(() => {
				setpopupNotify(false);
				setContentNotify(<></>);
			}, 3000);
		};
		if (
			!fieldFormAddBank.bank.current.value &&
			(!fieldFormAddBank.accName.current.value ||
				fieldFormAddBank.accName.current.value === "" ||
				fieldFormAddBank.accName.current.value === " ") &&
			(!fieldFormAddBank.accNum.current.value ||
				fieldFormAddBank.accNum.current.value === "" ||
				fieldFormAddBank.accNum.current.value === " ")
		) {
			fnSetNotify("Semua field wajib diisi !!!");
		} else if (!fieldFormAddBank.bank.current.value) {
			fnSetNotify("Field nama bank wajib diisi !!!");
		} else if (
			!fieldFormAddBank.accName.current.value ||
			fieldFormAddBank.accName.current.value === "" ||
			fieldFormAddBank.accName.current.value === " "
		) {
			fnSetNotify("Nama pemilik rekening wajib diisi !!!");
		} else if (
			!fieldFormAddBank.accNum.current.value ||
			fieldFormAddBank.accNum.current.value === "" ||
			fieldFormAddBank.accNum.current.value === " "
		) {
			fnSetNotify("Nomor rekening wajib diisi !!!");
		} else {
			setLoadingPopUp(true);
			setPopUpTitle("Tambah Rekening");
			setpopupNotify(true);
			// calling backend
			dummyLoad().then((res) => {
				res ? (
					setContentNotify(
						<>
							<div>Nomor rekening berhasil ditambahkan</div>
							<BiCheckCircle style={{ color: "green" }} fontWeight={600} />
						</>
					)
				) : (
					<>
						<div>Nomor rekening gagal ditambahkan</div>
						<BiError color={"#CA0C64"} fontWeight={600} />
					</>
				);
				// fn calling reload data banks account
				setLoadingPopUp(false);
				setTimeout(() => {
					setpopupNotify(false);
					setContentNotify(<></>);
					if (res) {
						handleCancelAddBankRq();
						handleOpenFormOtp("fdfffr");
					}
				});
			});
		}
	};

	const handleDownloadReport = () => {
		let content = [];
		availableWds.data.forEach((avl) => {
			content.push({
				event_name: avl.event.name,
				event_id: avl.event.id,
				start_event: avl.event.start_date,
				end_event: avl.event.end_date,
				city: avl.event.city,
				category: avl.event.category,
				amount: avl.origin_amount,
				commission: parseFloat(avl.commision) * 100 + "%",
				admin_fee: avl.admin_fee,
				final_amount: avl.amount,
			});
		});
		let data = [
			{
				sheet: "Billing Report",
				columns: [
					{ label: "Nama Event", value: "event_name" },
					{ label: "Event ID", value: "event_id" },
					{ label: "Tanggal Mulai", value: "start_event" },
					{ label: "Tanggal Akhir", value: "end_event" },
					{ label: "Kota", value: "city" },
					{ label: "Kategori", value: "category" },
					{ label: "Total Keuangan", value: "amount" },
					{ label: "Komisi Tiket", value: "commission" },
					{ label: "Biaya Admin", value: "admin_fee" },
					{ label: "Total Penghasilan", value: "final_amount" },
				],
				content: content,
			},
		];
		let settings = {
			fileName: "Laporan_Keuangan", // Name of the resulting spreadsheet
			extraLength: 10, // A bigger number means that columns will be wider
			writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
			writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
			RTL: false, // Display the columns from right-to-left (the default value is false)
		};
		xlsx(data, settings);
	};

	const handleSelect = (evt) => {
		let idEvent = evt.value;
		let event = events.find((event) => event.id === idEvent);
		setSelectedEvent({ value: event.id, label: event.name });
	};

	const handleSelectBank = (evt) => {
		setSelectedAccBank(evt.value);
	};

	const handleSubmitWd = (evt) => {
		evt.preventDefault();
		setPopUpTitle("Pengajuan Withdraw");
		setpopupNotify(true);
		if (!dataTable) {
			setContentNotify(
				<>
					<div>Pengajuan Withdraw gagal dibuat</div>
					<div className={styles2.IconPopUp}>
						<BiError color={"#CA0C64"} fontWeight={"600"} />
					</div>
				</>
			);
			setTimeout(() => {
				setpopupNotify(false);
				setContentNotify(<></>);
			}, 2000);
		} else {
			setLoadingPopUp(true);
			dummyLoad().then((res) => {
				setContentNotify(
					res === false ? (
						<>
							<div>Pengajuan Withdraw gagal dibuat</div>
							<div className={styles2.IconPopUp}>
								<BiError color={"#CA0C64"} fontWeight={"600"} />
							</div>
						</>
					) : (
						<>
							<div>
								Pengajuan Withdraw brhasil dibuat. Silahkan tunggu informasi
								dari kami melalui email dan Whatsapp kamu.
							</div>
							<div className={styles2.IconPopUp}>
								<BiCheckCircle color={"green"} fontWeight={"600"} />
							</div>
						</>
					)
				);
				setLoadingPopUp(false);
				setTimeout(() => {
					setpopupNotify(false);
					setContentNotify(<></>);
					// reload page if submit success
				}, 2000);
			});
		}
	};

	useEffect(() => {
		if (selectedEvent !== null) {
			let data = availableWds.data.find(
				(avl) => avl.event.id === selectedEvent.value
			);
			setDataTable(data);
		}
	}, [selectedEvent]);

	useEffect(() => {
		document.title = "Billing - Agendakota";
		selectedEvent === null &&
			setSelectedEvent({ label: events[0].name, value: events[0].id });
		if (formAddBank !== <></>) {
			window.scrollTo(0, document.body.scrollHeight);
		}
		if (banks.length === 0) {
			handleAddBankRq();
		}
	});

	return (
		<>
			<PopUp
				title={popUpTitle}
				width="45%"
				isActive={popupNotify}
				setActiveFn={setpopupNotify}
				content={
					<div className={styles2.PopupNotify}>
						{isLoadingPopUp ? <Loading /> : contentNotify}
					</div>
				}
			/>
			<HeaderOrganizer
				active={"billing"}
				activeOrg={localStorage.getItem("active-org")}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
			/>
			<SidebarOrganizer
				active={"billing"}
				activeOrg={localStorage.getItem("active-org")}
				orgSelected={orgSelected}
				setOrgSelected={setOrgSelected}
			/>
			<div className="content organizer">
				<div className={styles.TitleArea} style={{ marginBottom: "27.5px" }}>
					<h1 className={styles.Title}>Billing</h1>
					<Toggler
						value={viewing}
						setValue={setViewing}
						options={["Report", "Banks", "Withdrawals"]}
					/>
				</div>

				{viewing === "Report" &&
					(events.length === 0 ? (
						<div className={styles.BlankData}>
							<img
								className={`${styles.IconBlank} ${styles.IconBlank2}`}
								src="/images/blank_events.png"
							/>
							<div className={styles.BlankTitle}>
								Belum ada event yang kamu buat
							</div>
							<div className={styles.BlankDesc}>
								Tap pada tombol ‘Create event’ untuk mmebuat event baru
							</div>
						</div>
					) : (
						<div>
							<h5 className={styles2.BillingTitle}>Pilih Event</h5>
							<div
								className={styles.TitleArea}
								style={{ marginBottom: "27.5px" }}
							>
								<div>
									<Select
										className={styles2.EventSelector}
										options={events.map((event) => {
											return {
												value: event.id,
												label: event.name,
											};
										})}
										value={selectedEvent}
										styles={{
											option: (basicStyle, state) => ({
												...basicStyle,
												backgroundColor: state.isFocused ? "#fecadf" : "white",
											}),
										}}
										onChange={handleSelect}
									/>
								</div>
								<Button
									icon={<BiDownload />}
									title={"Download Report"}
									style={{ width: "unset", marginLeft: "auto" }}
									fnOnClick={handleDownloadReport}
								/>
							</div>
							<h5 className={styles2.BillingTitle}>
								Total penghasilan tersedia :{" "}
							</h5>
							<div className={styles2.TotalAmount}>
								Rp. {numberFormat.format(availableWds.total_amount)},00
							</div>
							{dataTable ? (
								<Table className={styles3.BorderedHeader} responsive>
									<thead>
										<tr>
											<th>Jumlah Penghasilan</th>
											<th>Tiket Komisi</th>
											<th>Admin Fee</th>
											<th>Pendapatan Bersih</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												Rp. {numberFormat.format(dataTable.origin_amount)},00
											</td>
											<td>{parseFloat(dataTable.commision) * 100}%</td>
											<td>{dataTable.admin_fee}</td>
											<td>Rp. {numberFormat.format(dataTable.amount)},00</td>
										</tr>
									</tbody>
								</Table>
							) : (
								<div className={styles2.BlankDataTable}>
									<div className={styles2.IconPopUp}>
										<BiError color={"#CA0C64"} fontWeight={"600"} />
									</div>
									<div>
										Kamu belum bisa mengajukan withdraw untuk event ini !!!
									</div>
								</div>
							)}
							<form onSubmit={handleSubmitWd} className={styles2.FormAddWd1}>
								<label>Pilih Rekening :</label>
								<div className={styles2.FormWd1Content}>
									<Select
										required
										className={styles2.EventSelector}
										placeholder={"Pilih Rekening"}
										options={
											banks.length > 0
												? banks.map((bank) => {
														return {
															value: bank.id,
															label: bank.bank_name + " - " + bank.acc_number,
														};
												  })
												: [
														{
															value: null,
															label: (
																<a
																	href="#Banks"
																	style={{
																		textDecoration: "none",
																		textAlign: "center",
																	}}
																>
																	<Button
																		icon={<BiPlusCircle />}
																		title={"Rekening"}
																		center={true}
																		bgColor={"#CA0C6414"}
																		textColor={"rgb(202, 12, 100)"}
																		borderColor={"#fff"}
																		style={{
																			width: "100%",
																		}}
																		fnOnClick={() => setViewing("Banks")}
																	/>
																</a>
															),
														},
												  ]
										}
										styles={{
											option: (basicStyle, state) => ({
												...basicStyle,
												backgroundColor: state.isFocused ? "#fecadf" : "white",
											}),
										}}
										onChange={handleSelectBank}
									/>
									<Button title={"Withdraw"} typeBtn="submmit" />
								</div>
							</form>
						</div>
					))}
				{viewing === "Banks" && (
					<div>
						<h5 className={styles2.BillingTitle}>Bank Account</h5>

						<div className={styles3.BoxTable}>
							<Table className={styles3.BorderedHeader} responsive>
								<thead>
									<tr>
										<td>
											<div>Nama Bank</div>
										</td>
										<td>
											<div>Pemilik Rekening</div>
										</td>
										<td>
											<div>Nomor Rekening</div>
										</td>
										<td>
											<div>Status</div>
										</td>
										<td>Aksi</td>
									</tr>
								</thead>
								<tbody>
									{banks.map((bank) => {
										return (
											<tr>
												<td>
													<div className={styles3.LabeledColumn}>
														<img
															className={styles3.IconLabel}
															src={bank.icon}
														/>
														<div className={styles3.TitleLabel}>
															{bank.bank_name}
														</div>
													</div>
												</td>
												<td>{bank.acc_name}</td>
												<td>{bank.acc_number}</td>
												<td>
													{bank.status === 0 ? (
														<Button
															title={"Input OTP"}
															bgColor={"white"}
															textColor={"rgb(202, 12, 100)"}
															style={{ width: "unset" }}
															fnOnClick={() => {
																handleOpenFormOtp(bank.id);
															}}
														/>
													) : (
														<Button
															title={"Verified"}
															icon={<BiCheckCircle />}
															bgColor={"green"}
															textColor={"white"}
															borderColor={"green"}
															center={true}
															style={{ width: "unset" }}
														/>
													)}
												</td>
												<td>
													<Button
														icon={<BiTrash />}
														bgColor={"red"}
														center={true}
														style={{ width: "unset" }}
														textColor={"white"}
														fnOnClick={() => {
															handleOpenDelete(bank.id);
														}}
													/>
												</td>
											</tr>
										);
									})}
									{formAddBank}
								</tbody>
							</Table>
						</div>

						<div className={styles2.AddListTbl} onClick={handleAddBankRq}>
							<BiPlusCircle className={styles2.IconAddListTbl} />
							<div className={styles2.TitleAddListTbl}>Tambah Rekening</div>
						</div>
					</div>
				)}
				{viewing === "Withdrawals" && (
					<div>
						<h5 className={styles2.BillingTitle}>Withdraw Data</h5>
						{wds.length === 0 ? (
							<div className={styles.BlankData}>
								<img
									style={{ marginTop: "50px", marginBottom: "50px" }}
									className={`${styles.IconBlank} ${styles.IconBlank2}`}
									src="/images/wallet.png"
								/>
								<div className={styles.BlankTitle}>
									Belum ada data pengajuan penarikan dana
								</div>
								<div className={styles.BlankDesc}>
									<Button
										title={"Ajukan Witdraw"}
										center={true}
										style={{ width: "140px", margin: "auto" }}
										fnOnClick={() => {
											setViewing("Report");
										}}
									/>
								</div>
							</div>
						) : (
							<>
								<div className={styles3.BoxTable}>
									<Table className={styles3.BorderedHeader} responsive>
										<thead>
											<tr>
												<td>
													<div>Nama Event</div>
												</td>
												<td>
													<div>Organizer</div>
												</td>
												<td>
													<div>Tanggal Berakhir Event</div>
												</td>
												<td>
													<div>Nominal Withdraw</div>
												</td>
												<td>
													<div>Rekening</div>
												</td>
												<td>
													<div>Status</div>
												</td>
												<td>
													<div>Aksi</div>
												</td>
											</tr>
										</thead>
										<tbody>
											{wds.map((wd) => {
												return (
													<tr>
														<td>{wd.event.name}</td>
														<td>{wd.organization.name}</td>
														<td>
															{moment(wd.event.end_date)
																.locale("id")
																.format("d MMMM YYYY")}
														</td>
														<td>{wd.nominal}</td>
														<td>
															<div className={styles3.LabeledColumn}>
																<img
																	className={styles3.IconLabel}
																	src={"/images/008.png"}
																/>
																<div className={styles3.TitleLabel}>
																	{wd.bank.acc_number}
																</div>
															</div>
														</td>
														<td>
															{wd.status === 0 ? (
																<Button
																	title={"Tertunda"}
																	bgColor={"yellow"}
																	borderColor={"yellow"}
																	textColor={"black"}
																	style={{ width: "unset" }}
																	icon={<BiTimer />}
																	center={true}
																/>
															) : wd.status === -1 ? (
																<Button
																	title={"Gagal"}
																	icon={<BiX />}
																	bgColor={"red"}
																	textColor={"white"}
																	borderColor={"red"}
																	center={true}
																	style={{ width: "unset" }}
																/>
															) : (
																<Button
																	title={"Selesai"}
																	icon={<BiCheckCircle />}
																	bgColor={"green"}
																	textColor={"white"}
																	borderColor={"green"}
																	center={true}
																	style={{ width: "unset" }}
																/>
															)}
														</td>
														<td>
															{wd.status === 1 &&
															(wd.event.categorycategory == "Attraction" ||
																wd.event.categorycategory ==
																	"Daily Activities" ||
																wd.event.categorycategory ==
																	"Tour Travel (recurring)") ? (
																<Button
																	icon={<BiTrash />}
																	bgColor={"grey"}
																	center={true}
																	borderColor={"grey"}
																	style={{ width: "unset" }}
																	textColor={"white"}
																/>
															) : (
																<Button
																	icon={<BiTrash />}
																	bgColor={"red"}
																	center={true}
																	style={{ width: "unset" }}
																	textColor={"white"}
																	fnOnClick={() => {
																		handleOpenDeleteWd(wd.id);
																	}}
																/>
															)}
														</td>
													</tr>
												);
											})}
										</tbody>
									</Table>
								</div>
								<div
									className={styles2.AddListTbl}
									onClick={() => {
										setViewing("Report");
									}}
								>
									<BiPlusCircle className={styles2.IconAddListTbl} />
									<div className={styles2.TitleAddListTbl}>Ajukan Withdraw</div>
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default OrganizerBilling;
