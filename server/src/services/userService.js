import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const createUser = async (userData) => {
    const existingUser = await prisma.user.findUnique({
        where: { user_email: userData.user_email },
    });

    if (existingUser) {
        throw new Error("Email already in use");
    }
    const hashedPassword = await bcrypt.hash(userData.user_password, 12);
    const user = await prisma.user.create({
        data: {
            ...userData,
            user_password: hashedPassword
        }
    });
    return user;
};

export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const validateUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { user_email: email } });
    if (user && await bcrypt.compare(password, user.user_password)) {
        return user;
    }
    return null;
};

