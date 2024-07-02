import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductDisplay.css';
import star_icon from '../images/star_icon.png';
import star_dull_icon from '../images/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';
const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  // Function to render star icons based on rating
  const renderStarRating = (rating) => {
    const stars = [];
    const totalStars = 5;
    const fullStars = Math.ceil(rating); // Use Math.ceil for half stars

    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`full-${i}`} src={star_icon} alt="star" />);
    }

    for (let i = fullStars; i < totalStars; i++) {
      stars.push(<img key={`dull-${i}`} src={star_dull_icon} alt="star dull" />);
    }

    return stars;
  };

  return (
    <div className='productdisplay'>
      
      <div className="productdisplay-img">
        <img className='productdisplay-main-img' src={product.image} alt={product.name} />
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          {renderStarRating(product.rating)} {/* Render star rating */}
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price old">€{product.old_price}</div>
          <div className="productdisplay-right-price-new">€{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description ? product.description : 'No description available.'}
          <br/><br/>
          <Link style={{ textDecoration: 'none' }} to="/policies"><h4>Payment   Shipping   Returns</h4></Link>
        </div>
        <br/>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span> {product.category}</p>
        <p className='productdisplay-right-category'><span>Brand :</span> {product.brand}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
