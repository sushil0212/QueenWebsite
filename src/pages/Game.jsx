// components/Game/Game.jsx
import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './css/Game.css';

const Game = () => {
  const { applyDiscount } = useContext(ShopContext);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 60000); // Increment timer every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 1) {
      applyDiscount(2); // Apply 2% discount
      alert('You get 2% Discount on Retail Product');
    } else if (timer === 3) {
      applyDiscount(5); // Apply 5% discount
      alert('You get 5% Discount on Retail Product');
    }
  }, [timer, applyDiscount]);

  return (
    <div className="game-container">
      <iframe
        src="https://coruscating-gnome-65c46c.netlify.app"
        title="Game"
        className="game-iframe"
      ></iframe>
      <p>Play time: {timer} minutes</p>
    </div>
  );
};

export default Game;
