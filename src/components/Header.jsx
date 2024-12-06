import './style/headerSty.css'

const Header = () => {
    return (
        <div className="main-header">
            <div className="menu-btn material-symbols-outlined">menu</div>
            <div className="header-content">내역</div>
            <div className="material-symbols-outlined account">account_circle</div>
        </div>
    )
}

export default Header