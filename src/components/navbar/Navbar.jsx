import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../images/logo.png';
import cart_icon from '../images/cart_icon.png';
import profile_icon from '../images/profile_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';


const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className='navbar'>
      <Link to='/' className="nav-logo" style={{ textDecoration: 'none' }}>
        <img src={logo} alt='logo' />
        <p>Nepshopy</p>
      </Link>
      <ul className='nav-menu'>
        <li><Link style={{ textDecoration: 'none' }} to='/hair'>Hair</Link></li>
        <li><Link style={{ textDecoration: 'none' }} to='/nails'>Nails</Link></li>
        <li><Link style={{ textDecoration: 'none' }} to='/professional'>Professional</Link></li>
        <li><Link style={{ textDecoration: 'none' }} to='/accessory'>Accessory</Link></li>
        <Link style={{ textDecoration: 'none' }} to="/game">Game</Link>


      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><img src={profile_icon} alt='profile' /></Link>
        <Link to='/cart'><img src={cart_icon} alt='cart' /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
