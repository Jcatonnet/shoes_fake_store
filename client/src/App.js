import React from 'react';
import { ShoeGrid } from './components/ShoeGrid';
import { ShoeModal } from './components/ShoeModal';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedShoe, setSelectedShoe] = useState(null);

  const handleShoeClick = (shoe) => {
    setSelectedShoe(shoe);
};

const handleCloseModal = () => {
    setSelectedShoe(null);
};

    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to the Online Shoe Shop</h1>
            </header>
            <main>
             <ShoeGrid onShoeClick={handleShoeClick} />
             {selectedShoe && <ShoeModal shoe={selectedShoe} onClose={handleCloseModal} />}
            </main>
            <footer className="App-footer">
                <p>© 2023 Online Shoe Shop</p>
            </footer>
        </div>
    );
};

export default App;
