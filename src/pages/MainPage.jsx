import Detail from '../components/Detail';
import './pageSty/MP.css'
import Header from '../components/Header'
import MenuBar from "../components/MenuBar";


const MainPage = () => {
    return (
        <div className="mainSection">
            <div className="top-section">
                <div className="right-section">
                    <div className="right-content">
                                <span className="material-symbols-outlined arrow-btn">
                                    chevron_left
                                </span>
                        <div className="btn month-btn">2024-12</div>
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
    )
}
export default MainPage