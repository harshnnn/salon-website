import React, { Component, useState } from 'react';
import './style.css'

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

  const handleNavClick = (sectionId) => {
    // Get the target section by ID
    const element = document.getElementById(sectionId);
  
    if (element) {
      // Check if the target section is already in view
      const elementRect = element.getBoundingClientRect();
      if (elementRect.top >= 0 && elementRect.bottom <= window.innerHeight) {
        // Target section is already in view, do nothing
        return;
      }
  
      // Scroll to the target section
      element.scrollIntoView({ behavior: 'smooth' });
  
      // Close the menu if it's open
      if (menuVisible) {
        toggleMenu();
      }
    }
  };
  

  return (
    <div className='nav-div'>
      <div className='logo'><p>Logo</p></div>

      <div className={`menu-items ${menuVisible ? 'active' : ''}`}>
        <ul>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content1')}>Home</a></li>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content4')} >Book Online</a></li>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content2')}>Services</a></li>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content7')}>Gallery</a></li>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content3')}>About Us</a></li>
        </ul>
      </div>
      <div className='contact-btn' onClick={handleCallClick}><p> {phoneNumber}</p></div>
      <div className='menu-toggle-btn' onClick={toggleMenu} >&#9776;</div>

    </div>
  );

};

export default Navbar;

