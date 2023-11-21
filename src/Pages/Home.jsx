import React, { useState } from "react";
import Header from "../partials/Header";
import styles from "./styles/Home.module.css";
import Compass from "../icons/Compass";
import AddCircle from "../icons/AddCircle";
import Chip from "../components/Chip";
import Footer from "../partials/Footer";
import Event from "../components/Event";
import CategoryIcons from "../icons/categories";
import Slider from "../components/Slider";
import Button from "../components/Button";
import { BiPlusCircle } from "react-icons/bi";
import Carousel from "../components/Carousel";
import CityCard from "../components/CityCard";
import CardBasic from "../components/CardBasic";

const Home = () => {
    const [city, setCity] = useState('Surabaya');
    const events = [
        {
            "id": "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
            "org_id": "9a26ca30-4579-48fa-99fb-7d487ac702da",
            "slug": "testing-updated",
            "name": "Australia & UK Top Ranked Universities - Application Day",
            "category": "-",
            "topics": "-",
            "logo": "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230922011910.jpg",
            "desc": "-",
            "snk": "-",
            "exe_type": "online",
            "location": "-",
            "province": "-",
            "city": "-",
            "start_date": "2023-09-20",
            "end_date": "2023-09-25",
            "start_time": "08:00:00",
            "end_time": "12:00:00",
            "is_publish": 1,
            "instagram": "-",
            "twitter": "-",
            "website": "-",
            "twn_url": "-",
            "custom_fields": "",
            "seat_map": null,
            "single_trx": 0,
            "deleted": 0,
            "created_at": "2023-09-17T01:39:14.000000Z",
            "updated_at": "2023-09-24T09:26:56.000000Z",
            "available_days": [],
            "org": {
                "id": "9a26ca30-4579-48fa-99fb-7d487ac702da",
                "user_id": "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
                "type": "test2",
                "name": "Agendakota",
                "slug": "test-update",
                "photo": "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
                "banner": "/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
                "interest": "-",
                "email": "-",
                "linkedin": "-",
                "instagram": "-",
                "twitter": "-",
                "whatsapp": "-",
                "website": "-",
                "desc": "lorem ipsum dolor sit amet",
                "deleted": 0,
                "created_at": "2023-09-17T01:25:15.000000Z",
                "updated_at": "2023-09-17T01:30:44.000000Z"
            },
            "tickets": [
                {
                    "id": "9a271fce-b9e8-480e-9efc-70139a1e5633",
                    "event_id": "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
                    "name": "Ticket 1",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 1,
                    "price": 10000,
                    "quantity": 3,
                    "start_date": "2023-09-17",
                    "end_date": "2023-09-17",
                    "seat_number": 0,
                    "max_purchase": 0,
                    "deleted": 0,
                    "created_at": "2023-09-17T05:24:40.000000Z",
                    "updated_at": "2023-09-21T03:19:50.000000Z"
                },
                {
                    "id": "9a2bde6a-0d61-4791-8155-43dd6ecbab29",
                    "event_id": "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
                    "name": "Ticket 3",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 3,
                    "price": 15000,
                    "quantity": 7,
                    "start_date": "2023-09-17",
                    "end_date": "2023-09-19",
                    "seat_number": 0,
                    "max_purchase": 0,
                    "deleted": 0,
                    "created_at": "2023-09-19T14:00:57.000000Z",
                    "updated_at": "2023-09-21T06:17:23.000000Z"
                },
                {
                    "id": "9a27205d-cedf-4125-91e4-cb0abf12ec54",
                    "event_id": "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
                    "name": "Ticket 2",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 2,
                    "price": 25000,
                    "quantity": 6,
                    "start_date": "2023-09-17",
                    "end_date": "2023-09-17",
                    "seat_number": 0,
                    "max_purchase": 0,
                    "deleted": 0,
                    "created_at": "2023-09-17T05:26:14.000000Z",
                    "updated_at": "2023-09-21T06:17:23.000000Z"
                },
                {
                    "id": "9a2de1ec-8123-43cb-80a0-95d05fb64231",
                    "event_id": "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
                    "name": "Ticket 4.5",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 2,
                    "price": 25000,
                    "quantity": 7,
                    "start_date": "2023-09-17",
                    "end_date": "2023-09-20",
                    "seat_number": 0,
                    "max_purchase": 0,
                    "deleted": 0,
                    "created_at": "2023-09-20T14:02:25.000000Z",
                    "updated_at": "2023-09-20T14:03:08.000000Z"
                }
            ]
        },
        {
            "id": "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
            "org_id": "9a26ca30-4579-48fa-99fb-7d487ac702da",
            "slug": "testing-attraction-2",
            "name": "[SOLO] MLBB SULTAN CUP RISING STAR",
            "category": "Attraction",
            "topics": "-",
            "logo": "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230926120219_651265db31ebb.jpg",
            "desc": "-",
            "snk": "-",
            "exe_type": "offline",
            "location": "-",
            "province": "-",
            "city": "-",
            "start_date": "2023-10-20",
            "end_date": "2024-10-20",
            "start_time": "23:54:34",
            "end_time": "23:54:34",
            "is_publish": 1,
            "instagram": "-",
            "twitter": "-",
            "website": "-",
            "twn_url": "-",
            "custom_fields": "Dapat info dari mana|Kamu tahu dari apa|Kapan kamu sadarnya",
            "seat_map": "/storage/seat_maps/Screenshot 2023-09-18 204658_1697820874.png",
            "single_trx": 1,
            "deleted": 0,
            "created_at": "2023-10-20T16:54:34.000000Z",
            "updated_at": "2023-10-20T16:54:34.000000Z",
            "available_days": [
                {
                    "id": "9a6a7903-5de6-45b2-a8b9-ea7af9202b50",
                    "event_id": "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
                    "day": "Tue",
                    "max_limit_time": "21:00:00",
                    "created_at": "2023-10-20T16:54:34.000000Z",
                    "updated_at": "2023-10-20T16:54:34.000000Z"
                },
                {
                    "id": "9a6a7903-624f-4e42-8b37-09e17906638f",
                    "event_id": "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
                    "day": "Wed",
                    "max_limit_time": "22:00:00",
                    "created_at": "2023-10-20T16:54:34.000000Z",
                    "updated_at": "2023-10-20T16:54:34.000000Z"
                },
                {
                    "id": "9a6a7903-65ac-419c-9fcd-bc8a5b43be35",
                    "event_id": "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
                    "day": "Thu",
                    "max_limit_time": "17:00:00",
                    "created_at": "2023-10-20T16:54:34.000000Z",
                    "updated_at": "2023-10-20T16:54:34.000000Z"
                }
            ],
            "org": {
                "id": "9a26ca30-4579-48fa-99fb-7d487ac702da",
                "user_id": "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
                "type": "test2",
                "name": "Agendakoat 2",
                "slug": "test-update",
                "photo": "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
                "banner": "/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
                "interest": "-",
                "email": "-",
                "linkedin": "-",
                "instagram": "-",
                "twitter": "-",
                "whatsapp": "-",
                "website": "-",
                "desc": "lorem ipsum dolor sit amet",
                "deleted": 0,
                "created_at": "2023-09-17T01:25:15.000000Z",
                "updated_at": "2023-09-17T01:30:44.000000Z"
            },
            "tickets": [
                {
                    "id": "9a6562c2-c65e-4156-88f4-110922e7cc48",
                    "event_id": "9a654201-ef5e-487c-be43-2cb7af4281ab",
                    "name": "Ticket B",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 3,
                    "price": 0,
                    "quantity": -1,
                    "start_date": "2023-10-21",
                    "end_date": "2024-10-21",
                    "seat_number": 1,
                    "max_purchase": 3,
                    "deleted": 0,
                    "created_at": "2023-10-18T04:13:13.000000Z",
                    "updated_at": "2023-10-20T17:02:10.000000Z"
                },
                {
                    "id": "9a6562f0-d915-48b8-b147-9cde766bca95",
                    "event_id": "9a654201-ef5e-487c-be43-2cb7af4281ab",
                    "name": "Ticket C",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 1,
                    "price": 0,
                    "quantity": -1,
                    "start_date": "2023-10-21",
                    "end_date": "2024-10-21",
                    "seat_number": 1,
                    "max_purchase": 2,
                    "deleted": 0,
                    "created_at": "2023-10-18T04:13:43.000000Z",
                    "updated_at": "2023-10-20T17:02:10.000000Z"
                },
                {
                    "id": "9a656237-31ab-4839-bfb8-56d6a8498955",
                    "event_id": "9a654201-ef5e-487c-be43-2cb7af4281ab",
                    "name": "Ticket A",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 2,
                    "price": 25000,
                    "quantity": -1,
                    "start_date": "2023-10-21",
                    "end_date": "2024-10-21",
                    "seat_number": 1,
                    "max_purchase": 2,
                    "deleted": 0,
                    "created_at": "2023-10-18T04:11:41.000000Z",
                    "updated_at": "2023-10-20T17:02:10.000000Z"
                }
            ]
        },
        {
            "id": "9a26cf2f-96bf-434a-aaf1-5494eae26a90",
            "org_id": "9a26ca30-4579-48fa-99fb-7d487ac702da",
            "slug": "testing-updated",
            "name": "ASPEK DAN PERLINDUNGAN HUKUM ATAS MEREK",
            "category": "-",
            "topics": "-",
            "logo": "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20231012142401_65279f11e3b17.jpg",
            "desc": "-",
            "snk": "-",
            "exe_type": "online",
            "location": "-",
            "province": "-",
            "city": "-",
            "start_date": "2023-09-20",
            "end_date": "2023-09-25",
            "start_time": "08:00:00",
            "end_time": "12:00:00",
            "is_publish": 1,
            "instagram": "-",
            "twitter": "-",
            "website": "-",
            "twn_url": "-",
            "custom_fields": "",
            "seat_map": null,
            "single_trx": 0,
            "deleted": 0,
            "created_at": "2023-09-17T01:39:14.000000Z",
            "updated_at": "2023-09-24T09:26:56.000000Z",
            "available_days": [],
            "org": {
                "id": "9a26ca30-4579-48fa-99fb-7d487ac702da",
                "user_id": "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
                "type": "test2",
                "name": "Agendakota",
                "slug": "test-update",
                "photo": "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
                "banner": "/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
                "interest": "-",
                "email": "-",
                "linkedin": "-",
                "instagram": "-",
                "twitter": "-",
                "whatsapp": "-",
                "website": "-",
                "desc": "lorem ipsum dolor sit amet",
                "deleted": 0,
                "created_at": "2023-09-17T01:25:15.000000Z",
                "updated_at": "2023-09-17T01:30:44.000000Z"
            },
            "tickets": []
        },
        {
            "id": "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
            "org_id": "9a26ca30-4579-48fa-99fb-7d487ac702da",
            "slug": "testing-attraction-2",
            "name": "Rock in Solo Festival 2023",
            "category": "Attraction",
            "topics": "-",
            "logo": "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20230905110542_64f6a91690d6f.jpg",
            "desc": "-",
            "snk": "-",
            "exe_type": "offline",
            "location": "-",
            "province": "-",
            "city": "-",
            "start_date": "2023-10-20",
            "end_date": "2024-10-20",
            "start_time": "23:54:34",
            "end_time": "23:54:34",
            "is_publish": 1,
            "instagram": "-",
            "twitter": "-",
            "website": "-",
            "twn_url": "-",
            "custom_fields": "Dapat info dari mana|Kamu tahu dari apa|Kapan kamu sadarnya",
            "seat_map": "/storage/seat_maps/Screenshot 2023-09-18 204658_1697820874.png",
            "single_trx": 1,
            "deleted": 0,
            "created_at": "2023-10-20T16:54:34.000000Z",
            "updated_at": "2023-10-20T16:54:34.000000Z",
            "available_days": [
                {
                    "id": "9a6a7903-5de6-45b2-a8b9-ea7af9202b50",
                    "event_id": "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
                    "day": "Tue",
                    "max_limit_time": "21:00:00",
                    "created_at": "2023-10-20T16:54:34.000000Z",
                    "updated_at": "2023-10-20T16:54:34.000000Z"
                },
                {
                    "id": "9a6a7903-624f-4e42-8b37-09e17906638f",
                    "event_id": "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
                    "day": "Wed",
                    "max_limit_time": "22:00:00",
                    "created_at": "2023-10-20T16:54:34.000000Z",
                    "updated_at": "2023-10-20T16:54:34.000000Z"
                },
                {
                    "id": "9a6a7903-65ac-419c-9fcd-bc8a5b43be35",
                    "event_id": "9a6a7903-52d5-4abf-9d9a-65ac2fae4878",
                    "day": "Thu",
                    "max_limit_time": "17:00:00",
                    "created_at": "2023-10-20T16:54:34.000000Z",
                    "updated_at": "2023-10-20T16:54:34.000000Z"
                }
            ],
            "org": {
                "id": "9a26ca30-4579-48fa-99fb-7d487ac702da",
                "user_id": "9a26b9cb-1e74-4cad-a23a-2b9ec5b93aa6",
                "type": "test2",
                "name": "Agendakoat 2",
                "slug": "test-update",
                "photo": "https://i1.sndcdn.com/avatars-000225426854-qk8agf-t500x500.jpg",
                "banner": "/storage/org_banners/Screenshot 2023-09-14 220918_1694914178.png",
                "interest": "-",
                "email": "-",
                "linkedin": "-",
                "instagram": "-",
                "twitter": "-",
                "whatsapp": "-",
                "website": "-",
                "desc": "lorem ipsum dolor sit amet",
                "deleted": 0,
                "created_at": "2023-09-17T01:25:15.000000Z",
                "updated_at": "2023-09-17T01:30:44.000000Z"
            },
            "tickets": [
                {
                    "id": "9a6562c2-c65e-4156-88f4-110922e7cc48",
                    "event_id": "9a654201-ef5e-487c-be43-2cb7af4281ab",
                    "name": "Ticket B",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 3,
                    "price": 0,
                    "quantity": -1,
                    "start_date": "2023-10-21",
                    "end_date": "2024-10-21",
                    "seat_number": 1,
                    "max_purchase": 3,
                    "deleted": 0,
                    "created_at": "2023-10-18T04:13:13.000000Z",
                    "updated_at": "2023-10-20T17:02:10.000000Z"
                },
                {
                    "id": "9a6562f0-d915-48b8-b147-9cde766bca95",
                    "event_id": "9a654201-ef5e-487c-be43-2cb7af4281ab",
                    "name": "Ticket C",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 1,
                    "price": 0,
                    "quantity": -1,
                    "start_date": "2023-10-21",
                    "end_date": "2024-10-21",
                    "seat_number": 1,
                    "max_purchase": 2,
                    "deleted": 0,
                    "created_at": "2023-10-18T04:13:43.000000Z",
                    "updated_at": "2023-10-20T17:02:10.000000Z"
                },
                {
                    "id": "9a656237-31ab-4839-bfb8-56d6a8498955",
                    "event_id": "9a654201-ef5e-487c-be43-2cb7af4281ab",
                    "name": "Ticket A",
                    "desc": "Lorem ipsum dolor sit amet",
                    "type_price": 2,
                    "price": 25000,
                    "quantity": -1,
                    "start_date": "2023-10-21",
                    "end_date": "2024-10-21",
                    "seat_number": 1,
                    "max_purchase": 2,
                    "deleted": 0,
                    "created_at": "2023-10-18T04:11:41.000000Z",
                    "updated_at": "2023-10-20T17:02:10.000000Z"
                }
            ]
        }
    ];
    const spotlightEvent = {
        "spotlight": {
            "id": 1,
            "title": "Konser musik 2023 makin nge-jam!",
            "sub_title": "Nonton konser idolamu hingga belajar skill baru kini bisa kamu lakukan hanya dari rumah",
            "banner": "/images/CustomSpotlight.png",
            "view": 1,
            "created_at": "2023-10-29T03:27:50.000000Z",
            "updated_at": "2023-10-29T03:35:26.000000Z"
        },
        "events": events
    };
    const specialDayEvents = {
        "special_day": {
            "title": "Peringatan 10 November",
            "view": true
        },
        "events": events
    };
    const frontBanners = [{
        "name": "Banner 3",
        "url": "https://www.gmail.com",
        "photo": "/images/FrontBanner.png",
        "priority": 1,
        "updated_at": "2023-09-28T01:20:01.000000Z",
        "created_at": "2023-09-28T01:20:01.000000Z",
    },{
        "name": "Banner 3",
        "url": "https://www.gmail.com",
        "photo": "/images/FrontBanner.png",
        "priority": 2,
        "updated_at": "2023-09-28T01:20:01.000000Z",
        "created_at": "2023-09-28T01:20:01.000000Z",
    },{
        "name": "Banner 3",
        "url": "https://www.gmail.com",
        "photo": "/images/FrontBanner.png",
        "priority": 3,
        "updated_at": "2023-09-28T01:20:01.000000Z",
        "created_at": "2023-09-28T01:20:01.000000Z",
    }];
    const selectedEvents = {
        "selected_event": {
            "title": "IDEmu jadi nyata",
            "view": true
        },
        "events": events
    };
    const viralCity = {
        "city": {
            "name": "Surabaya",
            "photo": "/images/City_Surabaya.png",
            'priority': "1"
        },
        "events": events
    };
    const cities = [
        {
            "name": "Surabaya",
            "photo": "/images/City_Surabaya.png",
            'priority': "1"
        },
        {
            "name": "Jakarta",
            "photo": "/images/City_Jakarta.png",
            'priority': "1"
        },
        {
            "name": "Gresik",
            "photo": "/images/City_Gresik.png",
            'priority': "1"
        },
        {
            "name": "Yogyakarta",
            "photo": "/images/City_Yogyakarta.png",
            'priority': "1"
        },

    ];
    const articles = [
        {
            title: "Kerja sama dengan walikota",
            info: "23 Nov 2023",
            cover: "/images/Rectangle3.png",
            desc: "Agenda kota juga merupakan platform dimana kamu bisa membuat eventmu mulai dari gratis hingga berbayar loh!"
        },
        {
            title: "Kerja sama dengan walikota",
            info: "23 Nov 2023",
            cover: "/images/Rectangle3.png",
            desc: "Agenda kota juga merupakan platform dimana kamu bisa membuat eventmu mulai dari gratis hingga berbayar loh!"
        },
        {
            title: "Kerja sama dengan walikota",
            info: "23 Nov 2023",
            cover: "/images/Rectangle3.png",
            desc: "Agenda kota juga merupakan platform dimana kamu bisa membuat eventmu mulai dari gratis hingga berbayar loh!"
        },
        {
            title: "Kerja sama dengan walikota",
            info: "23 Nov 2023",
            cover: "/images/Rectangle3.png",
            desc: "Agenda kota juga merupakan platform dimana kamu bisa membuat eventmu mulai dari gratis hingga berbayar loh!"
        },
        {
            title: "Kerja sama dengan walikota",
            info: "23 Nov 2023",
            cover: "/images/Rectangle3.png",
            desc: "Agenda kota juga merupakan platform dimana kamu bisa membuat eventmu mulai dari gratis hingga berbayar loh!"
        }
    ];

    const categories = [
        {name: "Exhibition", icon: CategoryIcons.Exhibition, event_count: 3},
        {name: "Workshop", icon: CategoryIcons.Workshop, event_count: 23},
        {name: "Conference", icon: CategoryIcons.Conference, event_count: 17},
        {name: "Live Music / Concert", icon: CategoryIcons.Concert, event_count: 37},
        {name: "Show & Performance", icon: CategoryIcons.ShowPerformance, event_count: 20},
        {name: "Attraction", icon: CategoryIcons.Attraction, event_count: 26},
        {name: "Accomodation", icon: CategoryIcons.Accomodation, event_count: 14},
        {name: "Seminar", icon: CategoryIcons.Seminar, event_count: 14},
        {name: "Festival", icon: CategoryIcons.Festival, event_count: 19},
        {name: "Meetups", icon: CategoryIcons.Meetup, event_count: 34},
        {name: "Competition", icon: CategoryIcons.Competition, event_count: 42},
        {name: "Others", icon: CategoryIcons.Other, event_count: 14},
    ];
    const [isLogin, setLogin] = useState(false);

    return (
        <>
            <Header isLogin={isLogin} setLogin={setLogin}/>
            <div className="content">
                <div className={styles.JumboTop}>
                    <div className={styles.JumboTitle}>Platform Management
                        <span className={styles.JumboTitleSpecial}>event,</span>
                        Ticketing, & Reservation
                    </div>
                    <div className={styles.JumboDescription}>
                        Nonton konser idolamu hingga belajar skill baru <div className={styles.DesktopEOL}></div> kini bisa kamu lakukan hanya dari rumah
                    </div>

                    <div className={styles.JumboButtonArea}>
                        <button className={styles.JumboButton}>
                            <Compass />
                            Explore Event
                        </button>
                        <button className={styles.JumboButton}>
                            <AddCircle />
                            Create Event
                        </button>
                    </div>

                    <div className={`${styles.JumboChip} ${styles.JumboOnline}`}>Online</div>
                    <div className={`${styles.JumboChip} ${styles.JumboOnsite}`}>Onsite</div>
                    <div className={`${styles.JumboChip} ${styles.JumboHybrid}`}>Hybrid</div>
                </div>

                <section>
                    <h3 style={{marginTop: 0}}>Trending Events in Various Cities</h3>
                    <Chip options={['Surabaya', 'Jakarta', 'Medan', 'Balikpapan']} value={city} setValue={setCity} multiple={false} />
                    <Slider style={{flexDirection: 'row',marginTop: 20,gap: 20, display: "flex"}} distanceCard={20 * 4} content={
                        events.map((event, e) => (
                            <Event data={event} key={e} />
                        ))
                    } />
                </section>
                    
                <section className={styles.CustomSpotlight}>
                    <div>
                        <div className={styles.CustomSpotBox} style={{backgroundImage: `url("${spotlightEvent.spotlight.banner}")`}}>
                            <div className={styles.CustomSpotText}>
                                <div className={styles.CustomSpotTitle}>
                                    {spotlightEvent.spotlight.title}
                                </div>
                                <div className={styles.CustomSpotSubtitle}>
                                    {spotlightEvent.spotlight.sub_title}
                                </div>
                                <Button title={"Create Event"} icon={<BiPlusCircle />} classes={[styles.ButtonBasic]}/>
                            </div>
                            <div className={styles.CustomSpotEvents}>
                                <Slider 
                                    style={{flexDirection: 'row',marginTop: 20,gap: 20, display: "flex", padding: "0px"}} 
                                    distanceCard={20 * 4} 
                                    navigatorClasses={[styles.CustomNavSlideSpot]}
                                    content={
                                        spotlightEvent.events.map((event, e) => (
                                            <Event data={event} key={e} />
                                        ))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 style={{marginTop: 0}}>{specialDayEvents.special_day.title}</h3>
                    <Slider style={{flexDirection: 'row',marginTop: 20,gap: 20, display: "flex"}} distanceCard={20 * 4} content={
                        specialDayEvents.events.map((event, e) => (
                            <Event data={event} key={e} />
                        ))
                    } />
                    <div className={styles.SelectedEvent}>
                        <Button title={<div>Lihat Semuanya</div>} classes={[styles.ButtonBasic]}/>
                    </div>
                </section>

                <section>
                    <Carousel contents={frontBanners} navigatorClasses={[styles.CustomNavCarousel]}/>
                </section>

                <section>
                    <h3 style={{marginTop: 0}}>{selectedEvents.selected_event.title}</h3>
                    <Slider style={{flexDirection: 'row',marginTop: 20,gap: 20, display: "flex"}} distanceCard={20 * 4} content={
                        selectedEvents.events.map((event, e) => (
                            <Event data={event} key={e} />
                        ))
                    } />
                    <div className={styles.SelectedEvent}>
                        <Button title={<div>Lihat Semuanya</div>} classes={[styles.ButtonBasic]}/>
                    </div>
                </section>

                <section>
                    <h3 style={{marginTop: 0}}>Temukan Berbagai Kategori Event</h3>
                    <div className={styles.CategoryArea}>
                        {
                            categories.map((category, c) => (
                                <div key={c} className={styles.CategoryItem}>
                                    <img src={category.icon} alt={category.name} />
                                    <div className={styles.CategoryInfo}>
                                        <div className={styles.CategoryName}>{category.name}</div>
                                        <div className={styles.CategoryEvents}>{category.event_count} events</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </section>

                <section>
                    <h3 style={{marginTop: 0}}>Tempat nongki #VIRAL di {viralCity.city.name}</h3>
                    <Chip options={['Hiburan', 'Kuliner', 'Shoping', 'Healing', 'Kesehatan', 'Kecantikan']} value={city} setValue={setCity} multiple={false} />
                    <Slider style={{flexDirection: 'row',marginTop: 20,gap: 20, display: "flex"}} distanceCard={20 * 4} content={
                        viralCity.events.map((event, e) => (
                            <Event data={event} key={e} />
                        ))
                    } />
                    <div className={styles.SelectedEvent}>
                        <Button title={<div>Lihat Semuanya</div>} classes={[styles.ButtonBasic]}/>
                    </div>
                </section>

                <section>
                    <h3 style={{marginTop: 0}}>Event di kota lain</h3>
                    <Slider style={{flexDirection: 'row',marginTop: 20,gap: 20, display: "flex"}} distanceCard={20 * 4} content={
                        cities.map((city) => (
                            <CityCard data={city}/>
                        ))
                    } />
                </section>

                <section className={styles.CustomSpotlight}>
                    <div className={`${styles.JumboTop} ${styles.AbsoluteBg}`} />
                    <div className={styles.JumboSec}>
                        <div className={styles.JumboSecL}>
                            <div className={styles.JumboTitle}>Atur dan buat event meriahmu sendiri!
                            </div>
                            <div className={styles.JumboDescription}>
                            Agenda kota juga merupakan platform dimana kamu bisa membuat eventmu mulai dari gratis hingga berbayar loh! </div>
                            <Button title={"Create Event"} icon={<BiPlusCircle />} classes={[styles.ButtonBasic]}/>
                        </div>
                        <div className={styles.JumboSecR}>
                            <img src="/images/FrontCover1.png" alt="" srcset="" />
                        </div>
                    </div>
                </section>

                <section>
                    <div className={styles.JumboSec} style={{gap: "80px"}}>
                        <div className={styles.Col2}>
                            <img className={styles.FrontCover2} style={{marginTop: "16px", marginBottom: "16px", maxWidth: "530px", marginLeft: "auto", marginRight: "auto"}} src="/images/FrontCover2.png" />
                        </div>
                        <div className={styles.Col2}>
                            <div className={styles.JumboTitle}>
                                Amati penjualan tiket dari eventmu dengan mudah!
                            </div>
                            <div className={styles.JumboDescription}>
                                Agenda kota juga merupakan platform dimana kamu bisa membuat eventmu mulai dari gratis hingga berbayar loh!
                            </div>
                            <Button title={"Create Event"} icon={<BiPlusCircle />} classes={[styles.ButtonBasic]} style={{width: "150px"}}/>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 style={{marginTop: 0}}>Agenda Inspiration</h3>
                    <Slider style={{flexDirection: 'row',marginTop: 20,gap: 20, display: "flex"}} distanceCard={20 * 4} content={
                        articles.map((article) => {
                            return <CardBasic data={article} />
                        })
                    } />
                </section>

                <Footer />
            </div>
        </>
    )
}

export default Home