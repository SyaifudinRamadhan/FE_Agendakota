import React, { useEffect, useState } from "react";
import styles from "./styles/Event.module.css";
import moment, { locale } from "moment";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import config from "../config";

const Event = ({data, config = null, maxWidth = '32.1%', style = {}, className = []}) => {
    const classNames = [styles.Event].concat(className);
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [nowDate, setNow] = useState(new Date());
    const [isExpandDays, setExpandDays] = useState(false);
    const [price, setPrice] = useState(-1);
    const [numberFormat, setNumFormat] = useState(Intl.NumberFormat('id-ID'));

    const mapDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const mapDayInd = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
    
    useEffect(()=>{
        if(startDate === null && nowDate !== null){
            if(data.available_days.length > 0){
                let stateFill = false;
                data.available_days.every(dayData => {
                    if(nowDate.getDay() === mapDay.indexOf(dayData.day)){
                        setStartDate(nowDate.toLocaleDateString('en-US'));
                        setStartTime(dayData.max_limit_time);
                        //console.log(dayData.max_limit_time, "set time");
                        stateFill = true;
                        return false;
                    }else if(nowDate.getDay() < mapDay.indexOf(dayData.day)){
                        let distance = mapDay.indexOf(dayData.day) - nowDate.getDay();
                        nowDate.setDate(nowDate.getDate()+distance);
                        setStartDate(nowDate.toLocaleDateString('en-US'));
                        setStartTime(dayData.max_limit_time);
                        //console.log(dayData.max_limit_time, "set time 2");
                        stateFill = true;
                        return false
                    }
                    return true;
                });
                if(!stateFill){
                    let distance = (mapDay.indexOf(data.available_days[0].day) + 7) - nowDate.getDay();
                    nowDate.setDate(nowDate.getDate()+distance);
                    setStartDate(nowDate.toLocaleDateString('en-US'));
                    setStartTime(data.available_days[0].max_limit_time);
                    //console.log(data.available_days[0].day, "set time 3"); 
                }
            }else{
                setStartDate(data.start_date);
                setEndDate(data.end_date);
                //console.log(data.start_time, "set time 4");
            }
            //console.log(startTime, startDate);
        }
    }, [startDate, nowDate]);

    useEffect(() => {
        if(price == -1 && data.tickets.length > 0){
            setPrice(parseInt(data.tickets[0].price));
            console.log(data.tickets[0].price);
        }
    }, [price]);

    const printAvlDays = (dayData) => {
        return (<div className={styles.Info}>
            <div>{mapDayInd[mapDay.indexOf(dayData.day)]}</div> 
            <div>Buka sampai {moment(startDate+' '+dayData.max_limit_time).locale('id').format('HH:mm')} WIB</div>
        </div>);
    }

    const expand = () => {
        setExpandDays(!isExpandDays);
    }

    return (
        <div className={classNames.join(" ")} style={style}>
            <img src={data.logo} alt={data.name} className={styles.Cover} style={config !== null && config.hasOwnProperty('coverStyle') ? config.coverStyle : null} />
            <div style={{marginTop: 10}}>
                <div className={styles.Title}>{data.name}</div>
                <div className={styles.Price}><div className={styles.PriceNumber}>{price === -1 ? "Tiket Belum Tersedia" : (price === 0 ? "FREE" : <>RP. {numberFormat.format(price)},00</>)}</div></div>
                <div className={styles.Info}>
                    {data.available_days.length > 0 ? (<>
                        {moment(startDate).format('ddd') == nowDate.toLocaleDateString('en-US', {weekday: 'short'}) ?
                            <div style={{color: "#00964E"}}>
                                Hari Ini
                            </div>
                            :
                            <div>
                                {mapDayInd[mapDay.indexOf(moment(startDate).locale('id').format('ddd'))]}, {moment(startDate).locale('id').format('DD MMM Y')}    
                            </div>
                        }
                        |
                        <div>Buka sampai {moment(startDate+' '+startTime).locale('id').format('HH:mm')} WIB</div>
                        {isExpandDays ? <BiUpArrow onClick={expand}/> : <BiDownArrow onClick={expand}/>}
                    </>) : (<>
                        {moment(startDate).format('ddd') == nowDate.toLocaleDateString('en-US', {weekday: 'short'}) ?
                            <div style={{color: "#00964E"}}>
                                Hari Ini
                            </div>
                            :
                            <div>
                                {mapDayInd[mapDay.indexOf(moment(startDate).locale('id').format('ddd'))]}, {moment(startDate).locale('id').format('DD MMM Y')}    
                            </div>
                        }
                        |
                        {moment(endDate).format('ddd') == nowDate.toLocaleDateString('en-US', {weekday: 'short'}) ?
                            <div style={{color: "#00964E"}}>
                                Hari Ini
                            </div>
                            :
                            <div>
                                {mapDayInd[mapDay.indexOf(moment(endDate).locale('id').format('ddd'))]}, {moment(endDate).locale('id').format('DD MMM Y')}    
                            </div>
                        }
                    </>)}
                </div>
                <div>
                    {isExpandDays && data.available_days.map(printAvlDays)}
                </div>
                <hr className={styles.HrSeparator}></hr>
                <div className={styles.Organizer}>
                    <img src={data.org.photo}/>
                    <b>{data.org.name}</b>
                </div>
            </div>
        </div>
    )
}

export default Event;