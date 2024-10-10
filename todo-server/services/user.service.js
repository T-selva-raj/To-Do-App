const user = require('../models').user;



const getUserProfileData = async (userId) => {
    try {
        const [profileErr, profileData] = await to(user.findOne({
            where: { id: userId }
        }));
        if (profileErr) throw new Error(profileErr.message);
        delete profileData?.password;
        delete profileData?.uid;
        return profileData;
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports.getUserProfileData = getUserProfileData;


const editProfile = async (userId, profileData) => {
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