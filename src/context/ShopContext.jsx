import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [isWholesale, setIsWholesale] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(true);
  const [discountedCount, setDiscountedCount] = useState(0);
  const [usedEmails, setUsedEmails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5005/products')
      .then(response => setAllProducts(response.data))
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      });

    axios.get('http://localhost:5005/cart')
      .then(response => setCartItems(response.data))
      .catch(error => {
        console.error('Error fetching cart items:', error);
        setError('Failed to fetch cart items. Please try again later.');
      });
  }, []);

  const handleUserSignUp = (name, email, password) => {
    const emailRecord = usedEmails.find(record => record.email === email);
    const now = new Date();
    if (emailRecord) {
      const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;
      if (now - new Date(emailRecord.date) < tenDaysInMilliseconds) {
        alert('You have already used this email address for a discount. Please try again after 10 days.');
        return false;
      }
    }

    setUsedEmails(prevEmails => [
      ...prevEmails.filter(record => record.email !== email),
      { email, date: now }
    ]);

    console.log('User signed up:', { name, email, password });
    setIsNewUser(true);
    return true;
  };

  const addToCart = async (itemId) => {
    const newItem = allProducts.find(product => product.id === itemId);
    if (!newItem) return;

    const purchaseMode = isWholesale ? 'wholesale' : 'retail';
    const existingItem = cartItems.find(product => product.id === itemId && product.purchaseMode === purchaseMode);

    let updatedCartItems;

    if (existingItem) {
      updatedCartItems = cartItems.map(product =>
        product.id === itemId && product.purchaseMode === purchaseMode
          ? { ...product, amount: product.amount + (isWholesale ? 6 : 1) }
          : product
      );
    } else {
      let price = newItem.new_price;
      let discounted = false;

      if (isNewUser && !isWholesale && discountedCount < 5) {
        price *= 0.95;
        setDiscountedCount(prevCount => prevCount + 1);
        discounted = true;
      }

      const product = {
        image: newItem.image,
        id: itemId,
        productName: newItem.name,
        amount: isWholesale ? 6 : 1,
        price: price,
        purchaseMode: purchaseMode,
        discounted: discounted
      };
      updatedCartItems = [...cartItems, product];
    }

    setCartItems(updatedCartItems);

    try {
      await axios.post('http://localhost:5005/cart', { itemId, purchaseMode, amount: isWholesale ? 6 : 1 });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId, purchaseMode) => {
    const updatedCartItems = cartItems.map(product => {
      if (product.id === itemId && product.purchaseMode === purchaseMode) {
        const amountToRemove = purchaseMode === 'wholesale' ? 6 : 1;
        product.amount -= amountToRemove;
        if (product.amount <= 0) return null;
      }
      return product;
    }).filter(product => product !== null);

    setCartItems(updatedCartItems);

    try {
      await axios.delete(`http://localhost:5005/cart/${itemId}`, { data: { purchaseMode } });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItem = async (itemId, purchaseMode, amount) => {
    const updatedCartItems = cartItems.map(product =>
      product.id === itemId && product.purchaseMode === purchaseMode
        ? { ...product, amount }
        : product
    );

    setCartItems(updatedCartItems);

    try {
      await axios.put(`http://localhost:5005/cart/${itemId}`, { purchaseMode, amount });
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((subtotal, item) => {
      const price = item.purchaseMode === 'wholesale' ? item.price * 0.6 : item.price;
      return subtotal + (price * item.amount);
    }, 0);
  };

  const getDiscountTotal = () => {
    return cartItems.reduce((discount, item) => {
      if (item.discounted) {
        const originalPrice = item.price / 0.95;
        const discountAmount = (originalPrice - item.price) * item.amount;
        return discount + discountAmount;
      }
      return discount;
    }, 0);
  };

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem, 
    getTotalCartItems,
    getCartSubtotal,
    getDiscountTotal,
    isWholesale,
    setIsWholesale,
    isNewUser,
    setIsNewUser,
    handleUserSignUp,
    error,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
