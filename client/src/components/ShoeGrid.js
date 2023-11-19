import React, { useState, useEffect } from 'react';
import { getShoes } from '../services/shoeService';
import "./ShoeGridStyle.css";

export const ShoeGrid = () => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        const fetchShoes = async () => {
            const fetchedShoes = await getShoes();
            setShoes(fetchedShoes);
        };  

        fetchShoes();
    }, []);

    return (
        <div className="shoe-grid">
            {shoes.map(shoe => (
                <div key={shoe.id} className="shoe-card">
                    <img src={shoe.product_picture} alt={shoe.product_name} className="shoe-image" />
                    <div className="shoe-details">
                        <h3>{shoe.product_name}</h3>
                        <p className="shoe-price">${shoe.product_price}</p>
                        <div className="shoe-sizes">
                           Available sizes: {shoe.product_sizes.join('-')}
                        </div>
                        <div className="shoe-sizes">
                           Stock: {shoe.quantity_available}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
