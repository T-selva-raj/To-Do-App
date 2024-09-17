const taskService = require('../services/task.service');

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