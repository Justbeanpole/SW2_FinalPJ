import './style/inOutSty.css'
import {useState} from "react";

const InOutBtn = ({totalCount, activeTab, handleTabChange}) => {
    return (
        <div className="topSection">
            <div
                className={`summary total ${activeTab === 'total' ? 'active' : ''}`}
                onClick={() => handleTabChange("total")}>
                전체 <span>
                {totalCount.total.toLocaleString()}
                원</span>
            </div>
            <div
                className={`summary income ${activeTab === 'INCOME' ? 'active' : ''}`}
                onClick={() => handleTabChange(0)}
            >
                수입 <span>
                {totalCount.incomeTotal.toLocaleString()}
                원</span>
            </div>
            <div
                className={`summary expense ${activeTab === 'EXPENSE' ? 'active' : ''}`}
                onClick={() => handleTabChange(1)}
            >
                지출<span>
                {totalCount.expenseTotal.toLocaleString()}
                원</span>
            </div>
            <div
                className="underline"
                style={{
                    transform: `translateX(${
                        activeTab === 'total'
                            ? "-100%"
                            : activeTab === 0 ? "0%"
                                : activeTab === 1 ? "100%"
                                    : "-100%"})`,
                }}
            ></div>
        </div>
    )
}

export default InOutBtn;