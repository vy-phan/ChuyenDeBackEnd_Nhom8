import React, { useState } from 'react';
import Card from '../compontents/Card.jsx';
import CarouselBanner from '../compontents/CarouselBanner.jsx';
import useMangaData from '../hooks/useMangaData.js'; // Correct import for default export
import { Link } from 'react-router-dom'
import Chatbot from '../compontents/Chatbot.jsx';
import ChatbotIcon from '../compontents/ChatbotIcon.jsx';

const Home = () => {
  const { mangaData, genres, loading } = useMangaData();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CarouselBanner />

      {loading ?
        (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) :
        <div className="flex justify-center items-center  ">
          <div className="carousel carousel-center bg-neutral rounded-box max-w-5xl mx-auto space-x-4 p-4">
            {mangaData.map((manga, index) => (
              <Link to={`/manga/${manga._id}`} key={index}>
                <div className="carousel-item" key={index}>
                  <Card manga={manga} genres={genres} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      }

      <ChatbotIcon onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <Chatbot onClose={() => setIsOpen(false)} />}

    </>
  );
};

export default Home;