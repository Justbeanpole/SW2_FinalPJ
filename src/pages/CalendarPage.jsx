import {useState} from "react";
import './pageSty/calendarSty.css'
import {format, addMonths, subMonths, formatDate} from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import InOutBtn from "../components/InOutBtn";



const CalendarPage = () => {
    /* === State === */
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    /* === Function === */
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    return (
        <div className="calendar-page">
            <div className="cal-header">
                <CalHeader currentMonth={currentMonth}></CalHeader>
            </div>
            <div className="calendar-content">
                <InOutBtn></InOutBtn>
                <CalDays></CalDays>
                <CalCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                ></CalCells>
            </div>

        </div>
    )
}

export default CalendarPage

/* Calender Header */
const CalHeader = ({currentMonth, prevMonth, nextMonth}) => {
    return (
        <div className="cal-header-content">
            <div className="cal-month-section">
                <span className="cal-month">{format(currentMonth, 'MM')}월</span>
                <span className="cal-year">{format(currentMonth,'yyyy')}</span>
            </div>
            <div className="cal-current-month-btn">이번달</div>
            <div className="change-month">
                <span className="material-symbols-outlined cal-header-arrow">
                    chevron_left
                </span>
                <div className="cal-header-month">2024-12</div>
                <span className="material-symbols-outlined cal-header-arrow">
                    chevron_right
                </span>
            </div>
        </div>
    )
}

/* Calender Days */
const CalDays = () => {
    const days = [];
    const date = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="colDay" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
}

const CalCells = ({currentMonth, selectedDate}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days =[];
    let day = startDate;
    let formattedDate =''

    while(day <= endDate) {
        for (let i = 0; i < 7; i++){
            formattedDate = format(day, 'dd')
            days.push(
                <div className={`col cell ${
                    !isSameMonth(day, monthStart)
                        ?'disabled'
                        :isSameDay(day, selectedDate)
                        ?'selected'
                        :format(currentMonth, 'M') !== format(day,'M')
                        ?'not-valid' :'valid'
                }`}
                key={day}>
                    <span
                    className={format(currentMonth, 'M') !== format(day,'M')
                    ?'text not-valid'
                    :''}>
                        {formattedDate}
                    </span>
                </div>

            )
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        )
        days = [];
    }
    return  (
        <div className="body">{rows}</div>
    )
}