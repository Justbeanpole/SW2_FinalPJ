import History from "./History";
import './style/detailsty.css'
import {useState} from "react";

const Detail = () => {
    return (
        <div className="detail">
            <CategoryBar></CategoryBar>
            <div className="historySection">
                <History></History>
                <History></History>
                <History></History>
            </div>
        </div>
    )
}

export default Detail

const CategoryBar = () => {
    const [activeCategory, setActiveCategory] = useState(null)
    const [sortDirection, setSortDirection] = useState(null)

    const handleActCategory = (cateName) => {
        if(activeCategory === cateName) {
            if (sortDirection === 'asc') {
                setSortDirection("desc")
            }
           else if (sortDirection === 'desc') {
               setActiveCategory(null)
               setSortDirection(null)
            }
           else{
               setSortDirection("asc")
            }
        }
        else{
            setActiveCategory(cateName)
            setSortDirection("asc")
        }
    }
    const deterArrowDir = (cateName) => {
        return activeCategory === cateName && (sortDirection === "asc" ? "▲" : "▼")
    }

    return (
        <div className="middleSection">
            <input type="checkbox"/>
            <div
                className={activeCategory === "날짜" ? "activeChar" : ""}
                onClick={()=>handleActCategory("날짜")}>
                날짜{deterArrowDir("날짜")}</div>
            <div
                className={activeCategory === "자산" ? "activeChar" : ""}
                onClick={()=>handleActCategory("자산")}>
                자산{deterArrowDir("자산")}</div>
            <div
                className={activeCategory === "분류" ? "activeChar" : ""}
                onClick={()=>handleActCategory("분류")}>
                분류{deterArrowDir("분류")}</div>
            <div
                className={activeCategory === "금액" ? "activeChar" : ""}
                onClick={()=>handleActCategory("금액")}>
                금액{deterArrowDir("금액")}</div>
            <div
                className={activeCategory === "내용" ? "activeChar" : ""}
                onClick={()=>handleActCategory("내용")}>
                내용{deterArrowDir("내용")}</div>
        </div>
    )
}