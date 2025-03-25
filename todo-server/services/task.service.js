const task = require('../models').task;
const UserService = require('./user.service');
const { Op } = require('sequelize');
const moment = require('moment');
const createTask = async (taskData) => {
    try {
        const data = {
            taskName: taskData?.taskName,
            description: taskData?.description,
            due: taskData?.dueDate,
            priority: taskData?.importance,
            status: taskData?.status,
            userId: 1
        };
        const [error, taskCreate] = await to(task.create(data));
        if (error) return TE(error.message);
        return taskCreate;
    } catch (e) {
        return TE(e.message);
    }
}
module.exports.createTask = createTask;


const deleteTask = async (taskId, userId) => {
    try {
        const [error, deleted] = await to(task.update({ isDeleted: true }, {
            where: {
                userId: userId,
                id: taskId
            }
        }));
        if (error) return TE(error.message);
        return deleted;
    } catch (e) {
        return TE(e.message);
    }
}
module.exports.deleteTask = deleteTask;

const updateTask = async (data, taskId, userId) => {
    try {
        data = { ...data, modifiedAt: new Date() };
        const [error, updated] = await to(task.update(data, {
            where: {
                userId: userId,
                id: taskId,
            }
        }));
        if (error) return TE(error.message);
        return updated;
    } catch (e) {
        return TE(e.message);
    }
}
module.exports.updateTask = updateTask;


const getOneTask = async (taskId, userId) => {
    try {
        const [error, taskData] = await to(task.findOne({
            where: {
                userId: userId,
                id: taskId
            }
        }));
        if (error) return TE(error.message);
        return taskData;
    } catch (e) {
        return TE(e.message);
    }
}
module.exports.getOneTask = getOneTask;

const getAllTasks = async (whereCondition, limit, offset) => {
    try {
        const [error, taskData] = await to(task.findAndCountAll({
            where: whereCondition,
            limit: limit,
            offset: offset,
            raw: true,
            attributes: ['id', 'taskName', 'due', 'priority', 'status', 'createdAt'],
            order: [['taskName', 'ASC']]
        }));
        if (error) return TE(error.message);
        return taskData;
    } catch (e) {
        return TE(e.message);
    }
}
module.exports.getAllTasks = getAllTasks;


const getDashBoardDetails = async (userId) => {
    try {
        const [error, tasks] = await to(task.findAndCountAll({
            where: {
                userId: userId,
                isDeleted: false
            },
            raw: true
        }));
        if (error) return TE(error.message);
        const thisWeek = filterTasksForCurrentWeek(tasks?.rows);
        const today = filterTasksDueToday(tasks?.rows);
        const highCount = tasks?.rows.filter(task => task.priority == 'High')?.length;
        const chartData = await getGraphData(userId);
        const [usererr, user] = await to(UserService.getUserProfileData(userId));
        if (usererr) console.log(usererr);
        return {
            total: tasks?.count ?? 0,
            thisWeekCount: thisWeek ?? 0,
            todayCount: today?.todayCount ?? 0,
            todayCompleted: today?.todayCompleted ?? 0,
            highCount: highCount,
            // thisWeek: getCompletedTaskCount(tasks?.rows),
            thisWeek: chartData
        };
    } catch (error) {
        return TE(error.message);
    }
}
module.exports.getDashBoardDetails = getDashBoardDetails;


function filterTasksForCurrentWeek(tasks) {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6));

    return tasks.filter(task => {
        const taskDueDate = new Date(task.due);
        return taskDueDate >= firstDayOfWeek && taskDueDate <= lastDayOfWeek;
    })?.length;
}

function filterTasksDueToday(tasks) {
    const today = new Date().toDateString();
    const todayCount = tasks.filter(task => {
        const taskDueDate = new Date(task.due).toDateString();
        return taskDueDate === today;
    })?.length;
    const todayCompleted = tasks.filter(task => {
        const taskDueDate = new Date(task.modifiedAt).toDateString();
        return taskDueDate === today && task.status == 'done';
    })?.length;
    return { todayCompleted: todayCompleted, todayCount: todayCount };
}

function getCompletedTaskCount(tasks) {
    const startOfWeek = new Date();
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    const taskCounts = Array(7).fill(0);
    tasks.forEach(task => {
        const taskDueDate = new Date(task.due);
        if (task.status === 'done') {
            const diffInTime = taskDueDate.getTime() - startOfWeek.getTime();
            const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

            if (diffInDays >= 0 && diffInDays <= 6) {
                taskCounts[diffInDays]++;
            }
        }
    });
    return taskCounts;
}

const getGraphData = async (userId) => {
    try {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const whereCondition = {
            userId,
            isDeleted: false,
            due: {
                [Op.between]: [startOfWeek, endOfWeek]
            }
        };
        const [err, tasks] = await to(getAllTasks(whereCondition, 1000, 0));
        if (err) return TE(err.message);
        const completedTasksByDay = [0, 0, 0, 0, 0, 0, 0, 0];
        if (tasks.rows?.length) {
            tasks.rows.forEach(task => {
                const dayIndex = new Date(task.due).getDay();
                completedTasksByDay[dayIndex]++;
            });
        }
        return completedTasksByDay;
    } catch (error) {
        return TE(error.message);
    }

}

const getTaskReport = async (userId, startDate, endDate) => {
    try {
        const condition = { userId }
        if (startDate && endDate) {
            condition['createdAt'] = {
                [Op.between]: [
                    moment(startDate).startOf('day').toISOString(),
                    moment(endDate).endOf('day').toISOString()
                ]
            };

        }
        const [err, allTasks] = await to(getAllTasks(condition, 1000, 0));
        if (err) return TE(err.messsage);
        return {
            completed: allTasks?.rows?.filter(t => t.status == 'done').length ?? 0,
            open: allTasks?.rows?.filter(t => t.status == 'open').length ?? 0,
            inProgress: allTasks?.rows?.filter(t => t.status == 'inprogress').length ?? 0,
            created: allTasks?.rows?.length ?? 0,
            chartData: [
                allTasks?.rows?.filter(t => t.priority == 'Low')?.length ?? 0,
                allTasks?.rows?.filter(t => t.priority == 'Medium')?.length ?? 0,
                allTasks?.rows?.filter(t => t.priority == 'High')?.length ?? 0,
            ]
        }
    } catch (error) {
        console.log(error);

        return TE(error.message);
    }
}
module.exports.getTaskReport = getTaskReport;
