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
        },
        userName: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        profileImage: {
            type: Sequelize.STRING
        },
        taskCompleted: {
            type: Sequelize.NUMERIC,
            default: 0
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
        schema: 'user'
    });
    User.association = (models) => {
        User.hasMany(models.task, { foreignKey: 'userId' });
    }
    return User;
};
