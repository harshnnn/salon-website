import React, { Component, useState, useRef, useEffect } from 'react';
import './style.css'
import Navbar from './navbar';
import { AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineFacebook, AiOutlineClose, AiOutlineDownCircle } from 'react-icons/ai';
import { FaRandom } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { PiPaperPlaneTiltLight } from 'react-icons/pi';
import { IoCallOutline } from 'react-icons/io5';
import { IoIosArrowForward } from "react-icons/io";
import { BsSunrise, BsSun, BsSunset, BsChevronBarExpand } from 'react-icons/bs';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { TiTick } from 'react-icons/ti'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import image1 from './Resources/proffessionals/proff2-1.jpg';
import image2 from './Resources/proffessionals/proff2-2.jpg';
import image3 from './Resources/proffessionals/proff2-3.jpg';
import gallery1 from './Resources/gallery/gallery-1.jpg'
import gallery2 from './Resources/gallery/gallery-2.jpg'
import gallery3 from './Resources/gallery/gallery-3.jpg'
import gallery4 from './Resources/gallery/gallery-4.jpg'
import gallery5 from './Resources/gallery/gallery-5.jpg'
import gallery6 from './Resources/gallery/gallery-6.jpg'
import gallery7 from './Resources/gallery/gallery-7.jpg'
import gallery8 from './Resources/gallery/gallery-8.jpg'
import gallery9 from './Resources/gallery/gallery-9.jpg'
import gallery10 from './Resources/gallery/gallery-10.jpg'
import axios from 'axios';
import CustomCarousel from './content7'
import { GiHairStrands, GiRazor, GiCharcuterie } from "react-icons/gi";
import ProfessionalCarousel from './content4';
import { dividerClasses } from '@mui/material';






