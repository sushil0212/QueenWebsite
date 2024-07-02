// components/Homepage.jsx
import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Wholesale from '../components/Wholesale/Wholesale';
import nails_banner from '../components/images/banner_nails.png';
import accessory_banner from '../components/images/banner_accessory.png';
import hair_banner from '../components/images/banner_hair.png';
import professional_banner from '../components/images/banner_professional.png';

const Homepage = () => {
  return (
    <div className="homepage">
      <Wholesale />
      <div className="category-banners">
        <Link to='/hair'><img src={hair_banner} alt="Hair Category" /></Link>
        <Link to='/nails'><img src={nails_banner} alt="Nails Category" /></Link>
        <Link to='/professional'><img src={professional_banner} alt="Professional Category" /></Link>
        <Link to='/accessory'><img src={accessory_banner} alt="Accessory Category" /></Link>
      </div>
    </div>
  );
};

export default Homepage;
