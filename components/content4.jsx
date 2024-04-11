import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const ProfessionalCarousel = ({ items }) => {
    return (
        <AliceCarousel
            autoPlay
            autoPlayControls
            autoPlayStrategy="none"
            autoPlayInterval={1000}
            animationDuration={1000}
            animationType="fadeout"
            infinite
            touchTracking={true}
            items={items}
        />
    );
};

export default ProfessionalCarousel;
