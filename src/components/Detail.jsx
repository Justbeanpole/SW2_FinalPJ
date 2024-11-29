import History from "./History";
import './style/detailsty.css'

const Detail = () => {
    return (
        <div className="detail">
            <div className = "topSection">
                <div>전체</div>
                <div>수입</div>
                <div>지출</div>
            </div>
            <div className = "middleSection">
                <input type="checkbox"/>
                <div>날짜</div>
                <div>자산</div>
                <div>분류</div>
                <div>금액</div>
                <div>내용</div>
            </div>
            <div className="historySection">
                <History></History>
            </div>
        </div>
    )
}

export default Detail