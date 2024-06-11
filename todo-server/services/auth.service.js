const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const CryptoService = require('./crypto.service');
const User = require('../models').user;

const register = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [error, userRecord] = await to(admin.auth().createUser({
            email,
            password: hashedPassword,
        }));
        if (error) {
            console.error('Error creating user:', error);
            throw new Error(error.message);
        }
        if (userRecord) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email: email,
                password: hashedPassword
            });
        }
        return userRecord;
    } catch (error) {
        throw new Error(error.message);
    }
};

const login = async (email, password) => {
    try {
        let user;
        const [fetchError, userRecord] = await to(admin.auth().getUserByEmail(email));
        if (fetchError) {
            console.error('Error fetching user:', fetchError);
            throw new Error(fetchError.message);
        }
        if (userRecord.email) {
            user = await User.findOne({ where: { email: userRecord.email }, raw: true });
            if (user) {
                const hashedPassword = user.password;
                const isPasswordValid = await bcrypt.compare(password, hashedPassword);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }
            }
        }
        const token = await admin.auth().createCustomToken(userRecord.uid);
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};
const verifyIdToken = async (idToken) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const customToken = await admin.auth().createCustomToken(uid);

        return customToken;
    } catch (error) {
        console.error('Error verifying ID token:', error);
        throw new Error(error.message);
    }
};
module.exports = {
    register,
    login,
    verifyIdToken
};
