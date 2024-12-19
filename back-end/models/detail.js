const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Detail extends Model {}

    Detail.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        createdDate: {
            field: 'created_date',
            type: DataTypes.DATE(6),
            allowNull: false,
        },
        modifiedDate: {
            field: 'modified_date',
            type: DataTypes.DATE(6),
            allowNull: true,
        },
        asset: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        userId: {
            field: 'user_id',
            type: DataTypes.BIGINT,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    }, {
        sequelize, // Sequelize 인스턴스
        modelName: 'Detail',
        tableName: 'detail',
        timestamps: false,
    });

    return Detail;
};
