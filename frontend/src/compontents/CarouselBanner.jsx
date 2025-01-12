import React, { useState } from 'react'
import Banner1 from './../assets/banner/banner1.jpg'
import Banner2 from './../assets/banner/banner2.jpg'
import Banner3 from './../assets/banner/banner3.jpg'
import Banner4 from './../assets/banner/banner4.jpg'

const CarouselBanner = () => {
    const [activeSlide, setActiveSlide] = useState(1);

    const handleSlideChange = (slideNumber) => {
        setActiveSlide(slideNumber);
    };    

    return (
        <div className="flex flex-col items-center mt-6" style={{ padding: '20px 0' }}>
            {/* Carousel */}
            <div className="carousel w-3/4 rounded-lg shadow-lg relative">
                {/* Slide 1 */}
                <div id="item1" className="carousel-item relative w-full h-64">
                    <img
                        src={Banner1}
                        className="w-full rounded-t-lg object-cover"
                        alt="Slide 1"
                    />
                </div>
                {/* Slide 2 */}
                <div id="item2" className="carousel-item relative w-full h-64">
                    <img
                        src={Banner2}
                        className="w-full rounded-t-lg object-cover"
                        alt="Slide 2"
                    />
                </div>
                {/* Slide 3 */}
                <div id="item3" className="carousel-item relative w-full h-64">
                    <img
                        src={Banner3}
                        className="w-full rounded-t-lg object-cover"
                        alt="Slide 3"
                    />
                </div>
                {/* Slide 4 */}
                <div id="item4" className="carousel-item relative w-full h-64">
                    <img
                        src={Banner4}
                        className="w-full rounded-t-lg object-cover"
                        alt="Slide 4"
                    />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex w-full justify-center gap-3 py-4">
                <a href="#item1" className={`w-3 h-3 rounded-full border ${activeSlide === 1 ? 'bg-dark-300' : 'bg-gray-300'}`} onClick={() => handleSlideChange(1)}></a>
                <a href="#item2" className={`w-3 h-3 rounded-full border ${activeSlide === 2 ? 'bg-dark-300' : 'bg-gray-300'}`} onClick={() => handleSlideChange(2)}></a>
                <a href="#item3" className={`w-3 h-3 rounded-full border ${activeSlide === 3 ? 'bg-dark-300' : 'bg-gray-300'}`} onClick={() => handleSlideChange(3)}></a>
                <a href="#item4" className={`w-3 h-3 rounded-full border ${activeSlide === 4 ? 'bg-dark-300' : 'bg-gray-300'}`} onClick={() => handleSlideChange(4)}></a>
            </div>
        </div>
    )
}

export default CarouselBanner