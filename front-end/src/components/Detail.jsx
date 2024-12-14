import History from "./History";
import './style/detailsty.css'
import {useEffect, useState} from "react";

const Detail = ({data, activeTab}) => {
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
        return activeTab === "total"
            ? data
            : data.filter((item) => item.inOut === activeTab)
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
            return sortInOut().sort((a, b) => a["createdDate"].localeCompare(b["createdDate"]))
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
            setCheckedItems(sortDataFunc().map((item) => item.detailId));
        }
    };


    // 체크 상태 동기화
    useEffect(() => {
        const allIds = sortDataFunc().map((item) => item.detailId);
        setIsAllChecked(allIds.every((detailId) => checkedItems.includes(detailId)));
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
                checkedCount={checkedItems.length}
                handleToggleAll={handleToggleAll}
                isAllChecked={isAllChecked}
                data={sortDataFunc()}
            ></CategoryBar>
            <div className="historySection">
                {sortDataFunc().map((item) => (
                    <History
                        {...item}
                        key={item.detailId}
                        isChecked={checkedItems.includes(item.detailId)}
                        onCheckboxChange={() => handleCheckboxChange(item.detailId)}
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
                         checkedCount,
                         isAllChecked,
                         handleToggleAll,
                         data
                     }) => {
    return (
        <div className="middleSection">
            {checkedCount > 0 ? (
                <div className="selection-info">
                    <input
                        className="selection-info-input"
                        type="checkbox"
                        checked={isAllChecked && data.length > 0} // 전체 선택 상태
                        onChange={handleToggleAll} // 전체 선택/해제
                    />
                    <div>{checkedCount}개 선택했습니다.</div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className="material-symbols-outlined trash-button" onClick={() => console.log("삭제 버튼 클릭")}>
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