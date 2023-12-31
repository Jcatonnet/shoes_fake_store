import React from 'react';
import { ShoeGrid } from './components/ShoeGrid';
import { ShoeModal } from './components/ShoeModal';
import { Cart } from './components/Cart';
import { useState } from 'react';
import './App.css';
import { SignupModal } from './components/SignupModal.js';
import { Signinform } from './components/Signinform';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { loginUser, getUserProfile, updateUserProfile } from './services/userService';
import { UserProfileModal } from './components/UserProfileModal';
import {PaymentModal} from './components/PaymentModal';
import { updateShoeStock } from './services/shoeService';
import { addUserInventoryItems } from './services/inventoryService';
import { Button, Typography, Toolbar, AppBar, Box} from '@mui/material';

const App = () => {
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userProfileData, setUserProfileData] = useState({ user_name: '', user_surname:'', user_email: '', user_address: '' });

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    if (isAuthenticated) {
        fetchUserProfileData();
    }
  }, [isAuthenticated]);

  const fetchUserProfileData = async () => {
    try {
        const data = await getUserProfile();
        setUserProfileData(data);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

const handleSaveUserProfile = async (updatedData) => {
    try {
        await updateUserProfile(updatedData);
        setUserProfileData(updatedData);
        handleCloseUserProfile();
        alert('Profile successfully updated !')
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};

const handleLogin = async (loginData) => {
    try {
      const response = await loginUser(loginData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid email or password')
    }
  };

  const handleOpenSignup = () => setIsSignupOpen(true);
  const handleCloseSignup = () => setIsSignupOpen(false);

  const handleOpenUserProfile = () => {
    setIsUserProfileOpen(true);
};

const handleCloseUserProfile = () => {
    setIsUserProfileOpen(false);
};

const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
};

const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
};

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


const handlePay = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; 
    const purchasedItems = cartItems.map(item => {
        const sizeEntry = item.product_sizes.find(size => size.size === parseInt(item.selectedSize));
        return {
            id: sizeEntry.id,
            quantitySold: item.quantity
        };
    });

    try {
        await updateShoeStock(purchasedItems);
        const inventoryItems = purchasedItems.map(item => ({
            productSizeId: item.id,
            quantity: item.quantitySold
        }));

        await addUserInventoryItems(userId, inventoryItems);
        setCartItems([]);
        setIsPaymentModalOpen(false);
        alert("Great ! Purchase successful, items were added to your inventory")
    } catch (error) {
        console.error('Error updating stock:', error);
    }
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
        <Box className="App">
            <AppBar sx={{ backgroundColor: '#282c34', position: "static", zIndex: "100" }}  >
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                       Find your favorite red shoes here !
                    </Typography>
                    <Box>
                        {isAuthenticated && <Button color="inherit" onClick={handleOpenCart}>Cart</Button>}
                        {isAuthenticated && <Button color="inherit" onClick={handleOpenUserProfile}>Profile</Button>}
                    </Box>
                </Toolbar>
            </AppBar>
            <main>
                {!isAuthenticated ? 
                <Box className='signin-form'>     
                    <Signinform 
                        open={!isAuthenticated} 
                        handleLogin={handleLogin} 
                        handleOpenSignup={handleOpenSignup}/> 
                    <SignupModal 
                        open={isSignupOpen} 
                        handleClose={handleCloseSignup}
                        handleLogin={handleLogin}
                    />
                </Box>
                    :
                    <>
                        <ShoeGrid onShoeClick={handleShoeClick} onAddToCart={handleAddToCart} />
                        {selectedShoe && <ShoeModal shoe={selectedShoe} onClose={handleCloseModal} onAddToCart={handleAddToCart} />}
                        <UserProfileModal 
                            isOpen={isUserProfileOpen} 
                            onClose={handleCloseUserProfile} 
                            onSave={handleSaveUserProfile}
                            initialUserData={userProfileData}
                        />
                        <PaymentModal
                            isOpen={isPaymentModalOpen}
                            onClose={handleClosePaymentModal}
                            userProfileData={userProfileData}
                            onProceedPayment={handlePay}
                        />
                        <Cart
                            isOpen={isCartOpen} 
                            onClose={handleCloseCart}
                            cartItems={cartItems}
                            handleRemoveItem={handleRemoveItem}
                            onPay={handleOpenPaymentModal}
                            />          
                    </>
                }

            </main>

            <footer className="App-footer">
                <p>Julien test ! Thanks team !</p>
            </footer>
        </Box>
    );
};

export default App;
