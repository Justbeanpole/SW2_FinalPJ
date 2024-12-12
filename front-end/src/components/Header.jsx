import './style/headerSty.css'
import {useEffect, useState} from "react";

const Header = ({location}) => {
    const [headerName, setHeaderName] = useState('')
    useEffect(() => {
        switch (location.pathname) {
            case '/': setHeaderName('내역'); break;
            case '/cal': setHeaderName('달력'); break;
            case '/statistics': setHeaderName('통계'); break;
            default: setHeaderName("")
        }
    })
    return (
        <div className="main-header">
            <div className="menu-btn material-symbols-outlined">savings <span className="title-name">가계부</span></div>
            <div className="header-content">{headerName}</div>
            <div className="material-symbols-outlined account">account_circle</div>
        </div>
    )
}

export default Header