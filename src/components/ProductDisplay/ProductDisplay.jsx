import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../images/star_icon.png';
import star_dull_icon from '../images/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star dull" />
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price old">€{product.old_price}</div>
          <div className="productdisplay-right-price-new">€{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description ? product.description : 'No description available.'}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>100g</div>
            <div>200g</div>
            <div>400g</div>
            <div>500g</div>
            <div>1000g</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span> Shampoo, Mask, Conditioner, Serum</p>
        <p className='productdisplay-right-category'><span>Tags :</span> Wholesale, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
