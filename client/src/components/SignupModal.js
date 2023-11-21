import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { registerUser } from '../services/userService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    mt: 10,
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const SignupModal = ({ open, handleClose, handleLogin }) => {
    const [userData, setUserData] = useState({
        user_name: '',
        user_surname: '',
        user_email: '',
        user_password: '',
        user_address: '',
    });

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        try {
            await registerUser(userData);
            console.log('Registration successful');
            await handleLogin({
                user_email: userData.user_email, 
                user_password: userData.user_password
            });
            handleClose();
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Sign Up
                </Typography>
                <TextField
                    label="Name"
                    name="user_name"
                    value={userData.user_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Surname"
                    name="user_surname"
                    value={userData.user_surname}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email Address"
                    name="user_email"
                    type="email"
                    value={userData.user_email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="user_password"
                    type="password"
                    value={userData.user_password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    name="user_address"
                    value={userData.user_address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Create account
                </Button>
            </Box>
        </Modal>
    );
};