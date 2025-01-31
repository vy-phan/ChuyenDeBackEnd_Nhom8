import React, { useState, useEffect } from 'react';
import Card from '../compontents/Card.jsx';
import CarouselBanner from '../compontents/CarouselBanner.jsx';
import useMangaData from '../hooks/useMangaData.js'; // Correct import for default export
import { Link } from 'react-router-dom'
import Chatbot from '../compontents/Chatbot.jsx';
import ChatbotIcon from '../compontents/ChatbotIcon.jsx';
import Scroller from '../compontents/Scroller.jsx';

const Home = () => {
  const { mangaData, genres, loading } = useMangaData();
  const [isOpen, setIsOpen] = useState(false);
  const [isCarouselLayout, setIsCarouselLayout] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    // Hàm xử lý khi localStorage thay đổi
    const handleStorageChange = () => {
      setCurrentTheme(localStorage.getItem('theme'));
    };

    // Thêm event listener
    window.addEventListener('storage', handleStorageChange);

    // Thêm một MutationObserver để theo dõi thay đổi của attribute html[data-theme]
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setCurrentTheme(localStorage.getItem('theme'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <CarouselBanner />

      {loading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="flex justify-center my-4">
              <div className="btn-group">
                <button 
                  className={`btn ${isCarouselLayout ? 'btn-active' : ''}`}
                  onClick={() => setIsCarouselLayout(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
                  </svg>
                  Carousel
                </button>
                <button 
                  className={`btn ${!isCarouselLayout ? 'btn-active' : ''}`}
                  onClick={() => setIsCarouselLayout(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                  Grid
                </button>
              </div>
            </div>

            {isCarouselLayout ? (
              <div className="flex justify-center items-center">
                <div className={`carousel carousel-center rounded-box max-w-5xl mx-auto space-x-4 p-4 ${currentTheme === 'night' ? 'bg-neutral' : 'bg-white'}`}>
                  {mangaData.map((manga, index) => (
                    <Link to={`/manga/${manga._id}`} key={index}>
                      <div className="carousel-item" key={index}>
                        <Card manga={manga} genres={genres} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`container mx-auto px-4 py-8 ${currentTheme === 'night' ? 'bg-neutral' : 'bg-white'} rounded-xl`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mangaData.map((manga, index) => (
                    <Link to={`/manga/${manga._id}`} key={index} className="w-full">
                      <div className="h-full">
                        <Card manga={manga} genres={genres} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )
      }

      <Scroller />
      <ChatbotIcon onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <Chatbot onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Home;