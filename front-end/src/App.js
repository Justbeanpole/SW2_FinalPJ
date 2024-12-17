import './App.css';
import MainPage from "./pages/MainPage";
import CalendarPage from "./pages/CalendarPage";
import StatisticsPage from "./pages/StatisticsPage";

import {Routes, Route, useLocation} from "react-router-dom";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import SideBar from "./components/SideBar";
import {useEffect, useRef, useState} from "react";
import {addMonths, format, subMonths} from "date-fns";
import OptionPage from "./pages/OptionPage";
import axios from "axios";



function App() {
    // === State ===
    const [isOpen, setMenu] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [fetchData, setFetchData] = useState([]);
    const [activeTab, setActiveTab] = useState('total')

    // useLocation
    const location = useLocation();

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
    const handleTabChange = (type) => {
        setActiveTab(type)
    }
    const toggleBtn = () => {
        setMenu(isOpen => !isOpen);
    }
    const fetchHistory = async() => {
        try{
            const response = await axios.get('http://localhost:8080/home', {
                params: {
                    userId : 1,
                    createdDate : format(currentMonth,'yyyy-MM-dd'),
                },
            })
            setFetchData(response.data);

        }
        catch(error){
            console.log(error)
        }
    }

    /* === useEffect ===*/
    useEffect(() => {setMenu(false)},[location.pathname]);
    useEffect(() => {
        fetchHistory()
    },[])

    return (
        <div className="App">
            <div className="main-page">
                <Header location={location}></Header>
                <div className="main-content">
                    <MenuBar
                        location={location}
                    />
                    <Routes>
                        <Route path='/' element={
                            <MainPage
                                data = {fetchData}
                            currentMonth = {currentMonth}
                            prevMonth = {prevMonth}
                            nextMonth = {nextMonth}
                            nowMonth = {nowMonth}
                            activeTab={activeTab}
                            handleTabChange={handleTabChange}
                                fetchHistory={fetchHistory}
                        ></MainPage>}></Route>
                        <Route path='/cal' element={
                            <CalendarPage
                                data={fetchData}
                            currentMonth = {currentMonth}
                            prevMonth = {prevMonth}
                            nextMonth = {nextMonth}
                            nowMonth = {nowMonth}
                            activeTab={activeTab}
                            handleTabChange={handleTabChange}
                        ></CalendarPage>}></Route>
                        <Route path='/statistics' element={<StatisticsPage
                            currentMonth={currentMonth}
                            setCurrentMonth={setCurrentMonth}
                        ></StatisticsPage>}></Route>
                        <Route path='/option'
                        element={<OptionPage></OptionPage>}></Route>
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
                        fetchHistory={fetchHistory}
                    ></SideBar>
                <div className="floating-add-btn material-symbols-outlined"
                     style={{display: location.pathname === "/option" ? "none" : ""}}
                     onClick={() => toggleBtn()}>{isOpen?"close" : "add"}</div>
            </div>

        </div>
    );
}

export default App;

