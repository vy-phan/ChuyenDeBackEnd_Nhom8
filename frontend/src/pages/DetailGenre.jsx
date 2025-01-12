import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useMangaData from '../hooks/useMangaData.js';
import Card from '../compontents/Card.jsx';


const DetailGenre = () => {
  const { genreId } = useParams();
  const { mangaData, genres, loading } = useMangaData();
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        const response = await axios.get(`/api/genre/${genreId}`);
        setGenre(response.data.data);
      } catch (err) {
        console.log('Failed to fetch genre details', err);
      }
    };

    fetchGenreDetails();
  }, [genreId]);

  if (loading) return <div className="flex justify-center items-center h-screen">
    <span className="loading loading-dots loading-lg"></span>
  </div>;

  const filteredManga = mangaData.filter(manga => {
    return manga.genres.includes(genreId);
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Thể loại: {genre?.name}</h1>
      <p className="text-gray-600 text-center mb-4">{genre?.description}</p>
      <div className="flex justify-center items-center">
        <div className="carousel carousel-center bg-neutral rounded-box max-w-5xl mx-auto space-x-4 p-4">
          {filteredManga.map(manga => (
            <Link to={`/manga/${manga._id}`} key={manga._id}>
              <div className="carousel-item" key={manga._id}>
                <Card manga={manga} genres={genres} />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DetailGenre;