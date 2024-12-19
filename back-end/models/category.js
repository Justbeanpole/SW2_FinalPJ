const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Category extends Model {}

    Category.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            validate: { min: 0, max: 1 },
        },
        createdDate: {
            field: 'created_date',
            type: DataTypes.DATE(6),
            allowNull: true,
        },
        modifiedDate: {
            field: 'modified_date',
            type: DataTypes.DATE(6),
            allowNull: true,
        },
        categoryName: {
            field: 'category_name',
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        userId: {
            field: 'user_id',
            type: DataTypes.BIGINT,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'category',
        timestamps: false,
    });

    return Category;
};
