import Detail from '../components/Detail';
import './pageSty/MP.css'
import InOutBtn from "../components/InOutBtn";
import {useEffect, useState} from "react";
import {format} from "date-fns";
import axios from "axios";


const MainPage = ({fetchHistory,data, currentMonth, prevMonth, nextMonth, nowMonth, activeTab, handleTabChange}) => {


    //전체 합 가져오기
    const totalCount = () => {
        let incomeTotal = 0
        let expenseTotal = 0
        let total = 0
        try{
            data.forEach(item => {
                item.type === 0 ? incomeTotal += item.amount : expenseTotal += item.amount;
                item.type === 0 ? total += item.amount : total -= item.amount;
            })
        }
        catch (error) {
            console.log(error);
        }

        return {
            total,
            incomeTotal,
            expenseTotal,
        }
    }

    const [searchContent, setSearchContent] = useState("")
    const handleSearchContent = (e) => {
        setSearchContent(e.target.value)
    }

    const searchResHis = () => {
        return  searchContent === ""
            ? data : data.filter((item) => item.content.includes(searchContent))
    }


    return (
        <div className="mainSection">
            <TopSection
                currentMonth={currentMonth}
                nextMonth={nextMonth}
                prevMonth={prevMonth}
                nowMonth={nowMonth}
                searchContent={searchContent}
                handleSearchContent={handleSearchContent}
            ></TopSection>
            <InOutBtn
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                totalCount={totalCount()}
            ></InOutBtn>
            <Detail
                data={searchResHis()}
                activeTab={activeTab}
                fetchHistory={fetchHistory}
            ></Detail>
        </div>
    )
}
export default MainPage

const TopSection = ({currentMonth, prevMonth, nextMonth, nowMonth, searchContent, handleSearchContent}) => {
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
                {openSearchInput
                    ? <input
                        type="text"
                        className="search-input"
                        onChange={handleSearchContent}
                        value={searchContent}
                    /> : null}
                <button
                    className="search-btn material-symbols-outlined"
                    onClick={handleSearchInput}
                >search
                </button>
            </div>
        </div>
    )
}