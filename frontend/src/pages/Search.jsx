import React, { useState, useEffect } from 'react'
import useMangaData from '../hooks/useMangaData.js';
import Card from '../compontents/Card.jsx';
import { Link } from 'react-router-dom';

const Search = () => {
  const { mangaData, genres, loading } = useMangaData();
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [randomManga, setRandomManga] = useState(null)

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      setRandomManga(null);
      return;
    }

    const searchResults = mangaData.filter(manga =>
      manga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manga.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(searchResults);
    setRandomManga(null);
  }, [searchTerm, mangaData]);

  const handleRandomManga = () => {
    setSearchTerm('');
    setResults([]);
    const randomIndex = Math.floor(Math.random() * mangaData.length);
    setRandomManga(mangaData[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center p-5 max-w-3xl mx-auto">
      <div className="w-full flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm truyện"
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-400 shadow-sm"
        />
        <button
          onClick={handleRandomManga}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm"
        >
          Random
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : randomManga ? (
        <div className="flex justify-center items-center mt-5">
          <div className="bg-neutral rounded-box p-4">
            <Link to={`/manga/${randomManga._id}`}>
              <Card manga={randomManga} genres={genres} />
            </Link>
          </div>
        </div>
      ) : (results.length <= 0 ?
        (
          <div className="flex justify-center items-center mt-5 ">
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
        ) :
        (
          <div className="flex justify-center items-center mt-5 ">
            <div className="carousel carousel-center bg-neutral rounded-box max-w-5xl mx-auto space-x-4 p-4">
              {results.map((manga, index) => (
                <Link to={`/manga/${manga._id}`} key={index}>
                  <div className="carousel-item" key={index}>
                    <Card manga={manga} genres={genres} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      )}

      {!loading && searchTerm && results.length === 0 && !randomManga && (
        <div className="w-full mt-5 text-center text-gray-600">
          Không tìm thấy kết quả
        </div>
      )}
    </div>
  )
}

export default Search