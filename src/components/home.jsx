import React, { Component, useState, useRef, useEffect } from 'react';
import './style.css'
import Navbar from './navbar';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineFacebook, AiOutlineClose, AiOutlineDownCircle } from 'react-icons/ai';
import { FaRandom } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { PiPaperPlaneTiltLight } from 'react-icons/pi';
import { IoCallOutline } from 'react-icons/io5';
import { IoIosArrowForward } from "react-icons/io";
import { BsSunrise, BsSun, BsSunset, BsChevronBarExpand } from 'react-icons/bs';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import image1 from './Resources/proffessionals/proff2-1.jpg';
import image2 from './Resources/proffessionals/proff2-2.jpg';
import image3 from './Resources/proffessionals/proff2-3.jpg';
//import image1 from './Resources/gallery/content2-1.jpg';
//import image2 from './Resources/gallery/content2-2.jpg';
//import image3 from './Resources/gallery/content2-3.jpg';
import image4 from './Resources/proffessionals/proff4.jpg';
import image5 from './Resources/proffessionals/proff5.jpg';
import image6 from './Resources/proffessionals/proff6.jpg';
import image7 from './Resources/proffessionals/proff7.jpg';
import image8 from './Resources/proffessionals/proff8.jpg';
import image9 from './Resources/proffessionals/proff9.jpg';
import image10 from './Resources/proffessionals/proff10.jpg';
import image11 from './Resources/proffessionals/Yvonne-Brown-Colorist.jpg';
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
import partner1 from './Resources/svg-images/partner1.jpeg';
import partner2 from './Resources/svg-images/partner2.avif';
import partner3 from './Resources/svg-images/partner3.avif';
import partner4 from './Resources/svg-images/partner4.avif';
import axios from 'axios';
import CustomCarousel from './content7'
import { GiHairStrands, GiRazor, GiCharcuterie } from "react-icons/gi";




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
        axios.post('https://thorfinn.pythonanywhere.com/api/v1/generate/', postData)
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

        axios.post('https://thorfinn.pythonanywhere.com/api/v1/verify/', verifyData)
            .then((response) => {
                // Assuming the token is in response.data.token, you can set it in state or use it as needed.
                if (response.data.token != null) {
                    setToken(true);
                    setTokenKey(response.data.token);
                    console.log("just set the token to true ");
                }

                console.log("the token is " + response.data.token);


            })
            .catch((error) => {
                setToken(false);
                console.log("just set the token to false");
                console.error('Verify request error:', error);
            });
    }

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

    const handleLoginClick = (OTP) => {
        alert("it must open!!...")
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
        // Initialize with default professionals
        const defaultProfessionals = [
            { name: 'Professional 1', image: image1 },
            { name: 'Professional 2', image: image2 },
            { name: 'Professional 3', image: image3 },
            { name: 'Professional 4', image: image4 },
            { name: 'Professional 5', image: image5 },
            { name: 'Professional 6', image: image6 },
            { name: 'Professional 7', image: image7 },
        ];

        setProfessionals(defaultProfessionals);

        // // Fetch additional professionals from the backend API and append to the state
        // fetch('/api/professionals')
        //     .then(response => response.json())
        //     .then(data => {
        //         // Append the fetched professionals to the existing state
        //         setProfessionals(prevProfessionals => [...prevProfessionals, ...data]);
        //     })
        //     .catch(error => console.error('Error fetching data:', error));
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
        // {
        //     title: 'Eyelashes Services',
        //     content:
        //         <>
        //             <div class='service-card-1'>
        //                 Classic Eyelash Extensions
        //                 $50
        //             </div>

        //             <div class='service-card-1'>
        //                 Volume Eyelash Extensions
        //                 $55
        //             </div>

        //             <div class='service-card-1'>
        //                 Eyelash Lift & Tint
        //                 $60
        //             </div>

        //             <div class='service-card-1'>
        //                 Eyelash Extension Refill
        //                 $65
        //             </div>

        //             <div class='service-card-1'>
        //                 Lash Removal
        //                 $70
        //             </div>


        //         </>
        // },
        // {
        //     title: 'Hair Removal', content:
        //         <>
        //             <div class='service-card-1'>
        //                 Waxing Services
        //                 $70
        //             </div>

        //             <div class='service-card-1'>
        //                 Threading
        //                 $65
        //             </div>

        //             <div class='service-card-1'>
        //                 Laser Hair Removal
        //                 $60
        //             </div>

        //             <div class='service-card-1'>
        //                 Bikini Wax
        //                 $55
        //             </div>

        //             <div class='service-card-1'>
        //                 Body Sugaring
        //                 $50
        //             </div>

        //         </>
        // },
        // {
        //     title: 'Express Treatments', content:
        //         <>
        //             <div class='service-card-1'>
        //                 Express Facial
        //                 $45
        //             </div>

        //             <div class='service-card-1'>
        //                 Mini Manicure
        //                 $40
        //             </div>

        //             <div class='service-card-1'>
        //                 Mini Pedicure
        //                 $35
        //             </div>

        //             <div class='service-card-1'>
        //                 Eyebrow Tinting
        //                 $30
        //             </div>

        //             <div class='service-card-1'>
        //                 Lash Tinting
        //                 $25
        //             </div>

        //         </>
        // },

        // ... other service data ...
    ];

    const [serviceData, setServiceData] = useState(defaultServiceData);

    // // Function to fetch additional service data from the backend
    // async function fetchServiceDataFromBackend() {
    //     try {
    //         const response = await fetch('/api/services'); // Replace with your actual backend API endpoint
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         return data; // Assuming the data is an array of new service objects
    //     } catch (error) {
    //         console.error('Error fetching service data:', error);
    //         return []; // Return an empty array or handle the error as needed
    //     }
    // }

    // // Function to update the serviceData array with new data
    // async function updateServiceData() {
    //     const newServiceData = await fetchServiceDataFromBackend();
    //     if (newServiceData.length > 0) {
    //         // Merge or append the new data to the existing array
    //         const updatedServiceData = [...serviceData, ...newServiceData];
    //         // Update the state or variable holding your service data
    //         setServiceData(updatedServiceData); // If using React state
    //         // Alternatively, assign the updated data to your existing array
    //         // serviceData = updatedServiceData;
    //     }
    // }

    // // Call the updateServiceData function to fetch and update data when needed
    // useEffect(() => {
    //     updateServiceData();
    // }, []); // Empty dependency array ensures it runs only once on component mount




    const items = [
        'Haircut & Style',
        'Hair Color',
        'Spa Facial',
        'Eylashes Services',
        'Hair Removal',
        'Express Treatments'];
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
    const openCardDetails = (cardIndex) => {
        //setServiceCard(cardIndex);
        setProffVisible(null); // Hide the .cards div
        setMinimized(true);
        setBookingDetail(true); //Booking
        setBookingHeader('Choose Time');
        setIsChooseTImeClicked(true);

        //pushing the professional name
        const clickedDiv = document.querySelector(`.card-0:nth-child(${cardIndex + 1})`);
        if (clickedDiv) {
            const contentElement = clickedDiv.querySelector('p');
            if (contentElement) {
                const content1 = contentElement.textContent;
                setClickedContents(prevContents => [...prevContents, { type: 'content-1-style', value: content1, index: prevContents.filter(item => item.type === 'content-1-style').length },]);
            }
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
        setBookingDetail(false);//last
        setSelectedService(null);

        setServiceCard(true);

    }


    //click of the service subtype (service subtype + price div)
    const openAddon = (serviceName, index) => {
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
        // alert(content3); // Log content3 to see its value
        if (true) {
            const content3 = index;
            setClickedContents(prevContents => [...prevContents, { type: 'content-3-style', value: content3, index: prevContents.filter(item => item.type === 'content-3-style').length },]);
        }

        // const content3 = serviceName; 
        // setClickedContents(prevContents => [
        //     ...prevContents,
        //     {
        //         type: 'content-3-style',
        //         value: content3,
        //         index: prevContents.filter(item => item.type === 'content-3-style').length,
        //     },
        // ]);

        // alert(serviceName);
        sethighlited(index);
        // setselectedServiceCard2(index);
        //if any div is highlited then setting the selected item list div to maximized
        if (higlited) {
            setMinimized(false);
        }


        //for dynamically adding 

    };

    //For add-on cards click 
    // const [isAddonSelected,SetAddonSelected] = useState(false);
    // const toggleAddon = () =>{
    //     SetAddonSelected(!isAddonSelected);
    //     if(isAddonSelected){
    //         alert('selected');
    //     }
    // }



    //for color toggle 
    const addonCards = [
        'Face Bleach', 'Derma Blade', 'Clay Mask', 'Extra Massage', 'Gua Sha 15 min Massage', 'Bleach Facial',
    ];

    const [selectedAddon, setSelectedAddon] = useState([]);

    const toggleSelectAddon = (id) => {
        setSelectedAddon(prev => {
            if (prev.includes(id)) {
                return prev.filter(x => x !== id);
            } else {
                return [...prev, id];
            }
        });

        // Log the selectedAddon array after updating
        console.log("Selected Addons:", selectedAddon);
    }

    const closeSelectedAddon = () => {
        SetAddon(null);
        setSelectedService(true);
        setBookingHeader('Choose Service');
    }

    const handleAddonDelete = (id) => {

        const index = selectedAddon.indexOf(id);

        const updatedAddons = [...selectedAddon];

        updatedAddons.splice(index, 1);

        setSelectedAddon(updatedAddons);

    }

    const OpenProfessional = () => {

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

        if (today.getDay() === 0 || today.getDay() === 1) {
            setShowTimeSlots2(true);
        }
        else { setShowTimeSlots1(true); }

        //For Book Now
        if (isTimeSelected && isUser) {

            // console.log("professional: " + clickedContents[0].value + " Service " + clickedContents[1].value);
            // clickedContents.map((item, index) => {
            //     console.log(`Item ${index}: ${item.value}`);
            // });

            // console.log("date: " + selectedDate + " time " + selectedTime);

            // console.log('total $' + totalPrice.toFixed(2))
            // const professional = clickedContents[0];
            clickedContents.forEach((item, index) => {
                if (index === 0) return;

                const variableName = `item${index}`;
                window[variableName] = item;
            });

            // Create object with professional and items
            const data = {
                professional: clickedContents[0].value,
                items: [],
                date: selectedDate + '  ' + selectedTime,
                total: '$' + (totalPrice.toFixed(2)),
            };

            // Add items to array
            // Initialize counter
            let id = 1;

            // Loop through items
            for (let i = 1; i < clickedContents.length; i++) {

                // Extract name
                const itemValue = window[`item${i}`].value;
                const match = itemValue.match(/^(.*?)\$/);
                const name = match[1];

                // Create item object with id
                const item = {
                    id: id,
                    name
                };

                // Increment counter 
                id++;

                // Add item to array
                data.items.push(item);
            }

            // Stringify as JSON
            const jsonData = JSON.stringify(data);

            console.log(data);

            const dummy = {
                items: {},
                customer: 1,
                staff: 3,
                slot: 0,
                ordered: '',
                total: '21',
                status: 'X',
            }

            const jsonBody = JSON.stringify(dummy);


            console.log('header token is : ', tokenKey);
            fetch('https://thorfinn.pythonanywhere.com/api/v1/order/', {
                headers: {
                    'Authorization': `Token ${tokenKey}`,
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

            // SetIsSuccess(true);

            // setTimeout(() => {
            //     toggleBookingDiv();

            //     // Reload the page after 3 seconds
            //     setTimeout(() => {
            //         window.location.reload();
            //     }, 1000);
            // }, 3000); // 3000 milliseconds = 3 seconds
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




    //to store the total price
    let totalPrice = 0;
    const selectedItems = [];

    // Loop through clickedContents and process each item
    clickedContents.forEach((item, index) => {
        // Split the content based on the '$' symbol
        const parts = item.value.split('$');

        // Check if there are multiple parts after splitting
        if (parts.length > 1) {
            const itemPrice = parseFloat(parts[1]);

            // Add the item to the selectedItems array
            selectedItems.push({ price: itemPrice });

            // Add the item price to the total price
            totalPrice += itemPrice;
        } else {
            // Handle items without pricing (if needed)
        }
    });

    // Render the list of selected items
    const itemList = selectedItems.map((item, index) => (
        <li key={index} >
            <span className="pricing">{`$${item.price.toFixed(2)}`}</span>
        </li>
    ));

    // Render the total price separately
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
    const today = new Date();


    const handleDateChange = (newDate) => {
        setDate(newDate);
        // toggleCalendar();
        today.setDate(today.getDate() - 1);

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
        { icon: <BsSunrise />, time: '10:00 AM' },
        { icon: <BsSunrise />, time: '11:00 AM' },
        { icon: <BsSun />, time: '12:00 PM' },
        { icon: <BsSun />, time: '01:00 PM' },
        { icon: <BsSun />, time: '02:00 PM' },
        { icon: <BsSun />, time: '03:00 PM' },
        { icon: <BsSun />, time: '04:00 PM' },
        { icon: <BsSunset />, time: '05:00 PM' },
        { icon: <BsSunset />, time: '06:00 PM' },
        { icon: <BsSunset />, time: '07:00 PM' },
    ];
    const timeSlots2 = [
        { icon: <BsSunrise />, time: '10:00 AM' },
        { icon: <BsSunrise />, time: '11:00 AM' },
        { icon: <BsSun />, time: '12:00 PM' },
        { icon: <BsSun />, time: '01:00 PM' },
        { icon: <BsSun />, time: '02:00 PM' },
        { icon: <BsSun />, time: '03:00 PM' },
        { icon: <BsSun />, time: '04:00 PM' },
        { icon: <BsSunset />, time: '05:00 PM' },
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
    const cardData = [
        { image: image1, name: 'Image 1' },
        { image: image2, name: 'Image 2' },
        { image: image3, name: 'Image 3' },
        // { image: image4, name: 'Image 4' },
        // { image: image5, name: 'Image 5' },
        // { image: image6, name: 'Image 6' },
        // { image: image7, name: 'Image 7' },
        // { image: image8, name: 'Image 8' },
        // { image: image9, name: 'Image 9' },
        // { image: image10, name: 'Image 10' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const activeCardRef = useRef(null);

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + cardData.length) % cardData.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % cardData.length);
    };

    const handleHover = () => {

        const body = document.body;
        body.style.overflowY = 'hidden'; // Disable vertical scrolling

    }

    const handleMouseLeave = () => {

        const body = document.body;
        body.style.overflow = 'auto';

    }


    // Add event listener to the window to enable scrolling when the mouse leaves the carousel



    useEffect(() => {
        if (activeCardRef.current && currentIndex !== 0) {  //To prevent this behavior, you can use a conditional check to ensure that scrollIntoView is only called when necessary
            activeCardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }, [currentIndex]);



    useEffect(() => {
        const carouselContainer = document.querySelector('.carousel');
        let isScrolling = false;
        let touchStartX = null;
        let touchEndX = null;

        const handleTouchStart = (event) => {
            touchStartX = event.touches[0].clientX;
        };

        const handleTouchEnd = (event) => {

            touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;

            if (swipeDistance > 30) {

                // Right swipe
                handlePrevClick();
            } else if (swipeDistance < -30) {
                // Left swipe

                handleNextClick();
            }
        };

        const handleWheelScroll = (event) => {
            if (isScrolling) return;

            if (event.deltaY > 40) {
                isScrolling = true;
                setTimeout(() => {
                    handleNextClick(); // Scroll down, go to the next card
                    isScrolling = false;
                }, 500); // Adjust the delay time (in milliseconds) as needed
            } else if (event.deltaY < -40) {
                isScrolling = true;
                setTimeout(() => {
                    handlePrevClick(); // Scroll up, go to the previous card
                    isScrolling = false;
                }, 500); // Adjust the delay time (in milliseconds) as needed
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                handlePrevClick(); // Left arrow key
            } else if (event.key === 'ArrowRight') {
                handleNextClick(); // Right arrow key
            }
        };

        if (carouselContainer) {
            carouselContainer.addEventListener('wheel', handleWheelScroll, { passive: true });
            window.addEventListener('keydown', handleKeyDown); // Listen for keydown events
            carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
            carouselContainer.addEventListener('touchend', handleTouchEnd);

            return () => {
                carouselContainer.removeEventListener('wheel', handleWheelScroll);
                window.removeEventListener('keydown', handleKeyDown); // Remove the event listener
                carouselContainer.removeEventListener('touchstart', handleTouchStart);
                carouselContainer.removeEventListener('touchend', handleTouchEnd);

            };
        }
    }, [currentIndex]);



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

                                    {professionals.map((professional, index) => (
                                        <div
                                            className={`card-0 ${serviceCard === index ? 'card-expanded' : ''}`}
                                            key={index}
                                            onClick={() => openCardDetails(index + 1)}
                                        >
                                            <img className='card-0-proff' src={professional.image} alt={`Image for ${professional.name}`} />
                                            <p>{professional.name}</p>
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
                                                    <div className='sercice-card-name'>
                                                        <div className='sercice-card-name-icon'>
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
                                            {/* {serviceData[selectedService].content }  */}

                                            {serviceData.map((service, index) => (
                                                serviceCardStates[index] && (
                                                    <div key={index}>
                                                        <h3 style={{ color: 'black' }}>{service.title}</h3>
                                                        <div style={{ color: 'black' }} className="service-cards">
                                                            {service.content.props.children.map((child, i) => {
                                                                const serviceName = child.props.children;
                                                                const [beforeDollar, afterDollar] = serviceName.split('$');
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className={`service-card-1 ${higlited === i ? 'selected' : ''}`}
                                                                        onClick={() => openAddon(index, serviceName)}
                                                                    >
                                                                        <span className="service-name">{beforeDollar}</span>
                                                                        <span className="service-price">${afterDollar}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
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
                                            {/* 
                                            <div className="service-card-1" onClick={toggleAddon} >Add on 1</div>
                                            <div className="service-card-1" onClick={toggleAddon} >Add on 2</div>
                                            <div className="service-card-1" onClick={toggleAddon} >Add on 3</div>
                                            <div className="service-card-1" onClick={toggleAddon} >Add on 4</div>
                                            <div className="service-card-1" onClick={toggleAddon} >Add on 5</div> */}

                                            <div style={{ display: 'block', width: '100%' }}>
                                                <button className='close-btn' onClick={closeSelectedAddon} >
                                                    <AiOutlineClose className='close-icon' />
                                                </button>
                                            </div>


                                            {addonCards.map(id => (
                                                <div
                                                    className="service-card-1 addons"
                                                    onClick={() => toggleSelectAddon(id)}
                                                    style={{ background: selectedAddon.includes(id) ? 'rgb(224, 224, 224)' : '' }}
                                                    key={id}
                                                >
                                                    {id}
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
                                                    {timeSlots1.map((timeSlot, index) => (
                                                        <div className='time-slot-card' key={index} onClick={() => handleSelectedTimeClick(timeSlot)}>
                                                            {timeSlot.icon} {timeSlot.time}
                                                        </div>
                                                    ))}
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
                                                    {timeSlots2.map((timeSlot, index) => (
                                                        <div className='time-slot-card' key={index} onClick={() => handleSelectedTimeClick(timeSlot)}>
                                                            {timeSlot.icon} {timeSlot.time}
                                                        </div>
                                                    ))}
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

                                        {isNextBtnVisible != null && (<div onClick={OpenProfessional} className='button-48 btn-modified'>Next</div>)}

                                        <button onClick={handleMinimizeOrder} className='button-28'>
                                            {minimized ? <MdExpandMore /> : <MdExpandLess />}
                                        </button>


                                    </div>

                                    <ul className='array-info'>
                                        <div>
                                            {/* Render the contents of clickedContents */}

                                            {clickedContents.map((item, index) => {
                                                // Split the content based on the '$' symbol
                                                const parts = item.value.split('$');

                                                //delete function
                                                const handleDelete = () => {
                                                    // Implement logic to remove the clicked item
                                                    const updatedContents = clickedContents.filter((_, i) => i !== index);
                                                    setClickedContents(updatedContents);
                                                };

                                                // Check if there are multiple parts after splitting
                                                if (parts.length > 1) {
                                                    return (
                                                        <li key={index} className={item.type}>
                                                            <span className='clicked-service-name'>{parts[0]}</span>  <span className="pricing">{`$${parts[1]}`}</span>
                                                            <button onClick={handleDelete}>Delete</button>
                                                            {/* - Index: {item.index} */}
                                                        </li>

                                                    );
                                                } else {
                                                    return (
                                                        <li key={index} className={`item.type proffname`}>
                                                            {'By ' + item.value}
                                                            {/* - Index: {item.index} */}
                                                        </li>
                                                    );
                                                }

                                            })}

                                            {selectedAddon.map(id => (

                                                <div key={id} className="selected-addon">
                                                    Addon {id}

                                                    <button onClick={() => handleAddonDelete(id)}>Delete</button>

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
                                        {/* Display the total price in a separate div */}

                                    </ul>

                                    {isTimeSelected == null && (
                                        <div className='add-more-div' onClick={addMoreItems}>Add More</div>)
                                    }

                                    {orderbtn !== null && (<button className="button-48" role="button" onClick={handleChooseTimeClick}>

                                        <span className="text">
                                            {isUser ? <div  >Book Now </div> : (isTimeSelected ? <div style={{
                                                padding: '0',
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }} onClick={handleLoginClick}>Login

                                            </div> : 'Choose a time')}
                                        </span>
                                    </button>
                                    )}

                                    {orderbtn == null && (
                                        <button className='button-48' onClick={OpenProfessional}>Choose Professional</button>
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
                            <h4>Haircut & Style</h4>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                    </div>
                    <div className='card-2 card-right'>
                        <div className='card-info-right'>
                            <h4>Haircut & Style</h4>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                        <div className='card-img'></div>
                    </div>
                    <div className='card-3 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h4>Haircut & Style</h4>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                    </div>
                    {/* <div className='card-4 card-right'>
                        <div className='card-info-right'>
                            <h4>Haircut & Style</h4>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                        <div className='card-img'></div>
                    </div>
                    <div className='card-5 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h4>Haircut & Style</h4>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                    </div>
                    <div className='card-6 card-right'>
                        <div className='card-info-right'>
                            <h4>Haircut & Style</h4>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                        <div className='card-img'></div>
                    </div> */}
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

                <div className="carousel-container" >
                    <button className="prev-button" onClick={handlePrevClick}>
                        <BiSolidChevronLeft />
                    </button>
                    <div className="carousel">
                        <div className="carousel-card empty"><img src={image11} alt="Image Description" /></div>
                        {cardData.map((item, index) => (
                            <div
                                className={`carousel-card ${currentIndex === index ? 'active' : ''}`}
                                key={index}
                                ref={currentIndex === index ? activeCardRef : null}
                                onMouseLeave={handleMouseLeave}
                                onMouseEnter={handleHover}
                            >
                                <img src={item.image} alt={`Image ${index + 1}`} className='carousel-img' />
                                {currentIndex === index && (
                                    <div className="content">
                                        <p>{item.name}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="carousel-card empty">
                            <img src={image1} alt="Image Description" />
                        </div>
                    </div>
                    <button className="next-button" onClick={handleNextClick}>
                        <BiSolidChevronRight />
                    </button>
                </div>

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
