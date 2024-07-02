// ShopCategory.js

import React, { useState, useEffect } from 'react';
import './BannerSlider.css';

import nails_banner1 from '../components/images/banner_nails1.png';
import nails_banner2 from '../components/images/banner_nails2.png';
import nails_banner3 from '../components/images/banner_nails3.png';
import nails_banner4 from '../components/images/banner_nails4.png';
import nails_banner5 from '../components/images/banner_nails5.png';

const bannerImages = [nails_banner1, nails_banner2, nails_banner3, nails_banner4, nails_banner5];
const interval = 3000; 

const BannerSlider = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="banner-slider">
      <img src={bannerImages[currentBannerIndex]} alt={`Nails Banner ${currentBannerIndex + 1}`} />
    </div>
  );
};

export default BannerSlider;
