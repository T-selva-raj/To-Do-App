var express = require('express');
var router = express.Router({ mergeParams: true });
const TaskController = require('../controllers/task.controller');
const passport = require('passport');

router.get('/report', passport.authenticate('jwt', { session: false }), TaskController.getTaskReport);


router.post('', passport.authenticate('jwt', { session: false }), TaskController.createTask);
router.get('', passport.authenticate('jwt', { session: false }), TaskController.getAllTasks);

router.get('/dashboard', passport.authenticate('jwt', { session: false }), TaskController.getDashBoardDetails);

router.put('/:taskId', passport.authenticate('jwt', { session: false }), TaskController.updateTask);
router.delete('/:taskId', passport.authenticate('jwt', { session: false }), TaskController.deleteTask);
router.get('/:taskId', passport.authenticate('jwt', { session: false }), TaskController.getOneTask);



module.exports = router;