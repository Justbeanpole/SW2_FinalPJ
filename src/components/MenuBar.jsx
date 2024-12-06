import {Link} from "react-router-dom";
import './style/menuSty.css'

const MenuBar = () => {
    return (
        <div className="menu-bar">
            <div>내역</div>
            <div><Link to={'/cal'}>달력</Link></div>
            <div>자산</div>
            <div>통계</div>
            <div>예산</div>
            <div>설정</div>
        </div>
    )
}
export default MenuBar;