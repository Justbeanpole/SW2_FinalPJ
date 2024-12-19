const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {}

    User.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            field: 'user_name',
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize, // Sequelize 인스턴스
        modelName: 'User',
        tableName: 'user',
        timestamps: false, // createdAt 및 updatedAt 비활성화
    });

    return User;
};
