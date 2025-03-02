module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        taskName: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        due: {
            type: Sequelize.DATE,
            allowNull: false
        },
        priority: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('open', 'progress', 'done'),
            defaultValue: 'open'
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        modifiedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            default: false
        }

    }, {
        schema: 'user'
    });
    Task.association = (models) => {
        Task.belongsTo(models.user, { foreignKey: "userId" });
    }
    return Task;
};
