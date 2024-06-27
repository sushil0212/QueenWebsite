import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();
  const product = allProducts.find(e => e.id === parseInt(productId));

  return (
    <div>
      {product ? (
        <ProductDisplay product={product} />
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default Product;
