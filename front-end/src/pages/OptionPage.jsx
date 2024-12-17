import './pageSty/optionSty.css'
import {useEffect, useState} from "react";
import axios from "axios";
import CategoryPercent from "../components/CategoryPercent";

const OptionPage = () => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [categoryManageType, setCategoryManageType] = useState(null);
    const [fetchCategoryManage, setFetchCategoryManage] = useState(null);


    const handleClickGit = () => {
        window.open('https://github.com/Justbeanpole/SW2_FinalPJ.git', "_blank");
    }
    const handleClickOpenModal = () => {
        addModalOpen ? setAddModalOpen(false) : setAddModalOpen(true);
    }
    const handleOptionClick = (e) => {
        setCategoryManageType(e.target.innerText);
    }
    const handleChangeManageType = (value) => {
        return value === "수입분류 관리" ? "INCOME" : "EXPENSE"
    }
    const fetchCategoryData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/category', {
                params: {
                    userId : 1,
                }
            })
            setFetchCategoryManage(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchCategoryData();
    },[])
    return (
        <div className="option-page">
            <div className="settings-container">
                <div className="option-bar">
                    <ul className="options">
                        <li className="option-title">분류</li>
                        <li className="option-item "
                        onClick={handleOptionClick}>수입분류 관리</li>
                        <li className="option-item"
                            onClick={handleOptionClick}
                        >지출분류 관리</li>
                        <li className="option-title">Github</li>
                        <li className="option-item" onClick={handleClickGit}>Github Link</li>
                    </ul>
                </div>
                <div className="option-content">
                    {categoryManageType === "수입분류 관리" || categoryManageType === "지출분류 관리"
                        ? <OptionContent
                            categoryManageType={categoryManageType}
                            handleClickOpenModal={handleClickOpenModal}
                            data = {fetchCategoryManage}
                            fetchCategoryData={fetchCategoryData}
                        /> : null}
                </div>
            </div>
            {addModalOpen ? <AddModal
                categoryManageType = {categoryManageType}
                handleClickOpenModal={handleClickOpenModal}
                fetchCategoryData = {fetchCategoryData}
            ></AddModal> : null}
        </div>
    )
}

export default OptionPage

const OptionContent = ({data,categoryManageType ,handleClickOpenModal,fetchCategoryData}) => {


    return (
        <div className="content-container">
            <div className="content-title">
                <div>{categoryManageType}</div>
                <div className="material-symbols-outlined"
                     onClick={handleClickOpenModal}
                >add
                </div>
            </div>
            <div className="content-item">
                {
                    categoryManageType === null ? null : categoryManageType === "수입분류 관리" ? data.INCOME.map((item) => (
                        <CategoryItem name={item} fetchCategoryData={fetchCategoryData}></CategoryItem>
                    )) : data.EXPENSE.map((item) => (
                        <CategoryItem name={item}></CategoryItem>
                    ))
                }
            </div>
        </div>
    )
}

const CategoryItem = ({name,fetchCategoryData}) => {
    const fetchDelCategory = async () => {
        try{
            const response = await axios.post(`http://localhost:8080/deleteCategory`,{
                data : {
                    categoryName : name
                    }
            })
            alert("삭제되었습니다.")
            fetchCategoryData()
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="category-item" >
            <div className="category-title">{name}</div>
            <div className="material-symbols-outlined option-delete"
                 onClick={fetchDelCategory}
            >delete</div>
        </div>
    )
}

const AddModal = ({handleClickOpenModal, categoryManageType, fetchCategoryData}) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddCategory = async () => {

        const requestData = {
            userId:1,
            name : inputValue,
            type : categoryManageType === "수입분류 관리" ? 0 : 1,
        };
        try {
            // axios POST 요청
            const response = await axios.post("http://localhost:8080/createCategory", requestData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            alert("저장되었습니다!");
            fetchCategoryData()
        } catch (error) {
            console.error("데이터 전송 실패:", error);
            alert("저장에 실패했습니다.");
        }
    };

    return (
        <div className="add-modal">
            <div className="modal-overlay">
            <div className="modal-container">
                    <div className="modal-header">
                        <span>분류 입력</span>
                        <button className="close-btn"
                                onClick={handleClickOpenModal}
                        >✕</button>
                    </div>

                    <div className="modal-body">
                        <label className="input-label">분류</label>
                        <input
                            type="text"
                            className="input-field"
                            value={inputValue}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            className="save-btn" disabled={!inputValue}
                            onClick={handleAddCategory}
                        >
                            저장하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
            )
}
