import React from 'react';
import './CartItemStyle.css';

export const CartItem = ({ item, handleRemoveItem }) => {
    console.log("items", item)
    return (
        <div className="cart-item">
            <img src={item.product_picture} alt={item.product_name} className="cart-item-image" />
            <div className="cart-item-details">
            <div className="cart-item-info">
                <p>{item.product_name} (Size: {item.selectedSize})</p>
                <p className="cart-item-quantity">x{item.quantity}</p>
            </div>
                <p>${item.product_price}</p>
                <button onClick={() => handleRemoveItem(item.id, item.selectedSize)}>Remove</button>
            </div>
        </div>
    );
};

