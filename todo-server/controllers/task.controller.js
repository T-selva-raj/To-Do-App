const taskService = require('../services/task.service');
const { Op } = require('sequelize');

const createTask = async (req, res) => {
    try {
        req.body['userId'] = req?.user.id;
        const [error, create] = await to(taskService.createTask(req.body));
        if (error) throw new Error(error.message);
        res.status(200).json({ result: create, message: 'Task created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Task creation failed', error: error.message });
    }
}
module.exports.createTask = createTask;



const deleteTask = async (req, res) => {
    try {
        const [error, deleted] = await to(taskService.deleteTask(req.params.taskId, req.user.id));
        if (error) throw new Error(error.message);
        res.status(200).json({ result: deleted, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Task deletion failed', error: error.message });
    }
}
module.exports.deleteTask = deleteTask;



const updateTask = async (req, res) => {
    try {
        const [error, deleted] = await to(taskService.updateTask(req.body, req.params.taskId, req.user.id));
        if (error) throw new Error(error.message);
        res.status(200).json({ result: deleted, message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Task updation failed', error: error.message });
    }
}
module.exports.updateTask = updateTask;


const getOneTask = async (req, res) => {
    try {
        const [error, deleted] = await to(taskService.getOneTask(req.params.taskId, req.user.id));
        if (error) throw new Error(error.message);
        res.status(200).json({ result: deleted, message: 'Task fetch successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Task fetch failed', error: error.message });
    }
}
module.exports.getOneTask = getOneTask;

const getAllTasks = async (req, res) => {
    try {
        const limit = req?.query?.limit ? +req.query.limit : 5;
        const offset = req?.query?.offset ? req.query.offset : 0;
        const condition = {
            userId: req?.user?.id,
            isDeleted: false,
        };
        if (req?.query?.searchText) condition['taskName'] = { [Op.iLike]: `%${req.query.searchText}%` };
        if (req?.query?.status) {
            if (req.query.status == 'All') {
                condition['status'] = { [Op.in]: ['open', 'progress', 'done'] }
            } else condition['status'] = req.query.status;
        }
        const [error, deleted] = await to(taskService.getAllTasks(condition, limit, offset));
        if (error) throw new Error(error.message);
        res.status(200).json({ result: deleted, message: 'Task fetch successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Task fetch failed', error: error.message });
    }
}
module.exports.getAllTasks = getAllTasks;

const getDashBoardDetails = async (req, res) => {
    try {
        const [error, tasks] = await to(taskService.getDashBoardDetails(req.user.id));
        if (error) throw new Error(error.message);
        res.status(200).json({ result: tasks, message: "Dashboard details fetched successfully" });
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: "Dashboard details fetch failed", error: error.message });
    }
}
module.exports.getDashBoardDetails = getDashBoardDetails;

const getTaskReport = async (req, res) => {
    try {
        const [err, report] = await to(taskService.getTaskReport(req.user.id, req?.query?.from ?? null, req?.query?.to ?? null));
        if (err) throw new Error(err.message);
        res.status(200).json({ result: report, message: "Report  fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Report fetch failed", error: error.message });
    }
}
module.exports.getTaskReport = getTaskReport;