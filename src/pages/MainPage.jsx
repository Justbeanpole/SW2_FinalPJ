import Detail from '../components/Detail';
import './pageSty/MP.css'

const MainPage = () => {
    return (
        <div className="main-page">
            <div className="main-header">
                <div className="menu-btn material-symbols-outlined">menu</div>
                <div className="header-content">내역</div>
                <div className="material-symbols-outlined account">account_circle</div>
                </div>
            <div className="main-content">
                <div className="menu-bar">
                    <div>내역</div>
                    <div>달력</div>
                    <div>자산</div>
                    <div>통계</div>
                    <div>예산</div>
                    <div>설정</div>
                </div>
                <div className="mainSection">
                    <div className="top-section">
                        <div className="right-section">
                            <div className="right-content">
                                <span className="material-symbols-outlined arrow-btn">
                                    chevron_left
                                </span>
                                <div className="btn month-btn">2024년 12월</div>
                                <span className="material-symbols-outlined arrow-btn">
                                    chevron_right
                                </span>
                            </div>
                            <div className="btn current-month-btn">이번달</div>
                        </div>
                        <div className="btn-search">
                            <button className="search-btn material-symbols-outlined">search</button>
                        </div>
                    </div>
                    <Detail></Detail>
                </div>
                <div className="floating-add-btn material-symbols-outlined">add</div>
            </div>
        </div>
    )
}
export default MainPage