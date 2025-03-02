const userService = require('../services/user.service');


const profileData = async (req, res) => {
    try {
        const [profileErr, profileData] = await to(userService.getUserProfileData(req.user.id));
        if (profileErr) throw new Error(profileErr.message);
        res.status(200).json({ result: profileData, message: 'Profile fetch successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Profile fetch failed', error: error.message });
    }
}
module.exports.profileData = profileData;


const editProfile = async (req, res) => {
    try {
        if (req?.file?.firebaseUrl) req.body.profileImage = req.file.firebaseUrl;
        const [profileErr, profileData] = await to(userService.editProfile(req.body, req.user.id));
        if (profileErr) throw new Error(profileErr.message);
        res.status(200).json({ result: profileData, message: 'Profile updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Profile updation failed', error: error.message });
    }
}
module.exports.editProfile = editProfile;