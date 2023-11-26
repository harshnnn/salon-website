import React, { Component, useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import './style.css'
import logo from './logo.svg'
import Auth from './auth';

const Navbar = () => {

  const [isAuthVisible, setIsAuthVisible] = useState(false);
  // const [token, setToken] = useState(null);
  // const [isUser, setIsUser] = useState(false);

  // const getCookie = (cname) => {
  //   const name = cname + "=";
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const ca = decodedCookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // };


  // const checkUserLoginStatus = () => {
  //   const tokenFromCookie = getCookie('token');
  //   if (tokenFromCookie) {
  //     setToken(tokenFromCookie);
  //     setIsUser(true);
  //     toggleAuth();
  //   }
  //   else {

  //     setIsUser(false)
  //     toggleAuth(); 
  //   }
  // };
  // useEffect(() => {
  //   // Check user login status when the component mounts
  //   checkUserLoginStatus();
  // }, []);

  const toggleAuth = () => {
    setIsAuthVisible(!isAuthVisible)
  }

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
        <img src={logo} alt="" className='nav-logo' />
      </div>
      {isAuthVisible && (<Auth toggleAuth={toggleAuth} />)}

      <div className={`menu-items ${menuVisible ? 'active' : ''}`}>
        <ul>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content1')}>Home</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content5')} >Our Prices</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content2')}>Services</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content7')} >Gallery</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => handleNavLinkClick(e, 'content3')}>About Us</a></li>
          <li><a href="#" className='nav-link' onClick={(e) => toggleAuth()}>User</a></li>

        </ul>
      </div>
      <div className='contact-btn' onClick={handleCallClick}><p> {phoneNumber}</p></div>
      <div className='menu-toggle-btn' onClick={toggleMenu} >{menuVisible ? <AiOutlineClose /> : <GiHamburgerMenu />}</div>

    </div>
  );

};

export default Navbar;

