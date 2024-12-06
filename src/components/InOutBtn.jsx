import './style/inOutSty.css'

const InOutBtn = () => {
    return (
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
    )
}

export default InOutBtn;