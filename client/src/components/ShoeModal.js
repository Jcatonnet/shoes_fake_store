import React from 'react';
import './ShoeModalStyle.css';

export const ShoeModal = ({ shoe, onClose }) => {
    if (!shoe) {
        return null;
    }

    const stockStatusClass = shoe.quantity_available > 0 ? "in-stock" : "not-available";

    return (
        <div className="shoe-modal-backdrop">
            <div className="shoe-modal">
                <button className="close-button" onClick={onClose}>X</button>
                <img src={shoe.product_picture} alt={shoe.product_name} className="shoe-image" />
                <h3>{shoe.product_name}</h3>
                <p className="shoe-price">${shoe.product_price}</p>
                <div className="sizes-and-stock">
                    <p className="shoe-sizes">Sizes: {shoe.product_sizes.join(', ')}</p>
                    <p className={stockStatusClass}>{shoe.quantity_available > 0 ? "In Stock" : "Not available"}</p>
                </div>
                <p className="shoe-colors">Colors: {shoe.product_colors.join(', ')}</p>
                <p className="shoe-description">{shoe.product_description}</p>
                <button className="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
};
