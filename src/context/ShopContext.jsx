import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  // State declarations
  const [cartItems, setCartItems] = useState([]);
  const [isWholesale, setIsWholesale] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(true);
  const [discountedCount, setDiscountedCount] = useState(0);
  const [usedEmails, setUsedEmails] = useState([]);
  const [discount, setDiscount] = useState(0);

  // Fetch initial data on component mount
  useEffect(() => {
    axios.get('https://cosmetics-server-nu.vercel.app/products')
      .then(response => setAllProducts(response.data))
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      });

    axios.get('https://cosmetics-server-nu.vercel.app/cart')
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
      const tenDays = 10 * 24 * 60 * 60 * 1000;
      if (now - new Date(emailRecord.date) < tenDays) {
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
      } else if (!isWholesale && discount > 0) {
        price *= (1 - discount / 100);
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
      await axios.post('https://cosmetics-server-nu.vercel.app/cart', { itemId, purchaseMode, amount: isWholesale ? 6 : 1 });
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
    }).filter(Boolean);

    setCartItems(updatedCartItems);

    try {
      await axios.delete(`https://cosmetics-server-nu.vercel.app/cart/${itemId}/${purchaseMode}`);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };


  const updateCartItem = (itemId, purchaseMode, newAmount) => {
    const updatedCartItems = cartItems.map(product => {
      if (product.id === itemId && product.purchaseMode === purchaseMode) {
        product.amount = newAmount;
      }
      return product;
    }).filter(product => product.amount > 0);

    setCartItems(updatedCartItems);

    try {
      axios.put('https://cosmetics-server-nu.vercel.app/cart', { itemId, purchaseMode, amount: newAmount });
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };


  const getCartSubtotal = () => {
    return cartItems.reduce((subtotal, item) => {
      const price = item.purchaseMode === 'wholesale' ? item.price * 0.6 : item.price;
      return subtotal + (price * item.amount);
    }, 0);
  };

  const getDiscountTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.discounted) {
        if (isNewUser && !isWholesale) {
          return total + (item.price * 0.05 * item.amount); // 5% discount for new users up to 5 items
        } else if (!isWholesale && discount > 0) {
          return total + ((item.price / (1 - discount / 100)) * (discount / 100) * item.amount); // Game discount calculation
        }
      }
      return total;
    }, 0);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  };

  const applyDiscount = (discountPercentage) => {
    setDiscount(discountPercentage);
  };

  const contextValues = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    getCartSubtotal,
    getDiscountTotal,
    getTotalCartItems,
    isWholesale,
    setIsWholesale,
    allProducts,
    setAllProducts,
    error,
    setError,
    handleUserSignUp,
    isNewUser,
    setIsNewUser,
    discountedCount,
    setDiscountedCount,
    usedEmails,
    setUsedEmails,
    discount,
    applyDiscount
  };

  return (
    <ShopContext.Provider value={contextValues}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
