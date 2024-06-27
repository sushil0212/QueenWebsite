// Item.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import './Item.css';

const Item = ({ id, name, image, new_price, old_price }) => {
    const { isWholesale } = useContext(ShopContext);
    const displayPrice = isWholesale ? (new_price * 0.6).toFixed(2) : new_price;

    return (
        <div className="item">
            <Link to={`/product/${id}`}>
                <img src={image} alt={name} />
                <h3>{name}</h3>
                <p className="old-price">€{old_price}</p>
                <p className="new-price">€{displayPrice}</p>
            </Link>
        </div>
    );
};

export default Item;
