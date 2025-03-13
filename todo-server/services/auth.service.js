const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const CryptoService = require('./crypto.service');
const User = require('../models').user;
const jwt = require('jsonwebtoken');
const register = async (email, password, userName) => {
    try {
        email = await CryptoService.decryptDetails(email);
        password = await CryptoService.decryptDetails(password);

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already registered');
        }
        const [error, userRecord] = await to(admin.auth().createUser({ email, password }));
        if (error) {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('Email already registered');
            }
            throw new Error(error.message || 'User creation failed in Firebase');
        }

        if (!userRecord) {
            throw new Error("User record is undefined after Firebase creation");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [dbError, user] = await to(User.create({
            userName,
            email,
            password: hashedPassword,
            uid: userRecord.uid
        }));

        if (dbError) {
            await admin.auth().deleteUser(userRecord.uid);
            throw new Error('Failed to create user account');
        }
        return userRecord;
    } catch (error) {
        console.error("Register Error:", error);
        return TE(error.message);
    }
};


const login = async (email, password) => {
    try {
        email = await CryptoService.decryptDetails(email);
        password = await CryptoService.decryptDetails(password);
        const [fetchError, userRecord] = await to(admin.auth().getUserByEmail(email));
        if (fetchError) {
            return TE(fetchError.message);
        }
        const user = await User.findOne({ where: { email: userRecord.email }, raw: true });
        if (!user) return TE('User not found');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return TE('Invalid password');
        const [jwtError, jwtToken] = await to(createJwt({ userName: user.userName, email: user.email, uid: user.uid, id: user.id }));
        if (jwtError) return TE(jwtError.message);
        return { jwtToken, userName: user.userName };
    } catch (error) {
        return TE(error.message);
    }
};

const createJwt = async (user) => {
    try {
        const token = 'Bearer ' + jwt.sign({
            email: user.email,
            id: user.id,
            uid: user.uid,
            userName: user.userName
        }, CONFIG.jwt_encryption, { expiresIn: '30m' });
        const encryptedToken = CryptoService.encryptDetails(token);
        // if (encryptionError) {
        //     console.error('Error encrypting token:', encryptionError);
        //    return TE(encryptionError.message);
        // }
        return encryptedToken;
    } catch (error) {
        return { error: error.message };
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
        return TE(error.message);
    }
};


module.exports = {
    register,
    login,
    verifyIdToken,
    createJwt
};
