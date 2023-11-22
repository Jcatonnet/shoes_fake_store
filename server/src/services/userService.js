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
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '48h' });
};

export const validateUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { user_email: email } });
    if (user && await bcrypt.compare(password, user.user_password)) {
        return user;
    }
    return null;
};

export const getUserProfile = async (userId) => {
    const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            user_name: true,
            user_surname: true,
            user_email: true,
            user_address: true
        }
    });
    return userProfile;
};

export const updateUserProfile = async (userId, userData) => {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            user_name: userData.user_name,
            user_surname: userData.user_surname,
            user_email: userData.user_email,
            user_address: userData.user_address,
        },
        select: {
            user_name: true,
            user_surname: true,
            user_email: true,
            user_address: true,
        }
    });
    return updatedUser;
};