import React from 'react';
import './CartStyle.css';
import { CartItem } from './CartItem';
import { Button, Box } from '@mui/material';

export const Cart = ({ isOpen, onClose, cartItems, handleRemoveItem, onPay }) => {
    if (!isOpen) {
        return null;
    }

    const totalCartAmount = cartItems.reduce((total, item) => {
        return total + (item.product_price * item.quantity);
    }, 0);

    return (
        <Box className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <button className="close-cart" onClick={onClose}>X</button>
            <h2>Your cart</h2>
            <Box className="cart-total">
                Total: ${totalCartAmount.toFixed(2)}
            </Box>
            {cartItems.map(item => (
                <CartItem key={item.id + item.selectedSize} item={item} handleRemoveItem={handleRemoveItem}></CartItem>
            ))}
            <Button className="pay-button" variant="contained" color="success">Pay</Button>
        </Box>
    );
};

