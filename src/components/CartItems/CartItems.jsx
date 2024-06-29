import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './CartItems.css';
import remove_icon from '../images/remove_icon.png';

const CartItems = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItem,
    getCartSubtotal,
    getDiscountTotal,
    getTotalCartItems,
    isNewUser,
    setIsNewUser,
    discount // Include discount from context
  } = useContext(ShopContext);

  const [subtotal, setSubtotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartSubtotal = getCartSubtotal();
    const discountTotal = getDiscountTotal();

    setSubtotal(cartSubtotal);
    setDiscountAmount(discountTotal);
    setTotal(cartSubtotal - discountTotal);

    if (getTotalCartItems() > 0) {
      setIsNewUser(true);
    } else {
      setIsNewUser(false);
    }
  }, [cartItems, getCartSubtotal, getDiscountTotal, getTotalCartItems, setIsNewUser]);

  const handleQuantityChange = (productId, purchaseMode, event) => {
    const newAmount = parseInt(event.target.value);
    if (newAmount >= 0) {
      updateCartItem(productId, purchaseMode, newAmount);
    }
  };

  const handleFinalPurchase = () => {
    console.log('Final purchase initiated');
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((product) => {
        const price = (product.purchaseMode === 'wholesale' ? product.price * 0.6 : product.price) || 0;
        const total = price * product.amount;

        return (
          <div key={product.id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={product.image} alt="" className='carticon-product-icon' />
              <p>{product.productName}</p>
              <p>€{price.toFixed(2)}</p>
              <input
                type='number'
                className='cartitems-quantity'
                value={product.amount}
                onChange={(e) => handleQuantityChange(product.id, product.purchaseMode, e)}
              />
              <p>€{total.toFixed(2)}</p>
              <img
                className='cartitems-remove-icon'
                src={remove_icon}
                onClick={() => removeFromCart(product.id, product.purchaseMode)}
                alt="Remove"
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>€{subtotal.toFixed(2)}</p>
            </div>
            <div className="cartitems-total-item">
              <p>Discount</p>
              <p>€{discountAmount.toFixed(2)}</p>
            </div>
            <div className="cartitems-total-item">
              <h2>Total</h2>
              <h2>€{(total > 0 ? total : 0).toFixed(2)}</h2>
            </div>
          </div>
          <button onClick={handleFinalPurchase}>FINAL PURCHASE</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;