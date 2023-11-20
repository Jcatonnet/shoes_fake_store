import React from 'react';
import './ShoeModalStyle.css';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

export const ShoeModal = ({ shoe, onClose, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        if (shoe && shoe.product_sizes.length > 0) {
            const firstAvailableSize = shoe.product_sizes.find(sizeInfo => sizeInfo.quantity > 0);
            if (firstAvailableSize) {
                setSelectedSize(firstAvailableSize.size);
            }
        }
    }, [shoe]);

    if (!shoe) {
        return null;
    }

    const handleAddToCart = () => {
        if (selectedSize) {
            onAddToCart(shoe, selectedSize);
            onClose();
            alert("Item added to your cart !")
        } else {
            alert("Please select a size");
        }
    };


    return (
        <div className="shoe-modal-backdrop">
            <div className="shoe-modal">
                <button className="close-button" onClick={onClose}>X</button>
                <img src={shoe.product_picture} alt={shoe.product_name} className="shoe-image" />
                <h3>{shoe.product_name}</h3>
                <div className="sizes-and-stock">
                    <label htmlFor="size-select" >Choose a size:</label>
                    <select id="size-select" value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                        {shoe.product_sizes.map(sizeInfo => (
                            <option 
                                key={sizeInfo.id} 
                                value={sizeInfo.size}
                                disabled={sizeInfo.quantity === 0}
                            >
                                {sizeInfo.size} - {sizeInfo.quantity > 0 ? "In Stock" : "Not Available"}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="shoe-colors">Colors: {shoe.product_colors.join(', ')}</p>
                <p className="shoe-description">{shoe.product_description}</p>
                <Button variant="contained" color="success" onClick={handleAddToCart}>Add to cart</Button>
            </div>
        </div>
    );
};
