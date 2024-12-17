import './style/historySty.css'
import {format} from "date-fns";

// const History = () => {
//     return (
//         <div className="History">
//             <input type="checkbox"/>
//             <span>날짜</span>
//             <span>자산</span>
//             <span>분류</span>
//             <span>금액</span>
//             <span>내용</span>
//         </div>
//     )
// }

const History = ({
                     id,
                     amount,
                     type,
                     category,
                     content,
                     createdDate,
                     asset,
                     isChecked,
                     onCheckboxChange,
                     }) => {
    return (
        <div className="history-row">
            <input
                type="checkbox"
                className="row-checkbox"
                checked={isChecked} // 개별 상태
                onChange={() => onCheckboxChange(id)} // 상태 업데이트
            />
            <div className="row-date">{format(createdDate,'yyyy-MM-dd')}</div>
            <div className="row-asset">{asset}</div>
            <div className="row-category">{category}</div>
            <div className={`row-amount ${type === 0 ? "income" : "expense"}`}> {amount.toLocaleString()}원</div>
            <div className="row-content">{content}</div>
        </div>
    );
};


export default History;



