import History from "./History";
import './style/detailsty.css'
import {useEffect, useState} from "react";
import axios from "axios";

const Detail = ({fetchHistory,data, activeTab}) => {
    const [activeCategory, setActiveCategory] = useState(null)
    const [sortDirection, setSortDirection] = useState(null)
    const [checkedItems, setCheckedItems] = useState([]); // 체크된 아이템 ID 저장
    const [isAllChecked, setIsAllChecked] = useState(false); // 전체 체크 상태

    const handleActCategory = (cateName) => {
        if (activeCategory === cateName) {
            if (sortDirection === 'asc') {
                setSortDirection("desc")
            } else if (sortDirection === 'desc') {
                setActiveCategory(null)
                setSortDirection(null)
            } else {
                setSortDirection("asc")
            }
        } else {
            setActiveCategory(cateName)
            setSortDirection("asc")
        }
    }
    const deterArrowDir = (cateName) => {
        return activeCategory === cateName && (sortDirection === "asc" ? "▲" : "▼")
    }

    const sortInOut = () => {
        if (data === null || data === undefined) {
            return  []
        }
        return activeTab === "total"
            ? data
            : data.filter((item) => item.type === activeTab)
    }

    const sortDataFunc = () => {
        if (sortDirection === "asc") {
            return activeCategory === 'amount'
                ? sortInOut().sort((a, b) => a[activeCategory] - b[activeCategory])
                : sortInOut().sort((a, b) => a[activeCategory].localeCompare(b[activeCategory]))
        } else if (sortDirection === "desc") {
            return activeCategory === 'amount'
                ? sortInOut().sort((a, b) => b[activeCategory] - a[activeCategory])
                : sortInOut().sort((a, b) => b[activeCategory].localeCompare(a[activeCategory]))
        } else {

            return sortInOut().sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate))
        }
    }
    const handleCheckboxChange = (id) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter((item) => item !== id));
        } else {
            setCheckedItems([...checkedItems, id]);
        }
    };

    const handleToggleAll = () => {
        if (isAllChecked) {
            // 전체 선택 해제
            setCheckedItems([]);
        } else {
            // 모든 항목 선택
            setCheckedItems(sortDataFunc().map((item) => item.id));
        }
    };


    // 체크 상태 동기화
    useEffect(() => {
        const allIds = sortDataFunc().map((item) => item.id);
        setIsAllChecked(allIds.every((id) => checkedItems.includes(id)));
    }, [checkedItems]);
    useEffect(() => {
        setCheckedItems([])
        setIsAllChecked(false)
    }, [activeTab])


    return (
        <div className="detail">
            <CategoryBar
                activeCategory={activeCategory}
                sortDirection={sortDirection}
                handleActCategory={handleActCategory}
                deterArrowDir={deterArrowDir}
                checkedItems={checkedItems}
                handleToggleAll={handleToggleAll}
                isAllChecked={isAllChecked}
                data={sortDataFunc()}
                fetchHistory={fetchHistory}
                setCheckedItems={setCheckedItems}
            ></CategoryBar>
            <div className="historySection">
                {sortDataFunc().map((item) => (
                    <History
                        {...item}
                        key={item.id}
                        isChecked={checkedItems.includes(item.id)}
                        onCheckboxChange={() => handleCheckboxChange(item.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Detail

const CategoryBar = ({
                         activeCategory,
                         deterArrowDir,
                         handleActCategory,
                         checkedItems,
                         isAllChecked,
                         handleToggleAll,
                         data,
                         fetchHistory,
                         setCheckedItems
                     }) => {
    const handleDelHistory = async () => {
        try {
            const response = await axios.post("http://localhost:8080/delDetail", {
                params: {
                    detailIid: checkedItems,
                },
            });
            alert("삭제 성공")
            console.log("삭제 성공:", response.data);
            setCheckedItems([])
            fetchHistory()
        } catch (error) {
            alert("삭제 실패")
            console.error("삭제 실패:", error);
        }
    }
    return (
        <div className="middleSection">
            {checkedItems.length > 0 ? (
                <div className="selection-info">
                    <input
                        className="selection-info-input"
                        type="checkbox"
                        checked={isAllChecked && data.length > 0} // 전체 선택 상태
                        onChange={handleToggleAll} // 전체 선택/해제
                    />
                    <div>{checkedItems.length}개 선택했습니다.</div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className="material-symbols-outlined trash-button" onClick={handleDelHistory}>
                        delete
                    </div>
                </div>
            ) : (<div className="category-info">
                <input
                    type="checkbox"
                    checked={isAllChecked && data.length > 0} // 전체 선택 상태
                    onChange={handleToggleAll} // 전체 선택/해제
                />
                <div
                    className={activeCategory === "createdDate" ? "activeChar" : ""}
                    onClick={() => handleActCategory("createdDate")}>
                    날짜{deterArrowDir("createdDate")}</div>
                <div
                    className={activeCategory === "asset" ? "activeChar" : ""}
                    onClick={() => handleActCategory("asset")}>
                    자산{deterArrowDir("asset")}</div>
                <div
                    className={activeCategory === "category" ? "activeChar" : ""}
                    onClick={() => handleActCategory("category")}>
                    분류{deterArrowDir("category")}</div>
                <div
                    className={activeCategory === "amount" ? "activeChar" : ""}
                    onClick={() => handleActCategory("amount")}>
                    금액{deterArrowDir("amount")}</div>
                <div
                    className={activeCategory === "content" ? "activeChar" : ""}
                    onClick={() => handleActCategory("content")}>
                    내용{deterArrowDir("content")}</div>
            </div>)}

        </div>
    )
}