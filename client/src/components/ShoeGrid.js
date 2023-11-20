import React, { useState, useEffect } from 'react';
import { getShoes } from '../services/shoeService';
import "./ShoeGridStyle.css";

export const ShoeGrid = ({ onShoeClick }    ) => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        const fetchShoes = async () => {
            const fetchedShoes = await getShoes();
            setShoes(fetchedShoes);
        };  

        fetchShoes();
    }, []);

    const isShoeInStock = (product_sizes) => {
        return product_sizes.some(sizeInfo => sizeInfo.quantity > 0);
    };

    return (
        <div className="shoe-grid">
            {shoes.map(shoe => (
                <div key={shoe.id} className="shoe-card" onClick={() => onShoeClick(shoe)}>
                    <img src={shoe.product_picture} alt={shoe.product_name} className="shoe-image" />
                    <div className="shoe-details">
                        <h3>{shoe.product_name}</h3>
                        <p className="shoe-price">${shoe.product_price}</p>
                        <div className="shoe-sizes">
                            Available sizes: {
                               shoe.product_sizes.map(sizeInfo => `${sizeInfo.size}`).join(', ')
                            }                       
                        </div>
                        <div className="shoe-sizes">
                        {isShoeInStock(shoe.product_sizes) ? 'In Stock' : 'Not Available'}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
