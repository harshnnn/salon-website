import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AiOutlineClose } from 'react-icons/ai';
import logo from './logo.svg'


const Auth = (props) => {

    const [snackbarLogin, setSnackbarLogin] = useState(false);
    const [snackbarLogout, setSnackbarLogout] = useState(false);
    const [isAppointmentCance, setIsAppointmentCancell] = useState(false);

    const cancelAppointment = () => {
        alert('appointment canceled')
        props.toggleAuth();
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarLogin(false);

        setSnackbarLogout(false);
    };


    const [phoneNumber, setPhoneNumber] = useState('');
    const [response, setResponse] = useState('');
    const [isUser, setIsUser] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenKey, setTokenKey] = useState('');
    const [OTP, SetOpt] = useState('');
    const [isVerifyOTP, setIsVerifyOTP] = useState(false);


    const postData = {
        phone: phoneNumber,
    };

    let verifyData = {
        phone: '',
        otp: '',
    };

    const handleLoginFormSubmit = (event) => {
        event.preventDefault(); // Prevents the form from reloading the page
        handleOtpRequest(); // Initiates OTP request based on the phone number entered
        setIsVerifyOTP(true);
    };

    const handleVerifyFormSubmit = (event) => {
        event.preventDefault();
        verifyData.phone = phoneNumber;
        verifyData.otp = OTP; // Set OTP to verify
        handleVerifyRequest();
    };

    const handleChangeNumber = () =>{
        setIsVerifyOTP(false);
    }


    const handleOtpRequest = () => {
        axios.post('https://thorfinn.pythonanywhere.com/auth/generate/', postData)
            .then((response) => {
                setResponse(response.data);

                // After getting the OTP, make another request to verify and obtain the token
                verifyData = {
                    phone: postData.phone,
                    otp: String(response.data.generated_otp),
                };

                alert(response.data.generated_otp);

            })
            .catch((error) => {
                console.error('POST request error:', error);
            });
    };

    const handleVerifyRequest = () => {

        axios.post('https://thorfinn.pythonanywhere.com/auth/verify/', verifyData)
            .then((response) => {
                // Assuming the token is in response.data.token, you can set it in state or use it as needed.
                if (response.data.token != null) {
                    setToken(true);
                    setTokenKey(response.data.token);
                    console.log("just set the token to true ");
                    setCookie('token', response.data.token, 1);
                    setSnackbarLogin(true); // Open Snackbar on successful token retrieval
                    setTimeout(() => {
                        props.toggleAuth();
                        window.location.reload();

                    }, 2000);

                }

                console.log("the token is " + response.data.token);


            })
            .catch((error) => {
                setToken(false);
                console.log("just set the token to false");
                console.error('Verify request error:', error);
            });
    }



    // Function to delete the cookie by name
    const deleteCookie = (cname) => {
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    // Handle logout: Delete token cookie and update state
    const handleLogout = () => {
        deleteCookie('token');
        setToken(null);
        setIsUser(null);
        setSnackbarLogout(true); // Open Snackbar on logout
        setTimeout(() => {
            props.toggleAuth();
            window.location.reload();

        }, 2000);

    };

    // Function to set the cookie with token
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    const getCookie = (cname) => {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    const checkUserLoginStatus = () => {
        const tokenFromCookie = getCookie('token');
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
            setIsUser(true);

        }
        else (
            setIsUser(false)
        )
    };
    useEffect(() => {
        // Check user login status when the component mounts
        checkUserLoginStatus();
    }, []);

    return (
        <div className='auth-div'>
            <Snackbar
                open={snackbarLogin}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Login successful"
                action={
                    <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
            <Snackbar
                open={snackbarLogout}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Logged out successfully"
                action={
                    <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />


            {isUser && (
                <div className="active-booking">
                    <button className='close-btn' onClick={() => { props.toggleAuth()}}>
                    <AiOutlineClose className='close-icon' />
                    </button>
                    <h3 style={{marginRight: '55%', marginTop:'10px', marginBottom: '10px'}}>Your Active Booking</h3>

                    <div className="booking-item">
                        <div className="booking-details">
                            <div>Date & Time: <span>Nov 27, 2023 at 3:00 PM</span></div>
                            <div>Services: <span>Haircut & Blowdry</span></div>
                            <div>Add-ons: <span>None</span></div>
                            <div>Professional: <span>Jane Doe</span></div>
                            <div >Cost: <span>$65</span></div>
                        </div>

                        {isAppointmentCance && (
                            <div className='appointment-cancel-alert'>
                                Are you sure you want to cancel this appointment?
                                <button onClick={cancelAppointment}>YES</button>
                                <button onClick={() => { setIsAppointmentCancell(false) }}>No</button>
                            </div>
                        )}


                        <button className='cancel-btn' onClick={() => { setIsAppointmentCancell(true) }}>Cancel</button>
                    </div>

                    <button className="logout-button" onClick={handleLogout}>Logout</button>

                </div>

            )}
            {isUser === false && (
                <div className='auth-login'>
                      <button className='close-btn auth-close' onClick={() => { props.toggleAuth()}}>
                    <AiOutlineClose className='close-icon' />
                    </button>
                    <img src={logo} className='auth-logo' alt="" />
                    
                    {isVerifyOTP === false && (
                        <form onSubmit={handleLoginFormSubmit}>
                            <h3>Login With Your Phone </h3>
                            <label htmlFor="">Enter Number</label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <button type='submit'>Submit</button>
                        </form>
                    )}
                    {isVerifyOTP && (
                        <div className='otp-verification'>
                            
                            <form onSubmit={handleVerifyFormSubmit}>
                            <h4>Enter OTP</h4>
                                <input
                                    type="text"
                                    value={OTP}
                                    onChange={(e) => SetOpt(e.target.value)}
                                />
                                <button type='submit'>Verify</button>
                                <button  onClick={handleChangeNumber} className='change-num-btn'>Change number</button>

                            </form>
                        </div>
                    )}
                </div>
            )}


        </div>
    );
}

export default Auth;
