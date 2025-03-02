var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user.controller');
const { upload, uploadToFirebase } = require('../middleware/upload');


router.get('/profile', passport.authenticate('jwt', { session: false }), userController.profileData);
router.put('/profile',
    passport.authenticate('jwt', { session: false }),
    upload.single("profileImage"), uploadToFirebase,
    userController.editProfile
);

module.exports = router;
