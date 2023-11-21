import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const token = userService.generateToken(user.id);
        res.status(201).json({ token });
    } catch (error) {
        if (error.message === "Email already in use") {
            return res.status(400).json({ message: "Email already in use" });
        }
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const loginUser = async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
        const user = await userService.validateUser(user_email, user_password);
        if (!user) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        const token = userService.generateToken(user.id);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const userProfile = await userService.getUserProfile(userId);
        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    try {
        const updatedUser = await userService.updateUserProfile(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};