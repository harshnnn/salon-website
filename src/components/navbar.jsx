import React, { Component, useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import './style.css'
import logo from './logo.svg'
import Auth from './auth';

const Navbar = () => {

  const [isAuthVisible, setIsAuthVisible] = useState(false);

  const toggleAuth = () => {
    setIsAuthVisible(!isAuthVisible)

    //for mobile screen
    if (!isAuthVisible) {
      for (let i = 2; i <= 9; i++) {
        const contentElement = document.querySelector('.content-' + i);
        contentElement.classList.add('responsive-class'); // No dot here
      }

    }
    if (isAuthVisible) {
      for (let i = 2; i <= 9; i++) {
        const contentElement = document.querySelector('.content-' + i);
        contentElement.classList.remove('responsive-class'); // No dot here
      }

    }
  }

  //Phone call
  const phoneNumber = '(509) 547 -0580';

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };


  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


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
        <img src={logo} alt="The Hair Company Logo" className='nav-logo' onClick={(e) => handleNavLinkClick(e, 'content1')} />
      </div>
      {isAuthVisible && (<Auth toggleAuth={toggleAuth} />)}

      <head>
        <meta name="description" content="The Hair Company - Your go-to salon for professional hair services. Explore our prices, services, gallery, and learn more about us." />
      </head>
      
      <div className={`menu-items ${menuVisible ? 'active' : ''}`}>
        <ul>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content1')}>Home</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content5')} >Our Prices</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content2')}>Services</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content7')} >Gallery</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content3')}>About Us</a></li>
          {/* <li><a href="#" className='nav-link' onClick={(e) => toggleAuth()}>User</a></li> */}

        </ul>
      </div>
      <div className='contact-btn' onClick={handleCallClick}><p> {phoneNumber}</p></div>
      <div className='menu-toggle-btn' onClick={toggleMenu} >{menuVisible ? <AiOutlineClose /> : <GiHamburgerMenu />}</div>

    </div>
  );

};

export default Navbar;