const HomePage = () => {



    //Requests

    const [response, setResponse] = useState('');
    const [token, setToken] = useState(null);
    const [tokenKey, setTokenKey] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [isUser, setIsUser] = useState(false);
    const [OTP, SetOpt] = useState('');

    const postData = {
        phone: phoneNumber,
    };

    let verifyData = {
        phone: '',
        otp: '',
    };

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

                }

                console.log("the token is " + response.data.token);


            })
            .catch((error) => {
                setToken(false);
                console.log("just set the token to false");
                console.error('Verify request error:', error);
            });
    }

    // Function to set the cookie with token
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    // Function to get the cookie value by name
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

    // Function to delete the cookie by name
    const deleteCookie = (cname) => {
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    // Handle logout: Delete token cookie and update state
    const handleLogout = () => {
        deleteCookie('token');
        setToken(null);
    };

    // Check if the token exists in cookies to determine user login status
    const checkUserLoginStatus = () => {
        const tokenFromCookie = getCookie('token');
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
            setIsUser(true);
        }
    };

    //keep checking if user is present or not
    useEffect(() => {
        checkUserLoginStatus();
    }, []);


    //Login 

    useEffect(() => {
        if (token === true) {
            alert("Login Sucessfull!!");
            setIsUser(true);

            const parentDiv = document.getElementById('parent-div');
            const loginContainer = parentDiv.querySelector('.login-container');
            if (loginContainer) {
                parentDiv.removeChild(loginContainer);
                handleMinimizeOrder();
            }
        } else if (token === false) {
            alert("Failed to login...");
        }
    }, [token]);

    const handleLoginClick = () => {
        const parentDiv = document.getElementById('parent-div');

        // Create the container div
        const loginContainer = document.createElement('div');
        loginContainer.classList.add('login-container');

        // Create the input field for mobile number
        const mobileInput = document.createElement('input');
        mobileInput.type = 'tel';
        mobileInput.placeholder = 'Enter Mobile Number';
        mobileInput.classList.add('login-input');

        //Create the input field for OTP
        const otpInput = document.createElement('input');
        otpInput.type = 'number';
        otpInput.placeholder = "Enter OTP...";
        otpInput.classList.add('login-input');

        // Create the "Send OTP" button
        const sendOTPButton = document.createElement('button');
        sendOTPButton.textContent = 'Send OTP';
        sendOTPButton.classList.add('send-otp-button');

        //Create the "Verify OTP" button
        const verifyOTPButton = document.createElement('button');
        verifyOTPButton.textContent = "Enter OTP...";
        verifyOTPButton.classList.add('send-otp-button');

        //Create the "Change Number" button
        const changeNumberButton = document.createElement('button');
        changeNumberButton.textContent = "Change Number";
        changeNumberButton.classList.add('send-otp-button');
        changeNumberButton.classList.add('change-number');

        // Append elements to the container
        loginContainer.appendChild(mobileInput);
        loginContainer.appendChild(sendOTPButton);
        parentDiv.appendChild(loginContainer);

        // Add an event listener to the "Send OTP" button
        sendOTPButton.addEventListener('click', () => {
            const enteredPhoneNumber = String(mobileInput.value);

            if (/^\d{10}$/.test(enteredPhoneNumber)) {
                setPhoneNumber(enteredPhoneNumber);


                postData.phone = enteredPhoneNumber; // Update postData

                handleOtpRequest();

                // Remove the "Send OTP" button
                loginContainer.removeChild(sendOTPButton);
                loginContainer.removeChild(mobileInput);

                loginContainer.appendChild(otpInput);
                loginContainer.appendChild(verifyOTPButton);

                loginContainer.appendChild(changeNumberButton);
            }

        });

        verifyOTPButton.addEventListener('click', () => {
            handleVerifyRequest();
        });

        changeNumberButton.addEventListener('click', () => {

            //Add both previous button and inputfield
            loginContainer.appendChild(mobileInput);
            loginContainer.appendChild(sendOTPButton);

            //remove cuttent button and inputfield
            loginContainer.removeChild(changeNumberButton);

            loginContainer.removeChild(otpInput);
            loginContainer.removeChild(verifyOTPButton);
        });


    };




    const handleOnDragStart = (e) => e.preventDefault();


    const [selectedItem, setSelectedItem] = useState(0);

    const handleItemClick = (index) => {
        setSelectedItem(index);
        setIsExpanded(!isExpanded);
    };

    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        // Fetch additional professionals from the backend API and append to the state
        fetch('https://thorfinn.pythonanywhere.com/professionals/')
            .then(response => response.json())
            .then(data => {
                // Update state with fetched professionals
                setProfessionals(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);



    const defaultServiceData = [
        {
            title: 'Hair Services', content:

                <>


                    <div className='service-card-1' >
                        Haircut
                        $25
                    </div>

                    <div className='service-card-1'  >
                        Barber Cut
                        $25
                    </div>
                    <div className='service-card-1'>
                        Cut & Style
                        $20
                    </div>

                    <div className='service-card-1'>
                        Shampoo Cut & Style
                        $30
                    </div>

                    <div className='service-card-1'>
                        Express Color(Toning, Gloss, Roots)
                        $35
                    </div>
                    <div className='service-card-1'>
                        Speciality Color
                        $35
                    </div>
                    <div className='service-card-1'>
                        Lightning Services
                        $35
                    </div>
                    <div className='service-card-1'>
                        Perms
                        $35
                    </div>
                    <div className='service-card-1'>
                        Shmapoo Style
                        $20
                    </div>
                </>

        },
        {
            title: 'Hair Removal', content:
                <>
                    <div className='service-card-1'>
                        Threading
                        $25
                    </div>
                    <div className='service-card-1'>
                        Waxing
                        $35
                    </div>


                </>
        },
        {
            title: 'Spa Facial', content:
                <>
                    <div className='service-card-1'>
                        Express Facials
                        $30
                    </div>

                    <div className='service-card-1'>
                        Papaya Facials
                        $50
                    </div>

                    <div className='service-card-1'>
                        Aleo & Cucumber
                        $50
                    </div>

                    <div className='service-card-1'>
                        Eng Rose
                        $50
                    </div>

                    <div className='service-card-1'>
                        Gold Facial
                        $70
                    </div>

                    <div className='service-card-1'>
                        Diamond
                        $70
                    </div>

                    <div className='service-card-1'>
                        Specialty Facials(Shehnaaz Hussein)
                        $85
                    </div>
                </>
        },



    ];

    const [serviceData, setServiceData] = useState(defaultServiceData);

    //fetching servicedata
    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                // Fetching service titles from the first endpoint
                const serviceTitlesResponse = await fetch('https://thorfinn.pythonanywhere.com/services/');
                const serviceTitlesData = await serviceTitlesResponse.json();

                // Fetching subservices for each title
                const subservicesPromises = serviceTitlesData.map(async (service) => {
                    const subservicesResponse = await fetch(`https://thorfinn.pythonanywhere.com/subservices/?service=${service.id}`);
                    const subservicesData = await subservicesResponse.json();


                    return {
                        title: service.title,
                        content: subservicesData.map((subservice) => (
                            <div className='service-card-1' key={subservice.id}>
                                {subservice.title}
                                ${subservice.price}
                            </div>
                        )),
                    };
                });

                // Resolve all promises for subservices
                const resolvedSubservices = await Promise.all(subservicesPromises);

                // Update serviceData state with the resolved data
                setServiceData(resolvedSubservices);
            } catch (error) {
                console.error('Error fetching service data:', error);
                // Set default data or handle error state
                setServiceData([]);
            }
        };

        fetchServiceData();
    }, []);

    const items = [
        'Haircut & Style',
        'Hair Color',
        'Spa Facial',
        'Eylashes Services',
        'Hair Removal',
        'Express Treatments'
    ];
    const content = [
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Women’s Haircut <br />
                    $75 - $90</p>

                <p className='list-detail-content'>Consult with our stylists to create a look that compliments your features and accents your personal style.
                    Includes a shampoo, blowdry and style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Blowdry & Style
                    <br />
                    $55 - $60</p>

                <p className='list-detail-content'>Starting with freshly cleansed and conditioned hair, our stylists apply different
                    techniques to achieve the perfect straight, wavy or curly style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Deep Conditioner<br />
                    $65</p>

                <p className='list-detail-content'>
                    This nutrient-rich treatment saves your strands from the stressors of day-to-day life by
                    adding extra moisture for shiny, healthy hair.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Men’s Haircut <br />
                    $60 - $70</p>

                <p className='list-detail-content'>
                    Add some swagger to your step with our high-quality men's haircuts.
                    Includes head massage, shampoo, cut, style & neck clean-up.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Brazilian Blowout
                    <br />
                    Starting at $315</p>

                <p className='list-detail-content'>
                    Brazilian Blowout is by far the most-requested hair smoothing treatment as it creates a protective
                    layer around each strand of hair, effectively diminishing frizz and promoting intense shine.</p>
            </div>
        </div>,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Hair Color
                    <br />$100-$150</p>
                <p className='list-detail-content'>Our expert colorists use the latest techniques and high-quality products to create a hair color that suits your personality and style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Highlights<br />
                    Starting at $120</p>
                <p className='list-detail-content'>Add dimension and brightness to your hair with our professional highlighting services. Choose from a variety of shades and techniques.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Balayage
                    <br />Starting at $150</p>
                <p className='list-detail-content'>Get that sun-kissed, natural look with our custom balayage technique. Our colorists blend shades seamlessly for a stunning result.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Color Correction
                    <br />Price Varies</p>
                <p className='list-detail-content'>If you're unhappy with your current hair color, our color correction service can help you achieve your desired shade while maintaining hair health.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Ombre
                    <br />Starting at $130</p>
                <p className='list-detail-content'>Transform your look with the trendy ombre hair coloring technique. Our experts create a smooth transition between two shades for a striking effect.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Classic Spa Facial
                    <br />$80</p>
                <p className='list-detail-content'>Indulge in relaxation with our classic spa facial. Includes deep cleansing, exfoliation, steam, extractions, mask, and soothing massage.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Anti-Aging Facial
                    <br />$100</p>
                <p className='list-detail-content'>Revitalize your skin with our anti-aging facial. Specialized products and techniques target fine lines, wrinkles, and promote a youthful complexion.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Hydrating Facial
                    <br />$90</p>
                <p className='list-detail-content'>Restore moisture balance to your skin with our hydrating facial. Perfect for dry or dehydrated skin, leaving you with a radiant glow.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Acne Clearing Facial
                    <br />$85</p>
                <p className='list-detail-content'>Combat acne and blemishes with our acne clearing facial. Deep cleansing, exfoliation, and targeted treatments help improve skin clarity.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Sensitive Skin Facial
                    <br />$95</p>
                <p className='list-detail-content'>Gentle care for sensitive skin. Our soothing facial calms irritation and redness, providing relief and leaving your skin feeling refreshed.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Classic Eyelash Extensions
                    <br />$120</p>
                <p className='list-detail-content'>Enhance your natural beauty with our classic eyelash extensions. One extension is applied to each natural lash for a subtle yet stunning look.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Volume Eyelash Extensions
                    <br />$150</p>
                <p className='list-detail-content'>Get a more dramatic and voluminous look with our volume eyelash extensions. Multiple lightweight extensions are applied to each natural lash.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyelash Lift & Tint
                    <br />$75</p>
                <p className='list-detail-content'>Lift and curl your natural lashes while adding a tint for enhanced definition. Wake up with beautifully lifted and darkened lashes.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyelash Extension Refill
                    <br />$60</p>
                <p className='list-detail-content'>Maintain the longevity of your eyelash extensions with our refill service. Recommended every 2-3 weeks to keep your lashes looking full.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Lash Removal<br />$25</p>
                <p className='list-detail-content'>If you decide to remove your eyelash extensions, our gentle removal process ensures your natural lashes remain intact.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Waxing Services
                    <br />Price Varies</p>
                <p className='list-detail-content'>Our waxing services offer hair removal solutions for various areas including eyebrows, upper lip, chin, legs, arms, and more. Prices depend on the area.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Threading
                    <br />Price Varies</p>
                <p className='list-detail-content'>Experience the precision of threading for facial hair removal. Our technicians shape eyebrows and remove unwanted facial hair with this ancient technique.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Laser Hair
                    <br />Price Varies</p>
                <p className='list-detail-content'>Permanently reduce unwanted hair with our advanced laser hair removal technology. Sessions are tailored to your needs for optimal results.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Bikini Wax
                    <br />Starting at $45</p>
                <p className='list-detail-content'>Get beach-ready with our bikini waxing services. Choose from a standard bikini wax or more comprehensive styles like Brazilian or Hollywood wax.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Body Sugaring
                    <br />Price Varies</p>
                <p className='list-detail-content'>Try the natural alternative to waxing with our body sugaring services. Gentle on the skin and effective for hair removal on various body parts.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Express Facial
                    <br />$50</p>
                <p className='list-detail-content'>When time is limited, our express facial provides a quick and rejuvenating treatment to cleanse, exfoliate, and nourish your skin.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Mini Manicure
                    <br />$25</p>
                <p className='list-detail-content'>Give your hands some attention with our mini manicure. Includes nail shaping, cuticle care, and a polish application of your choice.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Mini Pedicure
                    <br />$30</p>
                <p className='list-detail-content'>Treat your feet with our mini pedicure. Relax in a foot soak, get nail shaping, cuticle care, and a polish application for a quick refresh.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyebrow Tinting
                    <br />$20</p>
                <p className='list-detail-content'>Enhance your brows with eyebrow tinting. Our experts apply a custom tint to match your desired shade, providing a defined look.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Lash Tinting
                    <br />$25</p>
                <p className='list-detail-content'>Darken your lashes with our lash tinting service. Achieve the appearance of mascara without the daily hassle.</p>
            </div>
        </div>

    ];


    // booking div
    const [isVisible, setIsVisible] = useState(false); // for booking div
    const [bookingHeader, setBookingHeader] = useState(""); //for heading in booking div
    const [serviceCard, setServiceCard] = useState(true);//for all the service types
    const [isAddon, SetAddon] = useState(null); //for add on cards
    const [proffVisible, setProffVisible] = useState(null); //for professional list
    const [selectedService, setSelectedService] = useState(null); // for the selected service type
    const [bookingDetail, setBookingDetail] = useState(null);
    const [orderbtn, setOrderbtn] = useState(null); //hiding and showing the choose time div
    const [isNextBtnVisible, SetNextBtnvisible] = useState(true);
    const [isLoading, setIsLoading] = useState('loading');// for loading animaiton

    const [clickedContents, setClickedContents] = useState([]); //storing the clicked content

    const [clickedServiceIndex, setClickedServiceIndex] = useState(null);

    const toggleBookingDiv = () => {


        setIsVisible(!isVisible);

        //for mobile screen
        if (!isVisible) {
            for (let i = 2; i <= 9; i++) {
                const contentElement = document.querySelector('.content-' + i);
                contentElement.classList.add('responsive-class'); // No dot here
            }

            document.querySelector('.nav-div').classList.add('responsive-class'); // No dot here
        }
        if (isVisible) {
            for (let i = 2; i <= 9; i++) {
                const contentElement = document.querySelector('.content-' + i);
                contentElement.classList.remove('responsive-class'); // No dot here
            }

            document.querySelector('.nav-div').classList.remove('responsive-class'); // No dot here
        }

        setServiceCard(true); // Reset selected card when toggling
        setProffVisible(null); // Show the .cards div

        SetIsSuccess(null);
        setIsTimeSelected(null);

        setBookingHeader("Choose a service")
    };
    const openCardDetails = (cardIndex, professional) => {
        //setServiceCard(cardIndex);
        setProffVisible(null); // Hide the .cards div
        setMinimized(true);
        setBookingDetail(true); //Booking
        setBookingHeader('Choose Time');
        setIsChooseTImeClicked(true);

        //pushing the professional name
        // if (clickedDiv) {
        //     alert(professional)
        //     const contentElement = clickedDiv.querySelector('p');
        //     if (contentElement) {
        //         const content1 = contentElement.textContent;
        //         setClickedContents(prevContents => [...prevContents, { type: 'content-1-style', value: content1, index: prevContents.filter(item => item.type === 'content-1-style').length },]);
        //     }
        // }
        const clickedDiv = document.querySelector(`.card-0:nth-child(${cardIndex + 1})`);
        const contentElement = clickedDiv.querySelector('p');

        if (contentElement && professional) {
            const professionalId = professional.id;
            const professionalName = professional.user;

            setClickedContents(prevContents => [
                ...prevContents,
                {
                    type: 'content-1-style',
                    id: professionalId,
                    value: professionalName,
                    index: prevContents.filter(item => item.type === 'content-1-style').length,
                },
            ]);
        }

    };



    //close button for closing the service list
    const closeselectedcard = () => {
        setServiceCard(null);
        setProffVisible(true); // Show the .cards div
        setMinimized(false);
    };


    //to open the list of  service cards having service name and price
    const openServiceDetails = (serviceindex) => {

        //To Show the title of the service detail 
        const title = serviceData[serviceindex].title;

        const content = (
            <div>

                <div className='card-title'>{title}</div>
            </div>
        );

        //pushing the service name title
        // if (serviceindex >= 0) {
        //     const content2 = title;
        //     setClickedContents(prevContents => [...prevContents, { type: 'content-2-style', value: content2, index: prevContents.filter(item => item.type === 'content-2-style').length },]);
        // }


        //last
        setSelectedService(serviceindex);

        // Create a new array where all states are set to false except the selected one.
        const updatedStates = serviceCardStates.map((state, index) => index === serviceindex);
        setServiceCardStates(updatedStates);


        setServiceCard(true);

    };


    const closeSelectedService = () => {
        sethighlited(null);
        //to get back
        setBookingDetail(false);//lastDD
        setSelectedService(null);

        setServiceCard(true);

    }


    //click of the service subtype (service subtype + price div)
    const openAddon = (serviceName, index, id) => {
        setBookingDetail(true);

        // setBookingDetail(true); //target
        //changes made here on 13-11-23
        setProffVisible(null);
        setSelectedService(null);
        setServiceCard(null);
        SetAddon(true);
        setBookingHeader("Choose Addons");
        // setMinimized(true);

        // const content3 = serviceName;

        if (true) {
            const subserviceId = id;
            const content3 = index;
            setClickedContents(
                prevContents => [...prevContents,
                {
                    type: 'content-3-style', value: content3, id: subserviceId, index: prevContents.filter(
                        item => item.type === 'content-3-style'
                    ).length
                },
                ]);
        }


        sethighlited(index);

        //if any div is highlited then setting the selected item list div to maximized
        if (higlited) {
            setMinimized(false);
        }

    };


    //for color toggle 
    const defaultaddonCards = [
        { name: 'Face Bleach', price: '$20' },
        { name: 'Derma Blade', price: '$30' },
        { name: 'Clay Mask', price: '$15' },
        { name: 'Extra Massage', price: '$25' },
        { name: 'Gua Sha 15 min Massage', price: '$35' },
        { name: 'Bleach Facial', price: '$40' },
    ];

    const [addonCards, setAddonCards] = useState([defaultaddonCards]);

    useEffect(() => {
        fetch('https://thorfinn.pythonanywhere.com/addons/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Assuming data is an array of objects with name and price properties
                setAddonCards(data);
            })
            .catch(error => {
                console.error('There was an error fetching data:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once

    // Rest of your component's logic



    const [selectedAddon, setSelectedAddon] = useState([]);


    const toggleSelectAddon = (addon) => {
        const existingIndex = selectedAddon.findIndex(selected => selected.title?.toLowerCase() === addon.title?.toLowerCase());

        if (existingIndex !== -1) {
            // Remove the addon if already selected
            const updatedAddons = [
                ...selectedAddon.slice(0, existingIndex),
                ...selectedAddon.slice(existingIndex + 1)
            ];
            setSelectedAddon(updatedAddons);
        } else {
            // Add the addon if not already selected
            setSelectedAddon(prev => [...prev, addon]);
        }
    };



    const handleAddonDelete = (addon) => {
        const updatedAddons = selectedAddon.filter(selected => selected.title !== addon.title);
        setSelectedAddon(updatedAddons);
    };

    const closeSelectedAddon = () => {
        //target
        //removing all subservices
        setClickedContents(prevContents => (
            prevContents.filter(item => item.type !== 'content-3-style')
        ));
        setBookingDetail(false)
        SetAddon(null);
        setSelectedService(true);
        // SetNextBtnvisible(false);

        setBookingHeader('Choose Service');
    }

    const OpenProfessional = () => {
        // document.querySelector.clicked-div-content.classlist.add('handleclickeddivcontentheightor margin after this also a fun to remove the class when going back')
        if (!proffVisible) {
            setOrderbtn(true);
            setBookingDetail(true);
            setProffVisible(true);
            setBookingHeader("Choose Proffesonals")
            SetAddon(null);
        }

        SetNextBtnvisible(null);
    }

    const closeSelecteProff = () => {
        setProffVisible(null);
        setBookingHeader('Choose Addons');
        SetNextBtnvisible(true);
        SetAddon(true);
    }

    //for showing the sliced array to it's correct title
    const [serviceCardStates, setServiceCardStates] = useState(Array(serviceData.length).fill(false));



    const [higlited, sethighlited] = useState(null);
    const [minimized, setMinimized] = useState(false);

    const [isChooseTimeClicked, setIsChooseTImeClicked] = useState(null);


    const handleChooseTimeClick = () => {

        setIsChooseTImeClicked(!isChooseTimeClicked);
        handleMinimizeOrder();

        //target
        // if (today.getDay() === 0 || today.getDay() === 1) {
        //     setShowTimeSlots2(true);
        // }
        // else { setShowTimeSlots1(true); }

        //for time conversion
        const convertTo24Hour = (time12h) => {
            const [time, modifier] = time12h.split(' ');

            let [hours, minutes] = time.split(':');

            if (hours === '12') {
                hours = '00';
            }

            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }

            return `${hours}:${minutes}`;
        }

        //For Book Now
        if (isTimeSelected && isUser) {


            //for start time
            const parsedDate = new Date(selectedDate);
            const parsedTime = new Date(`1970-01-01T${convertTo24Hour(selectedTime)}`);
            const offset = parsedTime.getTimezoneOffset();

            // Combine date and time
            parsedDate.setHours(parsedTime.getHours());
            parsedDate.setMinutes(parsedTime.getMinutes() - offset);

            // Format the combined date and time into the required format (ISO string)
            const formattedDateTime = parsedDate.toISOString();

            console.log('formated time is ', formattedDateTime);

            //for selected addon id
            const selectedAddonIds = selectedAddon.map(item => item.id);
            console.log('formated addons is ', selectedAddonIds);

            //for selected sebservice id
            const content3Elements = clickedContents.filter(item => item.type === 'content-3-style')
            const selectedSubserviceIds = content3Elements[0].id;
            console.log('formated subservice is ', selectedSubserviceIds);

            //for selected professional id
            const content1Elements = clickedContents.filter(item => item.type === 'content-1-style')
            const selectedProfessionalIds = content1Elements.map(item => item.id);
            const selectedProffID = selectedProfessionalIds[0];
            console.log('formated professional is ', selectedProffID);

            clickedContents.forEach((item, index) => {
                if (index === 0) return;

                const variableName = `item${index}`;
                window[variableName] = item;
            });

            // Create object with professional and items
            console.log("final clicked contents: ", clickedContents);
            console.log('final addons: ', selectedAddon);
            console.log('final time: ', selectedDate + " " + selectedTime);


            const data = {
                "addons": selectedAddonIds,
                "slot": {
                    "start_time": formattedDateTime,
                    "professional": selectedProffID
                },
                "user": 1,
                "subservice": selectedSubserviceIds,
                "professional": selectedProffID
            }


            const jsonBody = JSON.stringify(data);


            console.log('header token is : ', getCookie('token'));
            fetch('https://thorfinn.pythonanywhere.com/book/', {
                headers: {
                    'Authorization': `Token ${getCookie('token')}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: jsonBody
            })
                .then(response => {
                    if (response.status === 401) {
                        throw new Error('Auth failed: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            SetIsSuccess(true);

            setTimeout(() => {
                toggleBookingDiv();

                // Reload the page after 3 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }, 3000); // 3000 milliseconds = 3 seconds
        }


        //toggleBookingDiv();


    }
    //to toggle the order list div up and down 
    const handleMinimizeOrder = () => {
        setMinimized(!minimized);
    }


    const closeChooseTime = () => {
        setIsChooseTImeClicked(null);
        //marked
        setMinimized(false);

        setProffVisible(true);
        setBookingHeader('Choose Professional');

        console.log(clickedContents);
        // Filter out elements with type 'content-1-style' (which is professionals)
        const filteredContents = clickedContents.filter(item => item.type !== 'content-1-style');

        // Set the state with the new array
        setClickedContents(filteredContents);
    }


    // Function to calculate total price from clickedContents and selectedAddon
    const calculateTotalPrice = () => {
        const clickedContentsTotal = clickedContents.reduce((accumulator, content) => {
            if (content.type === "content-3-style" && Array.isArray(content.value) && content.value.length >= 3) {
                const itemPrice = parseFloat(content.value[2]); // Assuming price is at index 2
                return accumulator + itemPrice;
            }
            return accumulator;
        }, 0);

        const addonTotal = selectedAddon.reduce((accumulator, addon) => {
            const addonPrice = parseFloat(addon.price); // Assuming price starts with '$'
            return accumulator + addonPrice;
        }, 0);

        return clickedContentsTotal + addonTotal;
    };

    // Use this function to get the total price
    const totalPrice = calculateTotalPrice();

    // Render the total price
    const total = (
        <div className="total-price">
            Total Price: ${totalPrice.toFixed(2)}
        </div>
    );

    //Storing the selected Time
    const [isTimeSelected, setIsTimeSelected] = useState(null);
    const [isSuccess, SetIsSuccess] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // calander
    const [date, setDate] = useState(new Date()); // Initialize with today's date
    const [showTimeSlots1, setShowTimeSlots1] = useState(null);
    const [showTimeSlots2, setShowTimeSlots2] = useState(null);
    const [slotsData, setSlotsData] = useState(null);
    const today = new Date();
    const [timesForToday, setTimesForToday] = useState([]);

    useEffect(() => {
        // This function will run whenever timesForToday changes
        // You can perform any side effects here that rely on timesForToday's updated value
        console.log('timesForToday has changed:', timesForToday);
        addHighlightClass();


    }, [timesForToday]);

    const addHighlightClass = () => {
        const elements = document.querySelectorAll('.time-slot-card');
        elements.forEach((element) => {
            const time24 = element.getAttribute('data-time24');
            if (timesForToday.includes(time24)) {
                element.classList.add('highlighted-time-slot');
                // const clonedElement = element.cloneNode(true);
                // element.parentNode.replaceChild(clonedElement, element);
            } else {
                element.classList.remove('highlighted-time-slot');
                element.disabled = false;

            }
        });
    };

    const handleDateChange = (newDate) => {
        setIsLoading(true); // Set isLoading to true when fetching starts

        setDate(newDate);
        //console.log(clickedContents);
        const selectedProfessional = clickedContents[1];

        if (selectedProfessional) {
            const professionalId = selectedProfessional.id; // Assuming the professional ID is available in selectedProfessional

            // Make a request to fetch slots for the selected professional and date
            fetch(`https://thorfinn.pythonanywhere.com/slots/?professional=${professionalId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();

                })
                .then(slotsData => {
                    // Handle slots data here, for example, update state or perform any necessary operations
                    // console.log('Slots Data:', slotsData);
                    // Set the received slots data to a state variable, if needed
                    setSlotsData(slotsData);
                    //for checking time slot
                    const today = new Date(newDate); // Create a new Date object based on the selected date
                    today.setDate(today.getDate() + 1); // Add one day to the selected date

                    const todayDate = today.toISOString().split('T')[0];

                    //Filter slots for today
                    const slotsForToday = slotsData.filter(slot => {
                        const slotDate = new Date(slot.start_time).toISOString().split('T')[0];
                        return slotDate === todayDate;
                    });

                    // If today's slots are found, log the times
                    if (slotsForToday.length > 0) {
                        const timesForToday = slotsForToday.map(slot => {
                            return slot.start_time.split('T')[1].slice(0, 5); // Extracting HH:MM from start_time
                        });
                        setTimesForToday(timesForToday);
                        console.log('Slots for today:', timesForToday);

                    } else {
                        console.log('No slots available for today.');
                        // Check if timesForToday doesn't include any time24 value
                        if (true) {
                            // Function to remove highlighted class from elements
                            document.querySelectorAll('.time-slot-card').forEach((element) => {
                                element.classList.remove('highlighted-time-slot');
                            });
                        }
                    }
                    setIsLoading(false); // Set isLoading to false after fetch is completed


                })
                .catch(error => {
                    setIsLoading(false); // Set isLoading to false after fetch is completed

                    // Handle fetch errors here
                    console.error('Error fetching slots:', error);
                });


        }
        // Get today's date in YYYY-MM-DD format


        // toggleCalendar();
        today.setDate(today.getDate() - 1)

        if (newDate >= today) {
            if (newDate.getDay() === 0 || newDate.getDay() === 1) {
                setShowTimeSlots1(null);
                setShowTimeSlots2(true);
            }
            else {
                setShowTimeSlots1(true);
                setShowTimeSlots2(null);
            }

            // alert(today);
        } else {
            setShowTimeSlots1(null);
            setShowTimeSlots2(null);
            alert('Choose a valid date');
        }
    };

    const [calendarVisible, setCalendarVisible] = useState(true);


    // ... (array push button)
    const [isPushButtonVisible, setPushButtonVisible] = useState(false);
    //setPushButtonVisible(true);
    const handlePushButtonClick = () => {
        setPushButtonVisible(false);
        setMinimized(true);

        //storing the time
        const selectedDateElement = document.querySelector('.selected-date');
        if (selectedDateElement) {
            setSelectedDate(selectedDateElement.innerText);
        }

        //Displaying the Selected Time
        setIsTimeSelected(true);
    }
    const handleSelectedTimeClick = (timeSlot) => {
        setPushButtonVisible(true);
        //storing the time
        setSelectedTime(timeSlot.time);

        console.log('tjos', timeSlot)

    }


    //add more button
    const addMoreItems = () => {
        // closeSelectedService();
        setBookingDetail(false);//last
        setSelectedService(null);
        sethighlited(null);
    }

    //time slots
    const timeSlots1 = [
        { icon: <BsSunrise />, time24: '10:00', time: '10:00 AM' },
        { icon: <BsSunrise />, time24: '11:00', time: '11:00 AM' },
        { icon: <BsSun />, time24: '12:00', time: '12:00 PM' },
        { icon: <BsSun />, time24: '13:00', time: '01:00 PM' },
        { icon: <BsSun />, time24: '14:00', time: '02:00 PM' },
        { icon: <BsSun />, time24: '15:00', time: '03:00 PM' },
        { icon: <BsSun />, time24: '16:00', time: '04:00 PM' },
        { icon: <BsSunset />, time24: '17:00', time: '05:00 PM' },
        { icon: <BsSunset />, time24: '18:00', time: '06:00 PM' },
        { icon: <BsSunset />, time24: '19:00', time: '07:00 PM' },
    ];
    const timeSlots2 = [
        { icon: <BsSunrise />, time24: '10:00', time: '10:00 AM' },
        { icon: <BsSunrise />, time24: '11:00', time: '11:00 AM' },
        { icon: <BsSun />, time24: '12:00', time: '12:00 PM' },
        { icon: <BsSun />, time24: '13:00', time: '01:00 PM' },
        { icon: <BsSun />, time24: '14:00', time: '02:00 PM' },
        { icon: <BsSun />, time24: '15:00', time: '03:00 PM' },
        { icon: <BsSun />, time24: '16:00', time: '04:00 PM' },
        { icon: <BsSunset />, time24: '17:00', time: '05:00 PM' },
        { icon: <BsSunset />, time24: '18:00', time: '06:00 PM' },
    ];



    //For Content 2

    const animatedCards = document.querySelectorAll('.card-left, .card-right');

    animatedCards.forEach((card, index) => {
        let animated = false;

        // Define different scroll thresholds for desktop and mobile
        const thresholds = window.innerWidth < 768 ? [200, 350, 650, 950, 1450, 1800] : [300, 600, 1100, 1400, 1900, 2300];

        window.addEventListener('scroll', () => {
            const threshold = thresholds[index];

            if (!animated && window.scrollY > threshold) {
                animated = true;
                card.classList.add('animate');
            }
        });
    });


    //for content 3

    const [isContent3Animated, setIsContent3Animated] = useState(false);
    const myDivRef = useRef(null);

    useEffect(() => {
        if (isContent3Animated) {
        }
    }, [isContent3Animated]);

    useEffect(() => {
        if (!myDivRef.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent3Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDivRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);




    // For Content 4

    //carusel
    const ProffesonalsData = [
        <div className="gallery-item" data-value="1"><img src={image1} alt="gallery-image" /></div>,
        <div className="gallery-item" data-value="2"><img src={image2} alt="gallery-image" /> </div>,
        <div className="gallery-item" data-value="3"><img src={image3} alt="gallery-image" /> </div>,

    ];




    //For content 5

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleList = () => {
        setIsExpanded(!isExpanded);
    };

    //for content 7
    const galleryItems = [
        <div className="gallery-item" data-value="1"><img src={gallery1} alt="gallery-image" /></div>,
        <div className="gallery-item" data-value="2"><img src={gallery2} alt="gallery-image" /> </div>,
        <div className="gallery-item" data-value="3"><img src={gallery3} alt="gallery-image" /> </div>,
        <div className="gallery-item" data-value="4"><img src={gallery4} alt="gallery-image" /></div>,
        <div className="gallery-item" data-value="5"><img src={gallery5} alt="gallery-image" /> </div>,
        <div className="gallery-item" data-value="2"><img src={gallery6} alt="gallery-image" /> </div>,
        <div className="gallery-item" data-value="3"><img src={gallery7} alt="gallery-image" /> </div>,
        <div className="gallery-item" data-value="4"><img src={gallery8} alt="gallery-image" /></div>,
        <div className="gallery-item" data-value="5"><img src={gallery9} alt="gallery-image" /> </div>,
        <div className="gallery-item" data-value="5"><img src={gallery10} alt="gallery-image" /> </div>,

    ];


    const [isContent7Animated, setIsContent7Animated] = useState(false);
    const myDiv7Ref = useRef(null);

    useEffect(() => {
        if (isContent7Animated) {
        }
    }, [isContent7Animated]);

    useEffect(() => {
        if (!myDiv7Ref.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent7Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDiv7Ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    //for content 8

    const [isContent8Animated, setIsContent8Animated] = useState(false);
    const myDiv8Ref = useRef(null);

    useEffect(() => {
        if (isContent8Animated) {
        }
    }, [isContent8Animated]);

    useEffect(() => {
        if (!myDiv8Ref.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent8Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDiv8Ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);


    return (
        <div className='home-page'>

            <div className='content-1' id="content1" >
                <div className='tagline'><p>We provde you the best experience which your hair <span>loves</span></p>

                    <div className='container'>

                        <div className='book-btn' onClick={toggleBookingDiv} id='content4'>
                            Book Now
                        </div>


                        {isVisible && (
                            <div id='parent-div' className={`animated-div  scrollbar ${isVisible ? 'slide-in' : 'slide-out'} ${minimized ? 'animated-div-overflow-hidden' : ''}`}                            >
                                {/* booking header div */}
                                <div className='header-container'>
                                    <div className='book-header'>
                                        <h3>{bookingHeader}</h3>
                                        {/* <h3>{serviceCard !== null ? 'Choose a service' : 'Choose add-on service'}</h3> */}
                                        {/* <h2>
                                            {serviceCard !== null
                                                ? 'Choose a service'
                                                : showTimeSelection !== null
                                                    ? 'Choose Time'
                                                    : 'Choose a professional'}
                                        </h2> */}
                                        <button className='close-btn' onClick={toggleBookingDiv}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>
                                    </div>
                                </div>

                                {/* this div has the list of all the professionals */}
                                <div className={`cards ${proffVisible ? '' : 'hidden'}`}>

                                    <div style={{ display: 'block', width: '100%' }}>
                                        <button className='close-btn' onClick={closeSelecteProff} >
                                            <AiOutlineClose className='close-icon' />
                                        </button>
                                    </div>
                                    {/* 
                                    {professionals.map((professional, index) => (
                                        <div
                                            className={`card-0 ${serviceCard === index ? 'card-expanded' : ''}`}
                                            key={index}
                                            onClick={() => openCardDetails(index + 1)}
                                        >
                                            <img className='card-0-proff' src={professional.image} alt={`Image for ${professional.name}`} />
                                            <p>{professional.name}</p>
                                        </div>
                                    ))} */}

                                    {professionals.map((professional, index) => (
                                        <div
                                            className={`card-0 ${serviceCard === index ? 'card-expanded' : ''}`}
                                            key={professional.id} // Use the professional's ID as the key
                                            onClick={() => openCardDetails(index + 1, professional)}
                                        >
                                            <img className='card-0-proff' src={professional.image_url} alt={`Image for ${professional.id}`} />
                                            <p>{professional.user + " " + professional.id}</p>
                                        </div>
                                    ))}

                                </div>

                                {/* this div has all the service types listed*/}
                                {serviceCard !== null && (
                                    <div className='expanded-card-1 scrollbar '>
                                        {/* <button className='close-btn ' onClick={closeselectedcard}>
                                            <AiOutlineClose className='close-icon' />
                                        </button> */}
                                        <div className='service-cards menu-1'>
                                            {serviceData.map((service, serviceindex) => (
                                                <div
                                                    key={serviceindex}
                                                    className={` ${selectedService === serviceindex ? 'selected' : ''
                                                        } ${clickedServiceIndex === serviceindex ? 'clicked' : ''}`}
                                                    onClick={() => openServiceDetails(serviceindex)}
                                                >
                                                    <div className='service-card-name'>
                                                        <div className='service-card-name-icon'>
                                                            <div>{serviceindex === 0 ? <GiHairStrands /> : (serviceindex === 1 ? <GiRazor />
                                                                : <GiCharcuterie />
                                                            )} </div>
                                                            <p>{service.title} </p>
                                                        </div>

                                                        <div><IoIosArrowForward />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* this div has all the types of services  prices */}
                                {selectedService !== null && (
                                    <div className='expanded-card scrollbar'>
                                        <button className='close-btn' onClick={closeSelectedService}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>
                                        {/* <h1 style={{ color: "red" }}>{serviceData[selectedService].title}</h1> */}
                                        <div className='' style={{ color: 'black' }} >

                                            {serviceData.map((service, index) => (
                                                serviceCardStates[index] && (

                                                    <div key={index} style={{ color: 'black' }} className="service-cards" >
                                                        <h3 style={{ color: 'black' }}>{service.title}</h3>

                                                        {service.content && service.content.length > 0 ? (
                                                            service.content.map((item, i) => (

                                                                <div key={i} onClick={() => openAddon(index, item.props.children, item.key)} className={`service-card-1 ${higlited === i ? 'selected' : ''}`}>

                                                                    <span className="service-name">{item.props.children[0]}</span>
                                                                    <span className="service-price">${item.props.children[2]}</span>
                                                                    {/* {item} */}
                                                                    {/* {console.log(item.props.children)} */}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No content available</p>
                                                        )}
                                                    </div>
                                                )
                                            ))}




                                        </div>
                                    </div>

                                )}



                                {/* This div has all the add-on service cards  */}
                                {
                                    isAddon !== null && (
                                        <div className='Add-on-div scrollbar'>

                                            <div style={{ display: 'block', width: '100%' }}>
                                                <button className='close-btn' onClick={closeSelectedAddon} >
                                                    <AiOutlineClose className='close-icon' />
                                                </button>
                                            </div>

                                            {/* 
                                            {addonCards.map(addon => (
                                                <div
                                                    className="service-card-1 addons"
                                                    onClick={() => toggleSelectAddon(addon.title, addon.price)}
                                                    style={{ background: selectedAddon.some(selected => selected.title.toLowerCase() === addon.title.toLowerCase()) ? 'rgb(224, 224, 224)' : '' }}
                                                    key={addon.title}
                                                >
                                                    <span className='service-name'>{addon.title}</span>
                                                    <span className='service-price'>{addon.price}</span>
                                                </div>
                                            ))} */}
                                            {addonCards.map(addon => (
                                                <div
                                                    className="service-card-1 addons"
                                                    onClick={() => toggleSelectAddon(addon)}
                                                    style={{
                                                        background: selectedAddon.some(selected =>
                                                            selected.title?.toLowerCase() === addon.title?.toLowerCase()
                                                        )
                                                            ? 'rgb(224, 224, 224)'
                                                            : ''
                                                    }}
                                                    key={addon.title}
                                                >
                                                    <span className='service-name'>{addon.title || 'Title not available'}</span>
                                                    <span className='service-price'>${addon.price || 'Price not available'}</span>
                                                </div>
                                            ))}




                                            <div onClick={OpenProfessional}></div>
                                        </div>


                                    )
                                }

                                {/* To open the div Having calendar and time slots */}
                                {isChooseTimeClicked !== null && (
                                    <div className='expanded-card scrollbar choose-time-div' >
                                        <button className='close-btn' onClick={closeChooseTime}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>

                                        {calendarVisible !== null && (
                                            <div className='date-picker'>
                                                <Calendar
                                                    onChange={handleDateChange}
                                                    value={date}
                                                />
                                            </div>
                                        )}

                                        {showTimeSlots1 !== null && (
                                            <div >

                                                {/* This div will be shown for today or future dates */}
                                                <div className='Time-slots-header'>
                                                    <div className='Time-slots-header-text'><p>All Available Times</p></div>
                                                    <div className='selected-date'>{date.toDateString()}</div>
                                                </div>
                                                <div className='Time-slots'>
                                                    {/* {timeSlots1.map((timeSlot, index) => (
                                                        <div

                                                            className={`time-slot-card `}
                                                            key={index}
                                                            data-time24={timeSlot.time24}

                                                            onClick={() => handleSelectedTimeClick(timeSlot)}
                                                        >

                                                            {timeSlot.icon} {timeSlot.time}
                                                        </div>
                                                    ))} */}
                                                    {isLoading ? (
                                                        <div className='loading-animation'></div>
                                                    ) : (
                                                        timeSlots1.map((timeSlot, index) => (
                                                            <div
                                                                className='time-slot-card'
                                                                key={index}
                                                                data-time24={timeSlot.time24}
                                                                onClick={() => handleSelectedTimeClick(timeSlot)}
                                                            >
                                                                {timeSlot.icon} {timeSlot.time}
                                                            </div>
                                                        ))
                                                    )}
                                                </div>

                                            </div>
                                        )}
                                        {showTimeSlots2 !== null && (

                                            <div >

                                                {/* This div will be shown for today or future dates */}
                                                <div className='Time-slots-header'>
                                                    <div className='Time-slots-header-text'><p>All Available Times</p></div>
                                                    <div className='selected-date'>{date.toDateString()}</div>
                                                </div>
                                                <div className='Time-slots'>
                                                    <div className='Time-slots'>
                                                        {isLoading ? (
                                                            <div className='loading-animation'></div>
                                                        ) : (
                                                            timeSlots2.map((timeSlot, index) => (
                                                                <div
                                                                    className={`time-slot-card`}
                                                                    key={index}
                                                                    data-time24={timeSlot.time24}

                                                                    onClick={() => handleSelectedTimeClick(timeSlot)}
                                                                >
                                                                    {timeSlot.icon} {timeSlot.time}
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )}

                                {/* Pushing items to cart */}
                                {isPushButtonVisible && (
                                    <button className='CartPush' id="myButton" onClick={handlePushButtonClick}>
                                        <TiTick className='tick' />
                                    </button>
                                )}

                                <div className={`clicked-div-content ${bookingDetail ? (minimized ? 'clicked-div-content-active' : '') : 'hidden'}`}>
                                    <div className='clicked-div-content-header'>
                                        <h2>Your Order </h2>

                                        {isNextBtnVisible != null && (<div onClick={OpenProfessional} className='button-48 btn-modified'><span className='text'>Next</span></div>)}

                                        <button onClick={handleMinimizeOrder} className='button-28'>
                                            {minimized ? <MdExpandMore /> : <MdExpandLess />}
                                        </button>


                                    </div>

                                    <ul className='array-info'>
                                        <div>
                                            {/* Render the contents of clickedContents */}

                                            {clickedContents.map((content, index) => {
                                                //delete function
                                                const handleDelete = () => {
                                                    // Implement logic to remove the clicked item
                                                    const updatedContents = clickedContents.filter((_, i) => i !== index);
                                                    setClickedContents(updatedContents);
                                                };
                                                if (content.type === "content-3-style") {
                                                    return (

                                                        <div key={index} className={content.type} >

                                                            <span className='content-3-style'>{content.value[0]}</span>
                                                            <span className="pricing">${content.value[2]}</span>
                                                            {/* <p>{content.id for id of subbservice}</p> */}
                                                            {/* <button onClick={handleDelete} className='order-div-button'>Delete</button> */}

                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <li key={index} className={`content.type proffname`}>
                                                            By: {content.value}
                                                            {/* content.id for proff id */}
                                                        </li>
                                                    )

                                                }
                                            })}

                                            <h2>Addons</h2>

                                            {selectedAddon.map((addon, index) => (
                                                <div key={index} className=" content-3-style">
                                                    {/* addon.id for id */}
                                                    <span className='content-3-style'>{addon.title}</span>
                                                    <span className='pricing'>${addon.price}</span>
                                                    <button onClick={() => handleAddonDelete(addon)} className='order-div-button'>Delete</button>
                                                </div>
                                            ))}


                                            {isTimeSelected != null && (
                                                <div className='selected-date-time content-3-style'>
                                                    {selectedDate + ' '}
                                                    {'at ' + selectedTime}
                                                </div>)
                                            }


                                            <div className='total-price'>
                                                {total}
                                            </div>



                                        </div>

                                    </ul>
                                    {/* 
                                    {isTimeSelected == null && (
                                        <div className='add-more-div' onClick={addMoreItems}>Add More</div>)
                                    } */}
                                    {/*                                     
                                    {orderbtn !== null && (

                                        <div className="button-48"  onClick={handleChooseTimeClick}>

                                            {!isTimeSelected ? (
                                                'Choose a time' ) : !isUser ? (
                                                <button  onClick={  handleLoginClick} style={{ padding: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                                    Login
                                                </button>
                                            ) : (
                                                <div>Book Now</div>
                                            )}

                                        </div>
                                    )}  */}

                                    {/* {orderbtn !== null && (
                                        <div className=''>
                                            {!isTimeSelected ? <button className='bug-btn' onClick={handleChooseTimeClick}>Choose Time</button> : !isUser ? <button className='bug-btn' onClick={handleLoginClick}>Login</button> : <button className='bug-btn' onClick={handleChooseTimeClick}>Book Now</button>}
                                        </div>
                                    )} */}

                                    {orderbtn !== null && (
                                        <div className='bug-btn'>
                                            {!isTimeSelected ? <button className="button-48" onClick={handleChooseTimeClick} role="button"><span className="text">Choose Time</span></button> : !isUser ? <button className="button-48" onClick={handleLoginClick} role="button"><span className="text">Login </span></button> : <button className="button-48" onClick={handleChooseTimeClick} role="button"><span className="text">Book Now</span></button>}
                                        </div>
                                    )}




                                    {orderbtn == null && (
                                        <button className='button-48' onClick={OpenProfessional}><span className='text'>Choose Professional</span></button>
                                    )}





                                </div>


                                {isSuccess && (
                                    <div class="success-animation">
                                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                        </svg>

                                        <p>Success</p>
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='content-2' id='content2'>

                <h1>SERVICES WE OFFER</h1>
                <div className='cards'>
                    <div className='card-1 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h4>Hair Services</h4>
                            <p><strong>Step into our salon, where our highly skilled team of hair care experts</strong> elevates the art of hairstyling to new heights. With a collective passion for innovation and a commitment to excellence.</p>

                            <p>Through years of honing their craft, our experts have mastered the intricate details of hairstyling. Their keen eye for trends and unwavering dedication to continual learning ensure that you receive not just a service, but a personalized journey towards your perfect look.</p>

                            <p>From the moment you sit in our chairs, expect more than a simple haircut or color treatment. Our professionals engage in thoughtful consultations, taking the time to understand your preferences, lifestyle, and personality. This thorough understanding enables them to tailor their expertise to your unique needs.</p>

                            <p>Our comprehensive range of services encompasses:</p>

                        </div>
                    </div>
                    <div className='card-2 card-right'>
                        <div className='card-info-right'>
                            <h4>Spa Facials</h4>
                            <p>
                                <strong>Indulge in our rejuvenating spa facials, where tranquility meets skincare perfection.</strong>
                                Our expert estheticians bring together a harmonious blend of luxurious treatments and cutting-edge techniques.
                            </p>

                            <p>
                                Relax as our professionals meticulously analyze your skin, customizing each facial to address your unique needs. With an array of specialized products and personalized approaches, we ensure an experience that's not just skin deep but also soul-soothing.
                            </p>

                            <p>
                                Our spa facials transcend the ordinary by incorporating therapeutic practices and tailored solutions. Whether it's hydration, anti-aging, or rejuvenation, our treatments are designed to restore your skin's natural radiance and vitality.
                            </p>

                            <p>
                                At our spa, you'll encounter an oasis of tranquility where every facial is a fusion of luxury and transformation, leaving you with a renewed sense of well-being.
                            </p>                        </div>
                        <div className='card-img'></div>
                    </div>
                    <div className='card-3 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h4>Hair Removal</h4>
                            <p>
                                <strong>Experience the epitome of smoothness and confidence with our hair removal services.</strong>
                                Our proficient technicians employ advanced techniques and top-quality products to ensure a hair-free experience .
                            </p>

                            <p>
                                Whether it's waxing, threading, or laser treatments, our specialists prioritize precision and care, delivering exceptional results tailored to your preferences.
                            </p>

                            <p>
                                At our salon, we prioritize your comfort and satisfaction. We provide a serene and hygienic environment for your hair removal sessions, ensuring a stress-free and relaxing experience.
                            </p>

                            <p>
                                Step into our sanctuary of beauty and bid farewell to unwanted hair. Our commitment to excellence ensures that each hair removal session is not just a treatment but a step towards your self-assured glow.
                            </p>
                        </div>
                    </div>

                </div>

            </div>



            <div className="content-7" id='content7' ref={myDiv7Ref}>

                <h1>Check Our Gallery</h1>

                <CustomCarousel items={galleryItems} className="content-7-carousel" />

            </div>

            <div className="content-3" id="content3" ref={myDivRef}>
                <div className={`content-3-img ${isContent3Animated ? 'slideInLeft' : ''}`}></div>
                <div className={`content-3-info ${isContent3Animated ? 'slideInRight' : ''}`}>
                    <h1>ABOUT US</h1>
                    <p>
                        Come relax and rejuvenate with the variety of luxurious salon and spa services <br />
                        offered by Intermezzo Salon & Spa, nestled on the top of Queen Anne Hill. <br />
                        Our staff of highly trained professionals is committed <br />
                        to bringing you the highest quality service and products.
                    </p>
                </div>
            </div>

            <div className="content-4">
                <h1>Our Talanted Staff</h1>

                <ProfessionalCarousel items={ProffesonalsData} className="content-7-carousel" />

            </div>




            <div className="content-5" id='content5'>
                <h1>Our Prices</h1>

                <div className='list-details'>

                    <div>
                        <ul className='list-title'>
                            {items.map((item, index) => (
                                <li key={index} onClick={() => handleItemClick(index)}
                                    className={selectedItem === index ? 'selected' : ''}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>


                        <div className="list-group">
                            <div className="list-group-item" onClick={toggleList}>
                                Service List <p style={{ visibility: 'hidden', display: 'inline' }}>lal</p> <BsChevronBarExpand />
                            </div>
                            <ul className={`list-group-content ${isExpanded ? 'expanded' : 'not-expanded'}`}>
                                {items.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleItemClick(index)}
                                        className={selectedItem === index ? 'selected' : ''}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            {selectedItem !== null && <div>{content[selectedItem]}</div>}
                        </div>
                    </div>

                </div>

                <button className='book-slot-btn' onClick={toggleBookingDiv}><p>Book Your Slot</p></button>
            </div>

            <div className="content-6">
                <h1>TESTIMONIALS</h1>

                <AliceCarousel className='content-6-box' >
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                            Brazilian Blowout is by far the most-requested hair
                            smoothing treatment <br /> as it creates a protective layer
                            around each strand of hair, effectively <br /> diminishing frizz
                            and promoting intense shine. This nutrient-rich <br />
                            treatment saves your strands from the stressors of day-to-day <br />
                            life by adding extra moisture for shiny, healthy <br />
                            hair. <br />

                        </p>
                        <img className='content-6-img img1' />
                        <p>~Cherry</p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                            Keratin treatment is widely known as a highly sought-after hair <br />
                            care solution that forms a shielding barrier around each hair <br />
                            strand, effectively reducing frizz and enhancing brilliant gloss. <br />
                            This nourishing therapy revitalizes your locks from everyday <br />
                            challenges, replenishing added hydration for lustrous, vibrant <br />
                            hair. <br />

                        </p>
                        <img className='content-6-img img2' />
                        <p>~Aqua</p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                            The trendsetting Silk Press has become the ultimate choice for <br />
                            achieving sleek hair, crafting a safeguarding coat around every <br />
                            single strand. This enriching procedure combats frizz and fosters <br />
                            a radiant sheen. This enriching treatment rejuvenates your hair <br />
                            against everyday pressures, infusing additional moisture for <br />
                            luminous, robust hair. <br />

                        </p>
                        <img className='content-6-img img3' />
                        <p>~Luna</p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                            Glossy hair, sought-after by many, the Japanese Straightening <br />
                            technique is renowned for enveloping each strand with a <br />
                            protective shield, effectively eliminating frizz and enhancing <br />
                            luminous brilliance. This nutrient-packed treatment shields your <br />
                            strands from daily life challenges, providing extra hydration <br />
                            for glossy, resilient hair. <br />

                        </p>
                        <img className='content-6-img img4' />
                        <p>~Jade</p>
                    </div>
                </AliceCarousel>
            </div>


            <div className="content-8" ref={myDiv8Ref}>
                <h1>Our Partnership</h1>
                <div className='content-8-body'>
                    <div className={`content-8-info ${isContent8Animated ? 'slideInInfo' : ''}`}>
                        <h2>WE WORK WITH THE <br /> BEST PARTNERS</h2>
                        <p>Experience beauty like never before with our salon's exclusive partnerships. Our commitment to excellence is fueled by collaborations with the industry's finest. Discover the best in beauty with our trusted partners.</p>
                        <button>READ MORE</button>
                    </div>
                    <div className={`content-8-images ${isContent8Animated ? 'slideInImages' : ''}`} >
                        <div className='content-8-images-img1'></div>
                        <div className='content-8-images-img2'></div>
                        <div className='content-8-images-img3'></div>
                        <div className='content-8-images-img4'></div>
                    </div>

                </div>
            </div>

            <div className="content-9">
                <div>
                    <h2>About our store</h2>
                    <p>
                        Nestled on the top of Queen Anne <br />
                        Hill, Intermezzo Salon & Spa has been <br />
                        Seattle’s premiere boutique salon for for  <br />
                        over 20 years. Our staff of highly-trained <br />
                        professionals is committed to bringing <br />
                        best-in-class service and products <br />
                        designed to make you feel and look <br />
                        your best.</p>
                </div>
                <div>

                    <h2>Contact Details</h2>
                    <div>
                        <p> <ImLocation /> 407 W. Galer Street </p>
                        <p> <IoCallOutline />  206 281 XXXX</p>
                        <p> <PiPaperPlaneTiltLight /> info@thehaircompany.com</p>
                    </div>
                    <div>
                        <h2>Follow Us</h2>
                        <ul>
                            <li> <AiOutlineInstagram className='icons' /> </li>
                            <li><AiOutlineWhatsApp className='icons' /></li>
                            <li><AiOutlineFacebook className='icons' /></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2>Opening Time</h2>
                    <div className='lines'>
                        <table></table>
                        <table></table>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className='th' colSpan={2}>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Monday</td>
                                <td><p>10:00 -- 5:00</p></td>
                            </tr>
                            <tr>
                                <td>Tuesday</td>
                                <td>10:00 -- 7:00</td>
                            </tr>
                            <tr>
                                <td>Webnesday</td>
                                <td>10:00 -- 7:00</td>
                            </tr>
                            <tr>
                                <td>Thursday</td>
                                <td>10:00 -- 7:00</td>
                            </tr>
                            <tr>
                                <td>Friday</td>
                                <td>10:00 -- 7:00</td>
                            </tr>
                            <tr>
                                <td>Saturday</td>
                                <td>10:00 -- 7:00</td>
                            </tr>
                            <tr>
                                <td>Sunnday</td>
                                <td>10:00 -- 5:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};


export default HomePage;
