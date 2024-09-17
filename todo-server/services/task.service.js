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
