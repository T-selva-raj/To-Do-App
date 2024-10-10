const task = require('../models').task;


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
        if (error) throw new Error(error.message);
        return taskCreate;
    } catch (e) {
        throw new Error(e.message);
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
        if (error) throw new Error(error.message);
        return deleted;
    } catch (e) {
        throw new Error(e.message);
    }
}
module.exports.deleteTask = deleteTask;

const updateTask = async (data, taskId, userId) => {
    try {
        const [error, updated] = await to(task.update(data, {
            where: {
                usedId: userId,
                id: taskId
            }
        }));
        if (error) throw new Error(error.message);
        return updated;
    } catch (e) {
        throw new Error(e.message);
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
        if (error) throw new Error(error.message);
        return taskData;
    } catch (e) {
        throw new Error(e.message);
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
            attributes: ['id', 'taskName', 'due', 'priority', 'status', 'createdAt']
        }));
        if (error) throw new Error(error.message);
        // taskData.rows = taskData.rows.map(ele => ({
        //     ...ele,
        //     createdAt: new Date(ele.createdAt),
        //     due: new Date(ele.due)
        // }));
        // console.log(taskData.rows);

        // taskData.count = taskData.rows.map(ele => !ele.isDeleted).length;
        return taskData;
    } catch (e) {
        throw new Error(e.message);
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
        if (error) throw new Error(error.message);
        const thisWeek = filterTasksForCurrentWeek(tasks?.rows);
        const today = filterTasksDueToday(tasks?.rows);
        const highCount = tasks?.rows.filter(task => task.priority == 'High')?.length;
        return {
            total: tasks?.count ?? 0,
            thisWeekCount: thisWeek ?? 0,
            todayCount: today?.todayCount ?? 0,
            todayCompleted: today?.todayCompleted ?? 0,
            highCount: highCount,
            thisWeek: getCompletedTaskCount(tasks?.rows)
        };
    } catch (error) {
        throw new Error(error.message);
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
        const taskDueDate = new Date(task.due).toDateString();
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