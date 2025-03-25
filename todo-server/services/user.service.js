const user = require('../models').user;
const task = require('../models').task;
var quoteOfTheDay = null;


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
        if (!quoteOfTheDay)
            await quoteGenerator();
        else profileData['quote'] = quoteOfTheDay;
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

const quoteGenerator = async () => {
    try {
        const url = `https://zenquotes.io/api/today`;
        const response = await fetch(url);
        if (!response.ok) return TE(`HTTP error! Status: ${response.status}`);
        const quote = await response.json();
        if (quote?.length) {
            quoteOfTheDay = quote[0]?.h ?? null;
        }
    } catch (error) {
        console.log(error.message)
        return TE(error.message);
    }
}