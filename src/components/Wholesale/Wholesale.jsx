import React, { useContext } from 'react';
import './Wholesale.css';
import Item from '../Item/Item';
import { ShopContext } from '../../context/ShopContext';

const Wholesale = () => {
  const { isWholesale, setIsWholesale, allProducts } = useContext(ShopContext);

  const handleSetRetail = () => {
    setIsWholesale(false);
  };

  const handleSetWholesale = () => {
    setIsWholesale(true);
  };

  return (
    <div className='Wholesale'>
      <button onClick={handleSetRetail}><h2>RETAIL</h2></button>
      <button onClick={handleSetWholesale}><h2>WHOLESALE</h2></button>
    </div>
  );
};

export default Wholesale;
