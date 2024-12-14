import './pageSty/statisSty.css'
import Detail from "../components/Detail";
import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const StatisticsPage = ({currentMonth, prevMonth, nextMonth, nowMonth, activeTab, handleTabChange}) => {

    return (
        <div className="satistics-page">
            <div className="inOutBtn">
                <div>수입</div>
                <div>지출</div>
            </div>
            <div className="contentSec">
                <div className="circleGrap">
                    <div className="grap-sec"><DonutChart></DonutChart></div>
                    <div className="catStory-sec">
                        <div className="dounot-middle">
                            <div>지출 전체</div>
                            <div>123,123 원</div>
                        </div>
                    </div>
                </div>
                <div className="historySec">
                    <StaticLineChart></StaticLineChart>
                    {/*<Detail*/}
                    {/*    data={searchResHis()}*/}
                    {/*    activeCategory={activeCategory}*/}
                    {/*    sortDirection={sortDirection}*/}
                    {/*    handleActCategory={handleActCategory}*/}
                    {/*    deterArrowDir={deterArrowDir}*/}
                    {/*></Detail>*/}
                </div>
            </div>
        </div>
    )
}

export default StatisticsPage;

const StaticLineChart = () => {
    const data = [
        { name: '1월', value: 0 },
        { name: '2월', value: 0 },
        { name: '3월', value: 0 },
        { name: '4월', value: 0 },
        { name: '5월', value: 0 },
        { name: '6월', value: 0 },
        { name: '7월', value: 0 },
        { name: '8월', value: 0 },
        { name: '9월', value: 0 },
        { name: '10월', value: 100000 },
        { name: '11월', value: 200000 },
        { name: '12월', value: 150000 },
    ];
    return (
        <div className="barGrap">
            <div className="grap-title">
                <h2>지출 전체</h2>
                <h3>123,123 원</h3>
            </div>
                <LineChart
                    width={1100}
                    height={350}
                    data={data}
                >
                    <CartesianGrid  stroke="#333333" />
                    <XAxis
                        dataKey="name"
                        stroke="#cccccc"
                        tick={{ fontSize: 14, fill: '#cccccc' }}
                    />
                    <YAxis
                        stroke="#cccccc"
                        tick={{ fontSize: 14, fill: '#cccccc' }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#333333', border: 'none', borderRadius: '5px' }}
                        labelStyle={{ color: '#ffffff' }}
                        itemStyle={{ color: '#ffffff' }}
                    />
                    <Legend
                        wrapperStyle={{ color: '#ffffff', fontSize: '14px' }}
                    />
                    <Line
                        type="linear"
                        dataKey="value"
                        stroke="#ff5722"
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, stroke: '#ffffff', fill: '#ff5722' }}
                        activeDot={{r: 8} }
                    />
                </LineChart>


        </div>
    )
}





const DonutChart = () => {
    const data = [
        { name: "교통/차량", value: 90000, percent: 62.98, color: "#FF7043", icon: "🚕" },
        { name: "식비", value: 52900, percent: 37.02, color: "#FFB74D", icon: "🍜" },
    ];

    const RADIAN = Math.PI / 180;

    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
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
            >
                {`${(percent).toFixed(1)}%`}
            </text>
        );
    };
    return (
        <div className="dounot">
            <PieChart width={350} height={300}>
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
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip data = {data}/>} />

            </PieChart>

        </div>
    );
};

const CustomTooltip = ({ active, payload}) => {
    if (active && payload && payload.length) {
        const { name, value, percent, color, icon } = payload[0].payload;

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
                    width: "150px",
                }}
            >
                <div style={{ fontSize: "20px", marginBottom: "5px" }}>{icon} {name}</div>
                <div style={{ fontSize: "16px", marginBottom: "5px" }}>{percent.toFixed(0)}%</div>
                <div style={{ fontSize: "18px", color: color, fontWeight: "bold" }}>
                    {value.toLocaleString()} 원
                </div>
            </div>
        );
    }

    return null;
};

