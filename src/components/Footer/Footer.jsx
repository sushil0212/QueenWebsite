import React from 'react';
import './Footer.css';
import instagram_icon from '../images/instagram_icon.png';
import pintester_icon from '../images/pintester_icon.png';
import whatsapp_icon from '../images/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <ul className="footer-links">
            <h1>WHO WE ARE</h1>
            <li>Sales Condition</li>
            <li>Terms & Conditions</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-column">
          <div className="footer-social-icon">
            <div className="footer-icons-container">
              <img src={instagram_icon} alt="Instagram" />
            </div>
            <div className="footer-icons-container">
              <img src={pintester_icon} alt="Pinterest" />
            </div>
            <div className="footer-icons-container">
              <img src={whatsapp_icon} alt="WhatsApp" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
