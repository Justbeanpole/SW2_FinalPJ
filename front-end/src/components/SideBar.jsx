import React, {useEffect, useState} from "react";
import "./style/sideBarSty.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./style/datePickerSty.css";
import {ko} from "date-fns/locale"
import axios from "axios";
import {format} from "date-fns";

const SideBar = ({isOpen, fetchHistory}) => {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [inOutState, setInOutState] = useState(1);
    const [amount, setAmount] = useState(""); // 금액 상태
    const [category, setCategory] = useState(""); // 분류 상태
    const [asset, setAsset] = useState(""); // 자산 상태
    const [content, setContent] = useState(""); // 내용 상태
    const [fetchCategories, setFetchCategories] = useState(null);

    const handleSave = async () => {
        const requestData = {
            date: selectedDay,
            type: inOutState,
            amount: parseInt(amount),
            category: category,
            asset: asset,
            content: content,
        };

        try {
            // axios POST 요청
            const response = await axios.post("http://localhost:8080/createDetail", requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("서버 응답:", response.data);
            alert("저장되었습니다!");
            setInOutState(1)
            setSelectedDay(new Date());
            setAmount("")
            setCategory("")
            setAsset("")
            setContent("")
            fetchHistory();
        } catch (error) {
            console.error("데이터 전송 실패:", error);
            alert("저장에 실패했습니다.");
        }
    };
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category', {
                    params: {
                        userId: 1,
                    }
                })
                setFetchCategories(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategory();

    }, [inOutState]);

    return (<div className={`side-bar ${isOpen ? "visible" : ""}`}>
        <h2 className="title">입력</h2>
        <div className="tab-buttons">
            <button
                className={`tab-button ${inOutState === 0 ? "active" : ""}`}
                onClick={() => setInOutState(0)}
            >
                수입
            </button>
            <button
                className={`tab-button ${inOutState === 1 ? "active" : ""}`}
                onClick={() => setInOutState(1)}
            >
                지출
            </button>
        </div>
        <div className="form-container">
            <div className="form-group">
                <div className="form-label">날짜</div>
                <div className="form-input">
                    <DatePicker
                        selected={selectedDay}
                        onChange={(date) => setSelectedDay(date)}
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        className="date-picker-input"
                        calendarClassName={style}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-label">금액</div>
                <div className="amount-input">
                    <input
                        type="number"
                        placeholder="금액 입력"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}/>
                    <span>원</span>
                </div>
            </div>
            <div className="form-group">
                <div className="form-label">분류</div>
                <div className="form-input">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>선택</option>

                        {fetchCategories === null ? null :
                            inOutState === 1
                            ? fetchCategories.EXPENSE.map((item) => (
                            <option value={item}>{item}</option>)) : fetchCategories.INCOME.map((item) => (<option value={item}>{item}</option>))}
                </select>
            </div>
        </div>
        <div className="form-group">
            <div className="form-label">자산</div>
            <div className="form-input">
                <select
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                >
                    <option>선택</option>
                    <option value="현금">현금</option>
                    <option value="카드">카드</option>
                    <option value="은행">은행</option>
                    <option value="저축">저축</option>
                </select>
            </div>
        </div>
        <div className="form-group">
            <div className="form-label">내용</div>
            <div className="form-input">
                <input
                    type="text"
                    placeholder="내용 입력"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
        <div className="buttons">
            <button className="save-btn"
                    disabled={(category !== "선택" && asset !== "선택" && amount !== "" && amount !== "0") ? "" : "disable"}
                    onClick={handleSave}>저장
            </button>
        </div>
    </div>
</div>
)
    ;
};

export default SideBar;
