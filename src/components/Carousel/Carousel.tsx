import React, { useState } from 'react';
import './Carousel.css';
import { ChevronLeftIcon } from '../Icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../Icons/ChevronRightIcon';

interface CarouselProps {
    images: string[];
    title: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={image} alt={`${title} - view ${index + 1}`} className="carousel-image" />
                    </div>
                ))}
            </div>
            {images.length > 1 && (
                <>
                    <button onClick={goToPrevious} className="carousel-arrow left" aria-label="Previous image">
                        <ChevronLeftIcon />
                    </button>
                    <button onClick={goToNext} className="carousel-arrow right" aria-label="Next image">
                        <ChevronRightIcon />
                    </button>
                    <div className="carousel-dots">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Carousel;