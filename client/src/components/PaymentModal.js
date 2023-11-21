import React, { useState } from 'react';
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

export const PaymentModal = ({ isOpen, onClose, userProfileData, onProceedPayment }) => {
    const [creditCardNumber, setCreditCardNumber] = useState('');

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
            <button className="close-button" onClick={onClose}>X</button>
                <TextField
                    label="Name"
                    value={userProfileData.user_name}
                    fullWidth
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Email"
                    value={userProfileData.user_email}
                    fullWidth
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Address"
                    value={userProfileData.user_address}
                    fullWidth
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Credit Card Number"
                    value={creditCardNumber}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant='contained' color="success" disabled={!creditCardNumber} onClick={onProceedPayment}>Proceed payment</Button>
                </Box>
            </Box>
        </Modal>
    );
};

