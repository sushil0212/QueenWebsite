import React from "react";
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

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/hair" element={<ShopCategory banner={hair_banner} category="hair" />} />
          <Route path="/nails" element={<ShopCategory banner={nails_banner} category="nails" />} />
          <Route path="/professional" element={<ShopCategory banner={professional_banner} category="professional" />} />
          <Route path="/accessory" element={<ShopCategory banner={accessory_banner} category="accessory" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </Router>
    </ShopContextProvider>
  );
}

export default App;
