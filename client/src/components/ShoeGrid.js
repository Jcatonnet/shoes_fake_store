import React, { useState, useEffect } from 'react';
import { getShoes } from '../services/shoeService';
import "./ShoeGridStyle.css";
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Typography } from "@mui/material";

export const ShoeGrid = ({ onShoeClick, onAddToCart}) => {
    const [shoes, setShoes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});

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

    const handleSizeChange = (event, shoeId, size) => {
        event.stopPropagation();
        setSelectedSizes({ ...selectedSizes, [shoeId]: size });
    };

    const handleAddToCart = (event, shoe) => {
        event.stopPropagation();
        const size = selectedSizes[shoe.id];
        if (size) {
            onAddToCart(shoe, size);
            alert("Item added to your cart")
        } else {
            alert("Please select a size");
        }
    };

    return (
        <Box className="shoe-grid">
            {shoes.map(shoe => (
                <Box key={shoe.id} className="shoe-card" onClick={() => onShoeClick(shoe)}>
                    <img src={shoe.product_picture} alt={shoe.product_name} className="shoe-image" />
                    <Box className="shoe-details">
                        <h3>{shoe.product_name}</h3>
                        <Box className="card-item-info">
                            <Typography sx={{ fontWeight: 'bold' }}>${shoe.product_price}</Typography>
                            <Typography >{isShoeInStock(shoe.product_sizes) ? 'In Stock' : 'Not Available'}</Typography>
                        </Box>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sizes: </FormLabel>
                            <RadioGroup
                                row
                                aria-label="size"
                                name="row-radio-buttons-group"
                                value={selectedSizes[shoe.id] || ''}
                                onChange={(event) => handleSizeChange(event, shoe.id, event.target.value)}
                            >
                                {shoe.product_sizes.map(sizeInfo => (
                                    <FormControlLabel 
                                        key={sizeInfo.size} 
                                        value={sizeInfo.size} 
                                        control={<Radio />} 
                                        label={sizeInfo.size} 
                                        disabled={sizeInfo.quantity === 0}
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Box display="flex" justifyContent="center" mt={2}>

                        <Button 
                            color="success" 
                            variant='contained' 
                            onClick={(event) => handleAddToCart(event, shoe)}
                        >
                            Add to cart
                        </Button>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};
