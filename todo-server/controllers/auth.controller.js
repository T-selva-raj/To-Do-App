const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { email, password, userName } = req.body;
        const userRecord = await authService.register(email, password, userName);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            uid: userRecord.uid
        });
    } catch (error) {
        if (error.message.includes('already registered') ||
            error.message.includes('already in use')) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }
        res.status(400).json({
            success: false,
            message: error.message || 'Registration failed'
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: 'Login failed', error: error.message });
    }
};

// const login = async (req, res) => {
//     try {
//         const { token } = req.body;
//         const customToken = await authService.verifyIdToken(token);
//         res.status(200).json({ message: 'Verification successful', customToken });
//     } catch (error) {
//         res.status(400).json({ message: 'Verification Failed', error: error.message });
//     }
// }

module.exports = {
    register,
    login,
    // verifyIdToken
};
