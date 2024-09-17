var express = require('express');
var router = express.Router();
const TaskController = require('../controllers/task.controller');
const passport = require('passport');

router.post('',
    passport.authenticate('jwt', { session: false }),
    TaskController.createTask);
module.exports = router;