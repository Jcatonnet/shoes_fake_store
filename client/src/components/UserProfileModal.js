import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const UserProfileModal = ({ isOpen, onClose, onSave, initialUserData }) => {
    const [userData, setUserData] = useState(initialUserData);

    useEffect(() => {
        if (isOpen) {
            setUserData(initialUserData);
        }
    }, [isOpen, initialUserData]);

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
            <button className="close-button" onClick={onClose}>X</button>
                    <TextField
                        name="user_name"
                        label="Name"
                        value={userData.user_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"                   
                    />
                    <TextField
                        name="user_surname"
                        label="Surname"
                        value={userData.user_surname}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"                  
                    />
                    <TextField
                        name="user_email"
                        label="Email"
                        value={userData.user_email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"                    
                    />
                    <TextField
                        name="user_address"
                        label="Name"
                        value={userData.user_address}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"                     
                    />
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant='contained' color="success" onClick={() => onSave(userData)}>Save</Button>
                </Box>
            </Box>
        </Modal>
    );
};

