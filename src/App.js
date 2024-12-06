import './App.css';
import MainPage from "./pages/MainPage";
import CalendarPage from "./pages/CalendarPage";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";

function App() {
  return (
      <div className="App">
          <div className="main-page">
              <Header></Header>
              <div className="main-content">
                  <MenuBar/>
                  <Routes>
                      <Route path='/' element={<MainPage></MainPage>}></Route>
                      <Route path='/cal' element={<CalendarPage/>}></Route>
                  </Routes>
              </div>
              <div className="floating-add-btn material-symbols-outlined">add</div>
          </div>

      </div>
  );
}

export default App;
