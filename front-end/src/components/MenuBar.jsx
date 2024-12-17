import {Link, useNavigate} from "react-router-dom";
import './style/menuSty.css';
import { useState } from "react";

const MenuBar = ({location}) => {
    /* === State ===  */
    const [isHovering, setHovering] = useState(false);

    /* === Nav ===*/
    const navigate = useNavigate();

    /* === Function === */
    const handleMouseOver = () => {
        setHovering(true);
    };
    const handleMouseOut = () => {
        setHovering(false);
    };
    const handleClick = (page) => {
        navigate(`${page}`)
    }



    return (
        <div
            className={isHovering ? "menu-bar grow" : "menu-bar"}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <div
                className={`menu-item ${location.pathname === "/" ? "current-page" : ""} `}
                onClick={()=>handleClick('/')}>
                <span className="material-symbols-outlined">book_4</span>
                <span className="menu-text">내역</span>
            </div>
            <div
                className={`menu-item ${location.pathname === "/cal"? "current-page" : ""}`}
                onClick={()=>handleClick('/cal')}>
                <span className="material-symbols-outlined">calendar_month</span>
                <span className="menu-text">달력</span>
            </div>
            <div
                className={`menu-item ${location.pathname === "/statistics" ? "current-page" : ""}`}
                    onClick={()=>handleClick('/statistics')}>
                <span className="material-symbols-outlined">monitoring</span>
                <span className="menu-text">통계</span>
            </div>
            <div
                className={`menu-item ${location.pathname === "/option" ? "current-page" : ""}`}
                onClick={()=>handleClick('/option')}>
                <span className="material-symbols-outlined">settings</span>
                <span className="menu-text">설정</span>
            </div>
        </div>
    );
};

export default MenuBar;
