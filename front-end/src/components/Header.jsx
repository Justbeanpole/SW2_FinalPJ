import './style/headerSty.css'
import {useEffect, useState} from "react";

const Header = ({location}) => {
    const [headerName, setHeaderName] = useState('')

    const [isAccountOpen, setIsAccountOpen] = useState(false);

    // 드롭다운 메뉴 토글
    const toggleDropdown = () => {
        setIsAccountOpen(!isAccountOpen);
    };

    useEffect(() => {
        switch (location.pathname) {
            case '/': setHeaderName('내역'); break;
            case '/cal': setHeaderName('달력'); break;
            case '/statistics': setHeaderName('통계'); break;
            case '/option' : setHeaderName("설정"); break;
            default: setHeaderName("")
        }
    })
    return (
        <div className="main-header">
            <div className="menu-btn material-symbols-outlined">savings <span className="title-name">가계부</span></div>
            <div className="header-content">{headerName}</div>

            <UserDropdown
                isOpen={isAccountOpen}
                toggleDropdown={toggleDropdown}
            ></UserDropdown>
        </div>
    )
}

export default Header


const UserDropdown = ({isOpen,toggleDropdown}) => {

    return (
        <div className="user-container">
            {/* 유저 아이콘 */}
            <div className="material-symbols-outlined account"
                 onClick={toggleDropdown}>
            account_circle</div>

            {/* 드롭다운 메뉴 */}
            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-item">
                        <span className="material-symbols-outlined">person</span> 이름
                    </div>
                    <div className="dropdown-item">
                        <span className="material-symbols-outlined">mail</span> 이메일
                    </div>
                    <div className="dropdown-item">
                        <span className="material-symbols-outlined">attach_file</span> 버전
                    </div>
                    <hr />
                    <div className="dropdown-item">
                        <span className="material-symbols-outlined">logout</span> 로그아웃
                    </div>
                </div>
            )}
        </div>
    );
};

