import React, { useContext } from 'react';
import './css/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const { allProducts, isWholesale, error } = useContext(ShopContext);

  console.log('Props:', props);
  console.log('All Products:', allProducts);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="Category Banner" />
      <div className="shopcategory-products">
        {allProducts
          .filter(item => item.category === props.category) // Filter by category
          .map((item, i) => {
            const price = isWholesale ? (item.new_price * 0.6).toFixed(2) : item.new_price;
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={price} old_price={item.old_price} />;
          })}
      </div>
    </div>
  );
}

export default ShopCategory;
