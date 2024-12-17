import './pageSty/statisSty.css'
import CategoryPercent from "../components/CategoryPercent";
import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import React, {useEffect, useState} from "react";
import {PieChart, Pie, Cell} from "recharts";
import {addYears, format, subYears} from "date-fns";
import axios from "axios";
import History from "../components/History";

const StatisticsPage = ({currentMonth, setCurrentMonth, nowMonth, activeTab, handleTabChange}) => {
    const [inOutState, setInOutState] = useState("수입");

    const handleClickInout = (e) => {
        return e.target.innerText !== inOutState
            ? setInOutState(`${e.target.innerText}`)
            : null
    }


    const nextYear = () => {
        setCurrentMonth(addYears(currentMonth, 1));
    }
    const prevYear = () => {
        setCurrentMonth(subYears(currentMonth, 1));
    }
    const [lineChartData, setLineChartData] = useState([]);
    const [donutChartData, setDonutChartData] = useState([]);
    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/monthlyData', {
                    params: {
                        userId: 1,
                        createdDate: format(currentMonth,'yyyy-MM-dd'),
                    }
                })
                const responseDonut = await axios.get('http://localhost:8080/categoryDetailsForYear', {
                    params: {
                        userId: 1,
                        selectYear: currentMonth.getFullYear(),
                    }
                })
                const filterData = responseDonut.data.filter((item) => !(item.income === 0 && item.expense === 0));
                const donutData = filterData.map((item) => ({
                    name: item.category,
                    color: item.color,
                    value: item.income === 0 ? item.expense : item.income,
                    percent: item.income === 0 ? item.expensePercentage : item.incomePercentage,
                    type : item.income === 0 ? "EXPENSE" : "INCOME"
                }))
                setLineChartData(response.data)
                setDonutChartData(donutData);
            } catch (error) {
                console.log(error)
            }
        }
        fetchChartData();

    }, [currentMonth]);
    //수입 지출에 따라 데이터 설정
    return (
        <div className="satistics-page">
            <div className="header-statistics">
                <div className="inOutBtn">
                    <div
                        className={inOutState === "수입" ? "act-line" : ""}
                        onClick={handleClickInout}
                    >수입
                    </div>
                    <div
                        className={inOutState === "지출" ? "act-line" : ""}
                        onClick={handleClickInout}
                    >지출
                    </div>
                </div>
                <div className="btn-year">
                    <div
                        className="material-symbols-outlined arrow-btn"
                        onClick={prevYear}>
                        chevron_left
                    </div>
                    <div className="btn month-btn">
                        {format(currentMonth, 'yyyy')}년
                    </div>
                    <div
                        className="material-symbols-outlined arrow-btn"
                        onClick={nextYear}>
                        chevron_right
                    </div>
                </div>
            </div>

            <div className="contentSec">
                <div className="circleGrap">
                    <div className="grap-sec">
                        <DonutChart
                            inOutState={inOutState}
                            data = {donutChartData.filter((item) => inOutState === "수입" ? item.type === "INCOME" : item.type === "EXPENSE")}
                        ></DonutChart>
                    </div>
                    <div className="catStory-sec">
                        <div className="dounot-middle">
                            <div>{inOutState} 전체</div>
                        </div>
                        <div className="percent-list">
                            {donutChartData.filter((item) => inOutState === "수입" ? item.type === "INCOME" : item.type === "EXPENSE").map((item) => (
                                <CategoryPercent
                                    {...item}
                                />
                            ))}

                        </div>
                    </div>
                </div>
                <div className="historySec">
                    <StaticLineChart
                        inOutState={inOutState}
                        data = {lineChartData}
                    ></StaticLineChart>
                </div>
            </div>
        </div>
    )
}

export default StatisticsPage;

const StaticLineChart = ({inOutState, data}) => {
    const formatYAxis = (value) => {
        return `${value / 1000}K`; // 1000으로 나눈 뒤 "K" 추가
    };
    const formatXAxis = (value) => {
        return `${value}월`;
    }
    return (
        <div className="barGrap">
            <div className="grap-title">
                <h2>{inOutState === "수입" ? "수입" : "지출"} 전체</h2>
            </div>
            <LineChart
                width={1100}
                height={350}
                data={data}
            >
                <CartesianGrid stroke="#333333"/>
                <XAxis
                    dataKey="month"
                    stroke="#cccccc"
                    tick={{fontSize: 14, fill: '#cccccc'}}
                    tickFormatter={(value) => formatXAxis(value)}
                />
                <YAxis
                    stroke="#cccccc"
                    tick={{fontSize: 14, fill: '#cccccc'}}
                    domain={[0, (dataMax) => Math.ceil(dataMax * 1.2)]}
                    tickFormatter={(value) => formatYAxis(value).toLocaleString()}
                />
                <Tooltip
                    contentStyle={{backgroundColor: '#333333', border: 'none', borderRadius: '5px'}}
                    labelStyle={{color: '#ffffff'}}
                    itemStyle={{color: '#ffffff'}}
                    formatter={(value) => value.toLocaleString()}
                />
                <Legend
                    wrapperStyle={{color: '#ffffff', fontSize: '14px'}}
                />
                <Line
                    type="linear"
                    dataKey={inOutState === "수입" ? "income" : "expense"}
                    stroke="#ff5722"
                    strokeWidth={3}
                    dot={{r: 6, strokeWidth: 2, stroke: '#fff', fill: '#ff5722'}}
                    activeDot={{r: 8}}
                    name={`월별 ${inOutState} 총합`}
                />
            </LineChart>


        </div>
    )
}


const DonutChart = ({inOutState, data}) => {



    const RADIAN = Math.PI / 180;

    const renderCustomLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                style={{userSelect: 'none'}}
            >
                {`${(percent)}%`}
            </text>
        );
    };
    return (
        <div className="dounot"
             style={{userSelect: 'none'}}
        >
            <PieChart
                width={350} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={800}
                    animationEasing="ease-out"
                >
                    {data.map((item, index) => (
                        <Cell key={`cell-${index}`} fill={item.color} stroke="#000"/>
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip data={data}/>}/>

            </PieChart>

        </div>
    );
};

const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
        const {name, value, percent, color} = payload[0].payload;

        return (
            <div
                style={{
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "8px",
                    border: `1px solid ${color}`,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    textAlign: "center",
                    width: "100px",
                }}
            >
                <div style={{fontSize: "15px", marginBottom: "5px"}}> {name}</div>
                <div style={{fontSize: "13px", marginBottom: "5px"}}>{percent}%</div>
                <div style={{fontSize: "12px", color: color, fontWeight: "bold"}}>
                    {value.toLocaleString()} 원
                </div>
            </div>
        );
    }

    return null;
};

