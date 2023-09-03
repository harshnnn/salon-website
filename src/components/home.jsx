import React, { Component, useState, useRef, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineFacebook, AiOutlineClose } from 'react-icons/ai';
import { FaRandom } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { PiPaperPlaneTiltLight } from 'react-icons/pi';
import { IoCallOutline } from 'react-icons/io5';
import './style.css'
import imagex from './Resources/random.webp';
import image1 from './Resources/Ellipse\ 14.png'


import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'





const HomePage = () => {

    const handleOnDragStart = (e) => e.preventDefault();


    const [selectedItem, setSelectedItem] = useState(0);

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };


    const serviceData = [
        {
            title: 'Haircut & Style', content:
                <>
                    <div className='service-card-1' >
                        Women’s Haircut
                        $85
                    </div>

                    <div className='service-card-1'  >
                        Blowdry & Style
                        $65
                    </div>
                    <div className='service-card-1'>
                        Deep Conditioner
                        $70
                    </div>

                    <div className='service-card-1'>
                        Men’s Haircut
                        $50
                    </div>

                    <div className='service-card-1'>
                        Brazilian Blowout
                        $75
                    </div>
                </>

        },
        {
            title: 'Hair Color', content:
                <>
                    <div className='service-card-1'>
                        Hair Color
                        $65
                    </div>
                    <div className='service-card-1'>
                        Highlights
                        $BB
                    </div>

                    <div className='service-card-1'>
                        Balayage
                        $CC
                    </div>

                    <div className='service-card-1'>
                        Color Correction
                        $DD
                    </div>

                    <div className='service-card-1'>
                        Ombre
                        $EE
                    </div>


                </>
        },
        {
            title: 'Spa Facial', content:
                <>
                    <div className='service-card-1'>
                        Classic Spa Facial
                        $FF
                    </div>

                    <div className='service-card-1'>
                        Anti-Aging Facial
                        $GG
                    </div>

                    <div className='service-card-1'>
                        Hydrating Facial
                        $HH
                    </div>

                    <div className='service-card-1'>
                        Acne Clearing Facial
                        $II
                    </div>

                    <div className='service-card-1'>
                        Sensitive Skin Facial
                        $JJ
                    </div>

                </>
        },
        {
            title: 'Eyelashes Services',
            content:
                <>
                    <div class='service-card-1'>
                        Classic Eyelash Extensions
                        $KK
                    </div>

                    <div class='service-card-1'>
                        Volume Eyelash Extensions
                        $LL
                    </div>

                    <div class='service-card-1'>
                        Eyelash Lift & Tint
                        $MM
                    </div>

                    <div class='service-card-1'>
                        Eyelash Extension Refill
                        $NN
                    </div>

                    <div class='service-card-1'>
                        Lash Removal
                        $OO
                    </div>


                </>
        },
        {
            title: 'Hair Removal', content:
                <>
                    <div class='service-card-1'>
                        Waxing Services
                        $PP
                    </div>

                    <div class='service-card-1'>
                        Threading
                        $QQ
                    </div>

                    <div class='service-card-1'>
                        Laser Hair Removal
                        $RR
                    </div>

                    <div class='service-card-1'>
                        Bikini Wax
                        $SS
                    </div>

                    <div class='service-card-1'>
                        Body Sugaring
                        $TT
                    </div>

                </>
        },
        {
            title: 'Express Treatments', content:
                <>
                    <div class='service-card-1'>
                        Express Facial
                        $UU
                    </div>

                    <div class='service-card-1'>
                        Mini Manicure
                        $VV
                    </div>

                    <div class='service-card-1'>
                        Mini Pedicure
                        $WW
                    </div>

                    <div class='service-card-1'>
                        Eyebrow Tinting
                        $XX
                    </div>

                    <div class='service-card-1'>
                        Lash Tinting
                        $YY
                    </div>

                </>
        },
        // ... other service data ...
    ];







    const items = ['Haircut & Style',
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

                <p>Consult with our stylists to create a look that compliments your features and accents your personal style. <br />
                    Includes a shampoo, blowdry and style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Blowdry & Style
                    <br />
                    $55 - $60</p>

                <p>Starting with freshly cleansed and conditioned hair, our stylists apply different <br />
                    techniques to achieve the perfect straight, wavy or curly style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Deep Conditioner<br />
                    $65</p>

                <p>
                    This nutrient-rich treatment saves your strands from the stressors of day-to-day life by <br />
                    adding extra moisture for shiny, healthy hair.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Men’s Haircut <br />
                    $60 - $70</p>

                <p>
                    Add some swagger to your step with our high-quality men's haircuts. <br />
                    Includes head massage, shampoo, cut, style & neck clean-up.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Brazilian Blowout
                    <br />
                    Starting at $315</p>

                <p>
                    Brazilian Blowout is by far the most-requested hair smoothing treatment as it creates a protective <br />
                    layer around each strand of hair, effectively diminishing frizz and promoting intense shine.</p>
            </div>
        </div>,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Hair Color<br />$100 - $150</p>
                <p>Our expert colorists use the latest techniques and high-quality products to create a hair color that suits your personality and style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Highlights<br />Starting at $120</p>
                <p>Add dimension and brightness to your hair with our professional highlighting services. Choose from a variety of shades and techniques.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Balayage<br />Starting at $150</p>
                <p>Get that sun-kissed, natural look with our custom balayage technique. Our colorists blend shades seamlessly for a stunning result.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Color Correction<br />Price Varies</p>
                <p>If you're unhappy with your current hair color, our color correction service can help you achieve your desired shade while maintaining hair health.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Ombre<br />Starting at $130</p>
                <p>Transform your look with the trendy ombre hair coloring technique. Our experts create a smooth transition between two shades for a striking effect.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Classic Spa Facial<br />$80</p>
                <p>Indulge in relaxation with our classic spa facial. Includes deep cleansing, exfoliation, steam, extractions, mask, and soothing massage.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Anti-Aging Facial<br />$100</p>
                <p>Revitalize your skin with our anti-aging facial. Specialized products and techniques target fine lines, wrinkles, and promote a youthful complexion.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Hydrating Facial<br />$90</p>
                <p>Restore moisture balance to your skin with our hydrating facial. Perfect for dry or dehydrated skin, leaving you with a radiant glow.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Acne Clearing Facial<br />$85</p>
                <p>Combat acne and blemishes with our acne clearing facial. Deep cleansing, exfoliation, and targeted treatments help improve skin clarity.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Sensitive Skin Facial<br />$95</p>
                <p>Gentle care for sensitive skin. Our soothing facial calms irritation and redness, providing relief and leaving your skin feeling refreshed.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Classic Eyelash Extensions<br />$120</p>
                <p>Enhance your natural beauty with our classic eyelash extensions. One extension is applied to each natural lash for a subtle yet stunning look.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Volume Eyelash Extensions<br />$150</p>
                <p>Get a more dramatic and voluminous look with our volume eyelash extensions. Multiple lightweight extensions are applied to each natural lash.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyelash Lift & Tint<br />$75</p>
                <p>Lift and curl your natural lashes while adding a tint for enhanced definition. Wake up with beautifully lifted and darkened lashes.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyelash Extension Refill<br />$60</p>
                <p>Maintain the longevity of your eyelash extensions with our refill service. Recommended every 2-3 weeks to keep your lashes looking full.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Lash Removal<br />$25</p>
                <p>If you decide to remove your eyelash extensions, our gentle removal process ensures your natural lashes remain intact.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Waxing Services<br />Price Varies</p>
                <p>Our waxing services offer hair removal solutions for various areas including eyebrows, upper lip, chin, legs, arms, and more. Prices depend on the area.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Threading<br />Price Varies</p>
                <p>Experience the precision of threading for facial hair removal. Our technicians shape eyebrows and remove unwanted facial hair with this ancient technique.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Laser Hair Removal<br />Price Varies</p>
                <p>Permanently reduce unwanted hair with our advanced laser hair removal technology. Sessions are tailored to your needs for optimal results.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Bikini Wax<br />Starting at $45</p>
                <p>Get beach-ready with our bikini waxing services. Choose from a standard bikini wax or more comprehensive styles like Brazilian or Hollywood wax.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Body Sugaring<br />Price Varies</p>
                <p>Try the natural alternative to waxing with our body sugaring services. Gentle on the skin and effective for hair removal on various body parts.</p>
            </div>
        </div>
        ,
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Express Facial<br />$50</p>
                <p>When time is limited, our express facial provides a quick and rejuvenating treatment to cleanse, exfoliate, and nourish your skin.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Mini Manicure<br />$25</p>
                <p>Give your hands some attention with our mini manicure. Includes nail shaping, cuticle care, and a polish application of your choice.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Mini Pedicure<br />$30</p>
                <p>Treat your feet with our mini pedicure. Relax in a foot soak, get nail shaping, cuticle care, and a polish application for a quick refresh.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyebrow Tinting<br />$20</p>
                <p>Enhance your brows with eyebrow tinting. Our experts apply a custom tint to match your desired shade, providing a defined look.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Lash Tinting<br />$25</p>
                <p>Darken your lashes with our lash tinting service. Achieve the appearance of mascara without the daily hassle.</p>
            </div>
        </div>

    ];


    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 450; // Adjust scroll amount as needed (width of a single item)
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 450; // Adjust scroll amount as needed (width of a single item)
        }
    };


    // booking div
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardsVisible, setCardsVisible] = useState(true);
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDetail, setBookingDetail] = useState(null);


    const [clickedContents, setClickedContents] = useState([]);

    const [clickedServiceIndex, setClickedServiceIndex] = useState(null);




    const toggleDiv = () => {

        setIsVisible(!isVisible);
        setSelectedCard(null); // Reset selected card when toggling
        setCardsVisible(true); // Show the .cards div
        setClickedContents([]); //clear the array
    };
    const openCardDetails = (cardIndex) => {
        setSelectedCard(cardIndex);
        setCardsVisible(false); // Hide the .cards div


        const clickedDiv = document.querySelector(`.card-0:nth-child(${cardIndex + 1})`);
        if (clickedDiv) {
            const contentElement = clickedDiv.querySelector('p');
            if (contentElement) {
                const content = contentElement.textContent;
                setClickedContents(prevContents => [...prevContents, content]);
            }
        }
    };




    const closeselectedcard = () => {
        setSelectedCard(null);
        setCardsVisible(true); // Show the .cards div

        setClickedContents([]); // Clear the array when closing the card


    };

    const openServiceDetails = (serviceindex) => {

        setSelectedService(serviceindex);

        //To Show the title of the service detail 
        const title = serviceData[serviceindex].title;
        const content = (
            <div>
                {/* <p>lavda</p> */}
                <div className='card-title'>{title}</div>
            </div>
        );
        setClickedContents(prevContents => [...prevContents, content]);

        //last

        if (serviceindex === 0) {
            setselectedServiceCard1(true);
        } else {
            setselectedServiceCard1(false);
        }
        if (serviceindex === 1) {
            setselectedServiceCard2(true);
        } else {
            setselectedServiceCard2(false);
        }
        if (serviceindex === 2) {
            setselectedServiceCard3(true);
        } else {
            setselectedServiceCard3(false);
        }
        if (serviceindex === 3) {
            setselectedServiceCard4(true);
        } else {
            setselectedServiceCard4(false);
        }
        if (serviceindex === 4) {
            setselectedServiceCard5(true);
        } else {
            setselectedServiceCard5(false);
        }
        if (serviceindex === 5) {
            setselectedServiceCard6(true);
        } else {
            setselectedServiceCard6(false);
        }


    };


    const closeSelectedService = () => {
        sethighlited(null);
        //to get back
        setBookingDetail(false);//last
        setSelectedService(null);
        //function to delet the latest item form the array
        setClickedContents(prevContents => {
            const newContents = [...prevContents];
            newContents.pop();
            // newContents.pop();//removing 1 more element
            return newContents;
        });
    }




    const handleClick = (serviceName, index) => {
        setBookingDetail(true);
        // alert(serviceName);
        sethighlited(index);
        // setselectedServiceCard2(index);
        setClickedContents(prevContents => [...prevContents, serviceName]);
    };

    //for showing the sliced array to it's correct title
    const [selectedServiceCard1, setselectedServiceCard1] = useState(null);
    const [selectedServiceCard2, setselectedServiceCard2] = useState(null);
    const [selectedServiceCard3, setselectedServiceCard3] = useState(null);
    const [selectedServiceCard4, setselectedServiceCard4] = useState(null);
    const [selectedServiceCard5, setselectedServiceCard5] = useState(null);
    const [selectedServiceCard6, setselectedServiceCard6] = useState(null);

    const [higlited, sethighlited] = useState(null);
    const [minimized, setMinimized] = useState(false);

    const [isChooseTimeClicked, setIsChooseTImeClicked] = useState(null);
    

    const handleChooseTimeClick = () => {
        setIsChooseTImeClicked(!isChooseTimeClicked);
        handleMinimizeOrder();
        
    }
    const handleMinimizeOrder = () => {
        setMinimized(!minimized);
    }

    const closeChooseTime = () => {
        setIsChooseTImeClicked(null);
    }


    return (
        <div className='home-page'>
            <div className='content-1' id="content-1" >
                <div className='tagline'><p>We provde you the best experience which your hair <span>loves</span></p>

                    <div className='container'>
                        <div className='book-btn' onClick={toggleDiv}>
                            Book Now
                        </div>
                        {isVisible && (
                            <div className={`animated-div scrollbar ${isVisible ? 'slide-in' : 'slide-out'} ${minimized ? 'animated-div-overflow-hidden' : ''}`}                            >

                                {/* booking header div */}
                                <div className='header-container'>
                                    <div className='book-header'>

                                        <h3>{selectedCard !== null ? 'Choose a service' : 'Choose a professional'}</h3>
                                        {/* <h2>
                                            {selectedCard !== null
                                                ? 'Choose a service'
                                                : showTimeSelection !== null
                                                    ? 'Choose Time'
                                                    : 'Choose a professional'}
                                        </h2> */}
                                        <button className='close-btn' onClick={toggleDiv}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>
                                    </div>
                                </div>

                                {/* this div has the list of all the professionals */}
                                <div className={`cards ${cardsVisible ? '' : 'hidden'}`}>

                                    {Array.from({ length: 8 }, (_, index) => (
                                        <div
                                            className={`card-0 ${selectedCard === index ? 'card-expanded' : ''}`}
                                            key={index}
                                            onClick={() => openCardDetails(index)}
                                        >
                                            {index === 0 && <div>  <p> <FaRandom /></p> </div>}
                                            {index === 1 && <p>Content for div 1</p>}
                                            {index === 2 && <p>Content for div 2</p>}
                                            {index === 3 && <p>Content for div 3</p>}
                                            {index === 4 && <p>Content for div 4</p>}
                                            {index === 5 && <p>Content for div 5</p>}
                                            {index === 6 && <p>Content for div 6</p>}
                                            {index === 7 && <p>Content for div 7</p>}
                                        </div>
                                    ))}

                                </div>

                                {/* this div has all the service types listed*/}
                                {selectedCard !== null && (
                                    <div className='expanded-card scrollbar '>
                                        <button className='close-btn ' onClick={closeselectedcard}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>
                                        <div className='service-cards'>
                                            {serviceData.map((service, serviceindex) => (
                                                <div
                                                    key={serviceindex}
                                                    className={`service-card-1 ${selectedService === serviceindex ? 'selected' : ''
                                                        } ${clickedServiceIndex === serviceindex ? 'clicked' : ''}`}
                                                    onClick={() => openServiceDetails(serviceindex)}
                                                >
                                                    <div>
                                                        <p>{service.title}</p>
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

                                            {serviceData.slice(0, 1).map((service, index) => (
                                                selectedServiceCard1 && (
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
                                                                        onClick={() => handleClick(serviceName, i)}
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

                                            {serviceData.slice(1, 2).map((service, index) => (
                                                selectedServiceCard2 && (
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
                                                                        onClick={() => handleClick(serviceName, i)}
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

                                            {serviceData.slice(2, 3).map((service, index) => (
                                                selectedServiceCard3 && (
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
                                                                        onClick={() => handleClick(serviceName, i)}
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

                                            {serviceData.slice(3, 4).map((service, index) => (
                                                selectedServiceCard4 && (
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
                                                                        onClick={() => handleClick(serviceName, i)}
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

                                            {serviceData.slice(4, 5).map((service, index) => (
                                                selectedServiceCard5 && (
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
                                                                        onClick={() => handleClick(serviceName, i)}
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

                                            {serviceData.slice(5, 6).map((service, index) => (
                                                selectedServiceCard6 && (
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
                                                                        onClick={() => handleClick(serviceName, i)}
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




                                {/* stored the content of clicked divs */}
                                {/* <div className={`clicked-div-content  ${bookingDetail ? '' : 'hidden'}`}>
                                    <h2>Your Order</h2>
                                    <ul className='array-info'>
                                        {clickedContents.map((content, index) => {
                                            if (index === 2 && typeof content === 'string') {
                                                const [beforeDollar, afterDollar] = content.split('$');
                                                return (
                                                    <li key={index} className='split-content'>
                                                        <span className="first-part">{beforeDollar}</span>
                                                        <span className="second-part">${afterDollar}</span>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={index} className={index < 2 ? 'array-info-left' : 'array-info-right'}>
                                                        {content}
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>

                                    <button className="button-48" role="button">
                                        <span className="text">Choose a time</span>
                                    </button>
                                </div> */}

                                {isChooseTimeClicked !== null && (
                                    <div className='expanded-card scrollbar choose-time-div'>
                                        <button className='close-btn' onClick={closeChooseTime}>
                                            <AiOutlineClose className='close-icon' />
                                        </button>
                                    </div>
                                )}

                                <div className={`clicked-div-content ${bookingDetail ? (minimized ? 'clicked-div-content-active' : '') : 'hidden'}`}>
                                    <div className='clicked-div-content-header'>
                                        <h2>Your Order</h2>
                                        <button onClick={handleMinimizeOrder}> ˄</button>
                                    </div>

                                    <ul className='array-info'>
                                        {clickedContents.map((content, index) => {
                                            if (index === 2 && typeof content === 'string') {
                                                const [beforeDollar, afterDollar] = content.split('$');
                                                return (
                                                    <li key={index} className='split-content'>
                                                        <span className="first-part">{beforeDollar}</span>
                                                        <span className="second-part">${afterDollar}</span>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={index} className={index < 2 ? 'array-info-left' : 'array-info-right'}>
                                                        {content}
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>

                                    <button className="button-48" role="button" onClick={handleChooseTimeClick}>
                                        <span className="text">Choose a time</span>
                                    </button>
                                </div>



                            </div>
                        )}



                    </div>
                </div>
            </div>

            <div className='content-2' id='content-2'>
                <h1>Services We Offer</h1>
                <div className='cards'>
                    <div className='card-1 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h1>Haircut & Style</h1>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                    </div>
                    <div className='card-2 card-right'>
                        <div className='card-info-right'>
                            <h1>Haircut & Style</h1>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                        <div className='card-img'></div>
                    </div>
                    <div className='card-3 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h1>Haircut & Style</h1>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                    </div>
                    <div className='card-4 card-right'>
                        <div className='card-info-right'>
                            <h1>Haircut & Style</h1>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                        <div className='card-img'></div>
                    </div>
                    <div className='card-5 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h1>Haircut & Style</h1>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                    </div>
                    <div className='card-6 card-right'>
                        <div className='card-info-right'>
                            <h1>Haircut & Style</h1>
                            <p>Our talented team of hair care experts deliver designer <br />
                                cuts, treatments, and styling services that are <br />
                                customized to your specific needs.</p>
                        </div>
                        <div className='card-img'></div>
                    </div>
                </div>

            </div>


            <div className="content-3" id="content-3" >
                <div className="content-3-img"></div>
                <div className="content-3-info">
                    <h1>About Us</h1>
                    <p>
                        Come relax and rejuvenate with the variety of luxurious salon and spa services <br />
                        offered by Intermezzo Salon & Spa, nestled on the top of Queen Anne Hill. <br />
                        Our staff of highly trained professionals is committed <br />
                        to bringing you the highest quality service and products.
                    </p>
                </div>
            </div>

            <div className="content-4">
                <h1>Out Talanted Staff</h1>



                <div className="carousel-container">
                    <AliceCarousel showArrows={false} showStatus={false} showIndicators={false}>


                        <div className="carousel-item forlargescreen">
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                        </div>
                        <div className="carousel-item forlargescreen">
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                        </div>




                        <div className="carousel-item forsmallscreen">
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                        </div>
                        <div className="carousel-item forsmallscreen">
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                        </div>
                        <div className="carousel-item forsmallscreen">
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                        </div>
                        <div className="carousel-item forsmallscreen">
                            <div className='stff1'></div>
                            <div className='stff1'></div>
                        </div>



                    </AliceCarousel>
                </div>

            </div>

            <div className="content-5">
                <h1>Our Prices</h1>

                <div className='list-details'>

                    <div>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} onClick={() => handleItemClick(index)}
                                    className={selectedItem === index ? 'selected' : ''}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div>
                            {selectedItem !== null && <div>{content[selectedItem]}</div>}
                        </div>
                    </div>

                </div>

                <button className='book-slot-btn' onClick={toggleDiv}><p>Book Your Slot</p></button>
            </div>

            <div className="content-6">
                <h1>Testimonials</h1>

                <AliceCarousel className='content-6-box' >
                    <div onDragStart={handleOnDragStart} className='content-6-card'>
                        <img className='content-6-img img1' />
                        <p>
                            Brazilian Blowout is by far the most-requested hair
                            smoothing treatment <br /> as it creates a protective layer
                            around each strand of hair, effectively <br /> diminishing frizz
                            and promoting intense shine. This nutrient-rich <br />
                            treatment saves your strands from the stressors of day-to-day <br />
                            life by adding extra moisture for shiny, healthy <br />
                            hair. <br />
                            ~Cherry
                        </p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>
                        <img className='content-6-img img2' />
                        <p>
                            Keratin treatment is widely known as a highly sought-after hair <br />
                            care solution that forms a shielding barrier around each hair <br />
                            strand, effectively reducing frizz and enhancing brilliant gloss. <br />
                            This nourishing therapy revitalizes your locks from everyday <br />
                            challenges, replenishing added hydration for lustrous, vibrant <br />
                            hair. <br />
                            ~Aqua
                        </p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>
                        <img className='content-6-img img3' />
                        <p>
                            The trendsetting Silk Press has become the ultimate choice for <br />
                            achieving sleek hair, crafting a safeguarding coat around every <br />
                            single strand. This enriching procedure combats frizz and fosters <br />
                            a radiant sheen. This enriching treatment rejuvenates your hair <br />
                            against everyday pressures, infusing additional moisture for <br />
                            luminous, robust hair. <br />
                            ~Luna
                        </p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>
                        <img className='content-6-img img4' />
                        <p>
                            Glossy hair, sought-after by many, the Japanese Straightening <br />
                            technique is renowned for enveloping each strand with a <br />
                            protective shield, effectively eliminating frizz and enhancing <br />
                            luminous brilliance. This nutrient-packed treatment shields your <br />
                            strands from daily life challenges, providing extra hydration <br />
                            for glossy, resilient hair. <br />
                            ~Jade
                        </p>
                    </div>
                </AliceCarousel>
            </div>

            <div className="content-7" id='content-7'>
                <h1>Check Our Gallery</h1>
                <div className='shape'></div>
                <div className='shape shape2'></div>
                <div className="img1"></div>
                <div className="img2"></div>
                <div className="img3"></div>

            </div>

            <div className="content-8">
                <h1>Out Partnerships</h1>
            </div>

            <div className="content-9">
                <div>
                    <h2>About our store</h2>
                    <p>Nestled on the top of Queen Anne <br /> Hill, Intermezzo Salon & Spa has been <br /> Seattle’s premiere boutique salon for for  <br />over 20 years. Our staff of highly-trained <br /> professionals is committed to bringing <br /> best-in-class service and products <br /> designed to make you feel and look <br /> your best.</p>
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
                        <th colSpan={2}>

                        </th>

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
                    </table>
                </div>

            </div>

        </div>
    );
};


export default HomePage;
