const user = require('../models').user;
const task = require('../models').task;
const Sequelize = require('sequelize');


const getUserProfileData = async (userId) => {
    try {
        const [profileErr, profileData] = await to(
            user.findOne({
                where: { id: userId },
                raw: true
            })
        );
        if (profileErr) throw new Error(profileErr.message);
        delete profileData?.password;
        delete profileData?.uid;
        const [countErr, count] = await to(task.count({ where: { userId, status: 'done' } }));
        if (countErr) throw new Error(countErr.message);
        profileData['taskCompleted'] = count ?? 0;
        return profileData;
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports.getUserProfileData = getUserProfileData;


const editProfile = async (profileData, userId) => {
    try {
        const [profileErr, profile] = await to(user.update({
            userName: profileData.userName,
            profileImage: profileData.profileImage
        }, { where: { id: userId } }));
        if (profileErr) throw new Error(profileErr.message);
        return profile;
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports.editProfile = editProfile;