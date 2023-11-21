import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    try {
        const header = req.header('Authorization');
        if (!header) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
