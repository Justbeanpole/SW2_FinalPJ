import './App.css';
import MainPage from "./pages/MainPage";
import CalendarPage from "./pages/CalendarPage";
import StatisticsPage from "./pages/StatisticsPage";

import {Routes, Route, useLocation} from "react-router-dom";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import SideBar from "./components/SideBar";
import {useEffect, useRef, useState} from "react";
import {addMonths, subMonths} from "date-fns";


function App() {
    const [isOpen, setMenu] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const location = useLocation();

    const sideBarRef = useRef(null);

    const toggleBtn = () => {
        setMenu(isOpen => !isOpen);
    }

    /* === Function === */
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }
    const nowMonth = () => {
        setCurrentMonth(new Date());
    }

    useEffect(() => {setMenu(false)},[location.pathname]);


    const [activeTab, setActiveTab] = useState('total')

    const handleTabChange = (type) => {
        setActiveTab(type)
    }


    return (
        <div className="App">
            <div className="main-page">
                <Header location={location}></Header>
                <div className="main-content">
                    <MenuBar/>
                    <Routes>
                        <Route path='/' element={
                            <MainPage
                            currentMonth = {currentMonth}
                            prevMonth = {prevMonth}
                            nextMonth = {nextMonth}
                            nowMonth = {nowMonth}
                            activeTab={activeTab}
                            handleTabChange={handleTabChange}
                        ></MainPage>}></Route>
                        <Route path='/cal' element={
                            <CalendarPage
                            currentMonth = {currentMonth}
                            prevMonth = {prevMonth}
                            nextMonth = {nextMonth}
                            nowMonth = {nowMonth}
                            activeTab={activeTab}
                            handleTabChange={handleTabChange}
                        ></CalendarPage>}></Route>
                        <Route path='/statistics' element={<StatisticsPage></StatisticsPage>}></Route>
                    </Routes>
                </div>
                    <SideBar
                        isOpen={isOpen}
                        currentMonth = {currentMonth}
                        prevMonth = {prevMonth}
                        nextMonth = {nextMonth}
                        nowMonth = {nowMonth}
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                    ></SideBar>
                <div className="floating-add-btn material-symbols-outlined"
                     onClick={() => toggleBtn()}>{isOpen?"close" : "add"}</div>
            </div>

        </div>
    );
}

export default App;

