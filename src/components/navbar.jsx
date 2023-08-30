import React, { Component, useState } from 'react';
import './style.css'

const Navbar = () => {


  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };



  // scrolling 

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='nav-div'>
      <div className='logo'><p>Logo</p></div>

      <div className={`menu-items ${menuVisible ? 'active' : ''}`}>
        <ul>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content-1')}>Home</a></li>
          <li><a href="#" className='nav-link'>Book Online</a></li>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content-2')}>Services</a></li>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content-7')}>Gallery</a></li>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content-3')}>About Us</a></li>
        </ul>
      </div>
      <div className='contact-btn'><p>206 281 XXXX</p></div>
      <div className='menu-toggle-btn' onClick={toggleMenu} >&#9776;</div>

    </div>
  );

};

export default Navbar;

