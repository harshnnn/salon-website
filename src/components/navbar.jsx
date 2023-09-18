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
    setMenuVisible(!menuVisible);
  
    // Get the currently active section
    const activeSection = document.querySelector('.section.active');
  
    // Check if the clicked section is different from the active section
    // if (activeSection && activeSection.id === sectionId) {
    //   // Clicked on the same section, close the menu
    //   return;
    // }
  
    // Scroll to the target section immediately if the menu is closed
    if (!menuVisible) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  

  return (
    <div className='nav-div'>
      <div className='logo'><p>Logo</p></div>

      <div className={`menu-items ${menuVisible ? 'active' : ''}`}>
        <ul>
          <li><a href="#" className='nav-link' onClick={() => handleNavClick('content1')}>Home</a></li>
          <li><a href="#" className='nav-link' >Book Online</a></li>
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

