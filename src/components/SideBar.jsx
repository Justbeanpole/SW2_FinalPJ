import './style/sideBarSty.css'

const SideBar = ({ isOpen }) => {
    return (
        <div className={`side-bar ${isOpen ? "visible" : ""}`}>
            <h2 className="title">입력</h2>
            <div className="tab-buttons">
                <button className="tab-button">수입</button>
                <button className="tab-button active">지출</button>
            </div>
            <div className="form-container">
                <div className="form-group">
                    <div className="form-label">날짜</div>
                    <div className="form-input">
                        <input type="text" value="24. 12. 10." readOnly />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-label">금액</div>
                    <div className="amount-input">
                        <input type="number" placeholder="금액 입력" />
                        <span>원</span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-label">분류</div>
                    <div className="form-input">
                        <select>
                            <option>선택</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-label">자산</div>
                    <div className="form-input">
                        <select>
                            <option>선택</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-label">내용</div>
                    <div className="form-input">
                        <input type="text" placeholder="내용 입력" />
                    </div>
                </div>
                <div className="buttons">
                    <button className="save-btn">저장</button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;