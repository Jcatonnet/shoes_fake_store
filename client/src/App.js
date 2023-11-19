import React from 'react';
import { ShoeGrid } from './components/ShoeGrid';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to the Online Shoe Shop</h1>
            </header>
            <main>
                <ShoeGrid />
            </main>
            <footer className="App-footer">
                <p>© 2023 Online Shoe Shop</p>
            </footer>
        </div>
    );
};

export default App;
