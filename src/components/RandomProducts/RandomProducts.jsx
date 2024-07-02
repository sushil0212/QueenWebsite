import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import './RandomProducts.css'; // Import the CSS file

const RandomProducts = () => {
  const { allProducts } = useContext(ShopContext);
  const [randomProducts, setRandomProducts] = useState([]);
  const [showRandomProducts, setShowRandomProducts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRandomProducts(true);
      getRandomProducts();
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const getRandomProducts = () => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 4));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowRandomProducts(false); // Hide the entire component
  };

  if (!showRandomProducts) {
    return null;
  }

  return (
    <div className="random-products">
      <h2>Check out these products:</h2>
      <div className="random-products-list">
        {randomProducts.map(product => (
          <div key={product.id} className="random-product-item" onClick={() => handleProductClick(product.id)}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>€{product.new_price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
