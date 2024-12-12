import Detail from '../components/Detail';
import './pageSty/MP.css'
import InOutBtn from "../components/InOutBtn";
import {useState} from "react";
import {format} from "date-fns";

const MainPage = ({currentMonth, prevMonth, nextMonth, nowMonth}) => {

    return (
        <div className="mainSection">
            <TopSection
                currentMonth={currentMonth}
                nextMonth={nextMonth}
                prevMonth={prevMonth}
                nowMonth={nowMonth}
            ></TopSection>
            <InOutBtn/>
            <Detail></Detail>
        </div>
    )
}
export default MainPage

const TopSection = ({currentMonth, prevMonth, nextMonth, nowMonth}) => {
    const [openSearchInput, setOpenSearchInput] = useState(false)

    const handleSearchInput = () => {
        openSearchInput ? setOpenSearchInput(false) : setOpenSearchInput(true)
    }

    return (
        <div className="top-section">
            <div className="right-section">
                <div className="right-content">
                    <span
                        className="material-symbols-outlined arrow-btn"
                        onClick={prevMonth}>
                        chevron_left
                    </span>
                    <div className="btn month-btn">
                        {format(currentMonth, 'yyyy')}-{format(currentMonth, 'MM')}
                    </div>
                    <span
                        className="material-symbols-outlined arrow-btn"
                        onClick={nextMonth}>
                        chevron_right
                    </span>
                </div>
                <div className="btn current-month-btn" onClick={nowMonth}>이번달</div>
            </div>
            <div
                className="btn-search"
            >
                {openSearchInput ? <input type="text" className="search-input"/> : null}
                <button
                    className="search-btn material-symbols-outlined"
                    onClick={handleSearchInput}
                >search</button>
            </div>
        </div>
    )
}