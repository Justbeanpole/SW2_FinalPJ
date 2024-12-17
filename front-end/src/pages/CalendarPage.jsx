import {useEffect, useRef, useState} from "react";
import './pageSty/calendarSty.css'
import {format, addMonths, subMonths, formatDate} from 'date-fns';
import {startOfMonth, endOfMonth, startOfWeek, endOfWeek} from 'date-fns';
import {isSameMonth, isSameDay, addDays, parse} from 'date-fns';
import InOutBtn from "../components/InOutBtn";
import Details from "../components/Detail";
import Detail from "../components/Detail";
import inOutBtn from "../components/InOutBtn";



const CalendarPage = ({data, currentMonth, nextMonth, prevMonth, nowMonth, activeTab, handleTabChange}) => {

    /* === State === */
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedDate, setClickedDate] = useState(null);

    const handleDateClick = (e) => {
        isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
        checkTarget(e)
    };
    const checkTarget = (e) => {
        setClickedDate(e.currentTarget.getAttribute('data-key'))
    }

    //전체 합 값 가져오기
    const calTotalCal = () => {
        let incomeTotal = 0
        let expenseTotal = 0
        let total = 0
        try{
            data.forEach(item => {
                item.type === 0 ? incomeTotal += item.amount : expenseTotal += item.amount;
                item.type === 0 ? total += item.amount : total -= item.amount;
            })
        }
        catch (e){
            console.log(e)
        }
        return {
            total,
            incomeTotal,
            expenseTotal,
        }
    }

    const dateData = () => {
        try {
            return data.filter((item) => format (item.createdDate, 'yyyy-MM-dd') === format(clickedDate, 'yyyy-MM-dd'));
        }
        catch (e) {
            return null
        }
    }


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
                <InOutBtn
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    totalCount={calTotalCal()}
                ></InOutBtn>
                <CalDays></CalDays>
                <CalCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    handleDateClick={handleDateClick}
                    data = {data}
                    activeTab={activeTab}
                ></CalCells>
            </div>
            {isModalOpen ? <SelectedDayDetail
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                handleDateClick={handleDateClick}
                data={dateData()}
                totalCount = {()=> calTotalCal(data)}
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


const CalCells = ({currentMonth, selectedDate, handleDateClick, data, activeTab}) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);


    const calculateDailyTotals = (cellDate) => {
        let all = 0
        let income =0
        let expense = 0;
        try{
            data.forEach((item) => {
                const formattedDate = format(new Date(cellDate), "yyyy-MM-dd");
                if(format(item["createdDate"],'yyyy-MM-dd') === formattedDate){
                    item.type === 0 ? income += item.amount : expense += item.amount;
                    item.type === 0 ? all += item.amount : all -= item.amount;
                }
            });
        }
        catch (e) {
            console.log(e);
        }


        return {
            "all" : all,
            "income": income,
            "expense": expense,
        };
    };


    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = ''

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'dd')
            const dailyData = calculateDailyTotals(day);
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
                     data-key={format(new Date(day), "yyyy-MM-dd")}
                     onClick={handleDateClick}>
                    <span
                        className={format(currentMonth, 'M') !== format(day, 'M')
                            ? 'text not-valid'
                            : ''}>
                        {formattedDate}
                    </span>
                    <div className="dateCount">
                        {activeTab !== 1 && dailyData.income !== 0 && (
                            <div className="dateTotal income">{dailyData.income}</div>
                        )}
                        {activeTab !== 0 &&dailyData.expense !== 0 && (
                            <div className="dateTotal expense">{dailyData.expense}</div>
                        )}
                        {activeTab === 'total'&&dailyData.all !== 0 && (
                            <div className="dateTotal all">{dailyData.all}</div>
                        )}
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

const SelectedDayDetail = ({handleDateClick, activeTab, data, handleTabChange}) => {
    const dateTotalCal = () => {
        let incomeTotal = 0
        let expenseTotal = 0
        let total = 0
        try{
            data.forEach(item => {
                item.type === 0 ? incomeTotal += item.amount : expenseTotal += item.amount;
                item.type === 0 ? total += item.amount : total -= item.amount;
            })
        }
        catch (e){
            console.log(e)
        }
        return {
            total,
            incomeTotal,
            expenseTotal,
        }
    }
    return (
        <div className="modal-page">
            <div className="selected-page">
                <div
                    className="material-symbols-outlined btnClose"
                    onClick={handleDateClick}
                >
                    close
                </div>
                <InOutBtn
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    totalCount={dateTotalCal()}
                ></InOutBtn>
                <Detail
                    data={data}
                    activeTab={activeTab}
                ></Detail>
            </div>
        </div>
    )
}