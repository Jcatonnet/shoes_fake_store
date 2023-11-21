import React from 'react';
import './CartItemStyle.css';
import { Button, Box, Typography } from '@mui/material';

export const CartItem = ({ item, handleRemoveItem }) => {
    return (
        <Box className="cart-item">
            <img src={item.product_picture} alt={item.product_name} className="cart-item-image" />
            <Box className="cart-item-details">
            <Box className="cart-item-info">
                <Typography>{item.product_name} (Size: {item.selectedSize})</Typography>
                <Typography className="cart-item-quantity">x{item.quantity}</Typography>
            </Box>
                <Typography>${item.product_price}</Typography>
                <Button color='error' onClick={() => handleRemoveItem(item.id, item.selectedSize)}>Remove</Button>
            </Box>
        </Box>
    );
};

