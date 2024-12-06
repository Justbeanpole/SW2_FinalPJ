import History from "./History";
import InOutBtn from "./InOutBtn";
import './style/detailsty.css'

const Detail = () => {
    return (
        <div className="detail">
            <InOutBtn />
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
