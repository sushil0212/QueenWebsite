
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/Footer/Footer";
import nails_banner from "./components/images/banner_nails.png";
import accessory_banner from "./components/images/banner_accessory.png";
import hair_banner from "./components/images/banner_hair.png";
import professional_banner from "./components/images/banner_professional.png";
import Homepage from "./pages/HomePage";
import ShopContextProvider from "./context/ShopContext";
import Game from "./pages/Game";
import SalesCondition from "./components/Footer/SalesCondition";
import AboutUs from "./components/Footer/AboutUs";
import ContactUs from "./components/Footer/ContactUs";
import TermsConditions from "./components/Footer/TermsConditions";
import RandomProducts from "./components/RandomProducts/RandomProducts";

function App() {
  const [showRandomProducts, setShowRandomProducts] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRandomProducts(true);
    }, 30000); // 30 seconds timer

    return () => clearTimeout(timer);
  }, []);

  return (
    <ShopContextProvider>
      <Router>
        <Navbar />
        {showRandomProducts && <RandomProducts />} {/* Show RandomProducts after 30 seconds */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/hair" element={<ShopCategory banner={hair_banner} category="hair" />} />
          <Route path="/nails" element={<ShopCategory banner={nails_banner} category="nails" />} />
          <Route path="/professional" element={<ShopCategory banner={professional_banner} category="professional" />} />
          <Route path="/accessory" element={<ShopCategory banner={accessory_banner} category="accessory" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/game" element={<Game />} />
          <Route path="/sales-condition" element={<SalesCondition />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        <Footer />
      </Router>
    </ShopContextProvider>
  );
}

export default App;
