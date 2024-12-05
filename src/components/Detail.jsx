import History from "./History";
import './style/detailsty.css'

const Detail = () => {
    return (
        <div className="detail">
            <div className="topSection">
                <div className="summary total">
                    전체 <span>0원</span>
                </div>
                <div className="summary income">
                    수입 <span>0원</span>
                </div>
                <div className="summary expense">
                    지출<span>0원</span>
                </div>
            </div>
            <div className="middleSection">
                <input type="checkbox"/>
                <div>날짜</div>
                <div>자산</div>
                <div>분류</div>
                <div>금액</div>
                <div>내용</div>
            </div>
            <div className="historySection">
                {/*<div className="empty-state">*/}
                {/*    <img src="/empty-icon.png" alt="empty"/>*/}
                {/*    <p>데이터가 없습니다.</p>*/}
                {/*</div>*/}
                <History></History>
                <History></History>
                <History></History>
            </div>
        </div>
    )
}

export default Detail
