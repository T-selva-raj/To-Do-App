const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const CryptoService = require('./crypto.service');
const User = require('../models').user;
const jwt = require('jsonwebtoken');
const register = async (email, password) => {
    try {
        email = await CryptoService.decryptDetails(email);
        password = await CryptoService.decryptDetails(password);
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
        email = await CryptoService.decryptDetails(email);
        password = await CryptoService.decryptDetails(password);
        const [fetchError, userRecord] = await to(admin.auth().getUserByEmail(email));
        if (fetchError) {
            console.error('Error fetching user:', fetchError);
            throw new Error(fetchError.message);
        }
        const user = await User.findOne({ where: { email: userRecord.email }, raw: true });
        if (!user) throw new Error('User not found');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');
        console.log({ email: userRecord.email, id: userRecord.uid });
        const [jwtError, jwtToken] = await to(createJwt({ email: userRecord.email, id: userRecord.uid }));
        if (jwtError) throw new Error(jwtError.message);
        return jwtToken;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createJwt = async (user) => {
    try {
        const token = 'Bearer ' + jwt.sign({
            email: user.email,
            id: user.id
        }, CONFIG.jwt_encryption, { expiresIn: '1h' });
        const [encryptionError, encryptedToken] = await to(CryptoService.encryptDetails(token));
        if (encryptionError) {
            console.error('Error encrypting token:', encryptionError);
            throw new Error(encryptionError.message);
        }
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
        throw new Error(error.message);
    }
};


module.exports = {
    register,
    login,
    verifyIdToken,
    createJwt
};
