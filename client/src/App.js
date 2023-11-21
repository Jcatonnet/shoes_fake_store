import React from 'react';
import { ShoeGrid } from './components/ShoeGrid';
import { ShoeModal } from './components/ShoeModal';
import { Cart } from './components/Cart';
import { useState } from 'react';
import './App.css';
import { SignupModal } from './components/SignupModal.js';
import { Signinform } from './components/Signinform';
import { useEffect } from 'react';
import { loginUser } from './services/userService';

const App = () => {
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

const handleLogin = async (loginData) => {
    try {
      const response = await loginUser(loginData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleOpenSignup = () => setIsSignupOpen(true);
  const handleCloseSignup = () => setIsSignupOpen(false);

  const handleShoeClick = (shoe) => {
    setSelectedShoe(shoe);
};

const handleOpenCart = () => {
    setCartOpen(true);
};

const handleCloseCart = () => {
    setCartOpen(false);
};

const handleRemoveItem = (itemId, size) => {
    setCartItems(prevItems => {
        return prevItems.reduce((acc, item) => {
            if (item.id === itemId && item.selectedSize === size) {
                if (item.quantity > 1) {
                    acc.push({ ...item, quantity: item.quantity - 1 });
                }
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
    });
};


const handlePay = () => {
    // Logic for payment
};

const handleAddToCart = (shoe, size) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === shoe.id && item.selectedSize === size);

        if (existingItem) {
            return prevItems.map(item =>
                item.id === shoe.id && item.selectedSize === size
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            );
        } else {
            return [...prevItems, { ...shoe, selectedSize: size, quantity: 1 }];
        }
    });
};

const handleCloseModal = () => {
    setSelectedShoe(null);
};

    return (
        <div className="App">
            <header className="App-header">
                <div className="title-container">
                    <h1>Welcome to the Online Shoe Shop</h1>
                </div>
                <div className="cart-button-container">
                    <button onClick={handleOpenCart}>Cart</button>
                </div>
            </header>
            <main>
                {!isAuthenticated ? 
                <div className='signin-form'>     
                    <Signinform 
                        open={!isAuthenticated} 
                        handleLogin={handleLogin} 
                        handleOpenSignup={handleOpenSignup}/> 
                    <SignupModal 
                    open={isSignupOpen} 
                    handleClose={handleCloseSignup}
                    handleLogin={handleLogin}
                    />
                </div>
                    :
                    <>
                    <ShoeGrid onShoeClick={handleShoeClick} onAddToCart={handleAddToCart} />
                    {selectedShoe && <ShoeModal shoe={selectedShoe} onClose={handleCloseModal} onAddToCart={handleAddToCart} />}
                    </>
                }

            </main>
            <Cart 
                isOpen={isCartOpen}
                onClose={handleCloseCart}
                cartItems={cartItems}
                handleRemoveItem={handleRemoveItem}
                onPay={handlePay}
            />
            <footer className="App-footer">
                <p>© 2023 Online Shoe Shop</p>
            </footer>
        </div>
    );
};

export default App;
