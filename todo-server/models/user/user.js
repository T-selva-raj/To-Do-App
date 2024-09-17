module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        schema: 'user'
    });
    User.association = (models) => {
        User.hasMany(models.task, { foreignKey: 'userId' });
    }
    return User;
};
