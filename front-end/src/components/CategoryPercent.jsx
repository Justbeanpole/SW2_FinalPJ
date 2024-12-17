import './style/categoryPercentSty.css'

const CategoryPercent = ({percent, name, value, color}) => {
    return (
        <div className="category-percent"
        >
            <div className="percent"
                 style={{backgroundColor: color}}
            >{percent}%</div>
            <div className="percent-title">{name}</div>
            <div className="price">{value.toLocaleString()} 원</div>
        </div>
    )
}

export default CategoryPercent