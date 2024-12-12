import './style/inOutSty.css'
import {useState} from "react";

const InOutBtn = () => {
    const [activeTab, setActiveTab] = useState('전체')

    const handleTabChange = (type) => {
        setActiveTab(type)
    }

    return (
        <div className="topSection">
            <div
                className={`summary total ${activeTab === '전체' ? 'active' : ''}`}
                onClick={() => handleTabChange("전체")}>
                전체 <span>0원</span>
            </div>
            <div
                className={`summary income ${activeTab === '수입' ? 'active' : ''}`}
                onClick={() => handleTabChange("수입")}
            >
                수입 <span>0원</span>
            </div>
            <div
                className={`summary expense ${activeTab === '지출' ? 'active' : ''}`}
                onClick={() => handleTabChange("지출")}
            >
                지출<span>0원</span>
            </div>
            <div
                className="underline"
                style={{
                    transform: `translateX(${
                        activeTab === '전체'
                            ? "-100%"
                            : activeTab === "수입" ? "0%"
                                : activeTab === "지출" ? "100%"
                                    : "-100%"})`,
                }}
            ></div>
        </div>
    )
}

export default InOutBtn;