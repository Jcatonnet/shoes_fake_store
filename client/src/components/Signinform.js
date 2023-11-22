import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export const Signinform = ({ handleLogin, handleOpenSignup }) => {
    const [loginData, setLoginData] = useState({
        user_email: '',
        user_password: ''
    });

    const handleChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        try {
            await handleLogin(loginData);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
            <Box>
                <Typography variant="h6" component="h2">Sign In into your account !</Typography>
                <TextField
                    label="Email Address"
                    name="user_email"
                    value={loginData.user_email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="user_password"
                    type="password"
                    value={loginData.user_password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                    Sign In
                </Button>
                <p>If you don't have an account, create one now !</p>
                <Button variant="contained" color="secondary" onClick={handleOpenSignup} fullWidth>
                    Sign Up
                </Button>
            </Box>
    );
};
