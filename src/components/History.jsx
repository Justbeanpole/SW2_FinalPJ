import './style/historySty.css'

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

const History = () => {
    return (
        // <div className="history-container">
        //     <div className="history-header">
        //         <input type="checkbox" className="header-checkbox"/>
        //         <span className="header-date">날짜</span>
        //         <span className="header-asset">자산</span>
        //         <span className="header-category">분류</span>
        //         <span className="header-amount">금액</span>
        //         <span className="header-content">내용</span>
        //     </div>
        // </div>
        <div className="history-row">
            <input type="checkbox" className="row-checkbox"/>
            <div className="row-date">24. 12. 5. (목)</div>
            <div className="row-asset">은행</div>
            <div className="row-category">文化 문화생활</div>
            <div className="row-amount">123,123원</div>
        </div>

    );
};


export default History;



