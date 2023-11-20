import React from 'react';
import './ShoeModalStyle.css';

export const ShoeModal = ({ shoe, onClose }) => {
    if (!shoe) {
        return null;
    }

    return (
        <div className="shoe-modal-backdrop">
            <div className="shoe-modal">
                <button className="close-button" onClick={onClose}>X</button>
                <img src={shoe.product_picture} alt={shoe.product_name} className="shoe-image" />
                <h3>{shoe.product_name}</h3>
               <div className="sizes-and-stock">
                    <label htmlFor="size-select">Choose a size:</label>
                    <select id="size-select">
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
                <button className="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
};
