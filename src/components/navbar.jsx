import React, { Component, useState } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose} from 'react-icons/ai';
import './style.css'
import logo from './logo.svg'
import Auth from './auth';

const Navbar = () => {

  //Phone call
  const phoneNumber = '+1234567890';

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };


  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
  setMenuVisible(!menuVisible);
  };



  // scrolling 
  // const handleNavLinkClick = (event) => {
  //   event.preventDefault();
  //   // Handle your navigation logic here
  // };
  const handleNavLinkClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuVisible(!menuVisible)
  };



  return (
    <div className='nav-div'>
      <div className='logo'>
        <img src={logo} alt="" className='nav-logo'/>
        
      </div>

      <div className={`menu-items ${menuVisible ? 'active' : ''}`}>
        <ul>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content1')}>Home</a></li>
          <li><a href="#" className='nav-link'  onClick={(e) => handleNavLinkClick(e, 'content5')} >Our Prices</a></li>
          <li><a href="#" className='nav-link'  onClick={(e) => handleNavLinkClick(e, 'content2')}>Services</a></li>
          <li><a href="#" className='nav-link'  onClick={(e) => handleNavLinkClick(e, 'content7')} >Gallery</a></li>
          <li><a href="#" className='nav-link'  onClick={(e) => handleNavLinkClick(e, 'content3')}>About Us</a></li>
          {/* <li><a href="#" className='nav-link'  onClick={(e) => handleNavLinkClick(e, 'content3')}>User</a></li> */}
        </ul>
      </div>
      <div className='contact-btn' onClick={handleCallClick}><p> {phoneNumber}</p></div>
      <div className='menu-toggle-btn' onClick={toggleMenu} >{menuVisible ?  <AiOutlineClose/>: <GiHamburgerMenu/> }</div>

    </div>
  );

};

export default Navbar;

