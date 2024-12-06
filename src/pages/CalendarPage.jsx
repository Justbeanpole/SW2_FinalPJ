import {useState} from "react";
import './pageSty/calendarSty.css'
import {addMonths, format, subMonths} from "date-fns";



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
            <CalDays></CalDays>
            <div className="cal-cells">cell</div>
        </div>
    )
}

export default CalendarPage

/* Calender Header */
const CalHeader = ({currentMonth, prevMonth, nextMonth}) => {
    return (
        <div className="cal-header-content">
            <div className="cal-month-section">
                <span className="cal-month">{format(currentMonth,'MM')}월</span>
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
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return(
        <div className="days rows">{days}</div>
    )
}