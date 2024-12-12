import {useEffect, useState} from "react";
import './pageSty/calendarSty.css'
import {format, addMonths, subMonths, formatDate} from 'date-fns';
import {startOfMonth, endOfMonth, startOfWeek, endOfWeek} from 'date-fns';
import {isSameMonth, isSameDay, addDays, parse} from 'date-fns';
import InOutBtn from "../components/InOutBtn";
import Details from "../components/Detail";
import Detail from "../components/Detail";
import inOutBtn from "../components/InOutBtn";


const CalendarPage = ({currentMonth, nextMonth, prevMonth, nowMonth}) => {
    /* === State === */
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDateClick = (date, onOff) => {
        setSelectedDate(date);
        setIsModalOpen(onOff);
    };
    useEffect(() => {
        // isOpenDate ?
    })

    return (
        <div className="calendar-page">
            <div className="cal-header">
                <CalHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    nowMonth={nowMonth}
                ></CalHeader>
            </div>
            <div className="calendar-content">
                <InOutBtn></InOutBtn>
                <CalDays></CalDays>
                <CalCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    handleDateClick={handleDateClick}
                ></CalCells>
            </div>
            {isModalOpen ? <SelectedDayDetail
                handleDateClick={handleDateClick}
            ></SelectedDayDetail> : null}
        </div>
    )
}

export default CalendarPage

/* Calender Header */
const CalHeader = ({currentMonth, prevMonth, nextMonth, nowMonth}) => {
    return (
        <div className="cal-header-content">
            <div className="cal-month-section">
                <span className="cal-month">{format(currentMonth, 'MM')}월</span>
                <span className="cal-year">{format(currentMonth, 'yyyy')}</span>
            </div>
            <div className="cal-current-month-btn" onClick={nowMonth}>이번달</div>
            <div className="change-month">
                <span className="material-symbols-outlined cal-header-arrow" onClick={prevMonth}>
                    chevron_left
                </span>
                <div className="cal-header-month">{format(currentMonth, 'yyyy')}-{format(currentMonth, 'MM')}</div>
                <span className="material-symbols-outlined cal-header-arrow" onClick={nextMonth}>
                    chevron_right
                </span>
            </div>
        </div>
    )
}

/* Calender Days */
const CalDays = () => {
    const days = [];
    const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="colDay" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
}

const CalCells = ({currentMonth, selectedDate, handleDateClick}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = ''

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'dd')
            days.push(
                <div className={`col cell ${
                    !isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                                ? 'not-valid' : 'valid'
                }`}
                     key={day}
                     onClick={() => handleDateClick(day, true)}>
                    <span
                        className={format(currentMonth, 'M') !== format(day, 'M')
                            ? 'text not-valid'
                            : ''}>
                        {formattedDate}
                    </span>
                        <div className = "dateCount">
                        <div className="dateTotal income">{0}</div>
                        <div className="dateTotal expense">{0}</div>
                        <div className="dateTotal all">{0}</div>
                        </div>
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
    return (
        <div className="body">{rows}</div>
    )
}

const SelectedDayDetail = ({handleDateClick}) => {
    return (
        <div className="modal-page">
            <div className="selected-page">
                <div
                    className="material-symbols-outlined btnClose"
                    onClick={() => handleDateClick(null, false)}
                >
                    close
                </div>
                <InOutBtn></InOutBtn>
                <Detail></Detail>
            </div>
        </div>
    )
}