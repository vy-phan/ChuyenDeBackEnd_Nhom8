import React, { useState, useEffect } from 'react'
import useMangaData from '../hooks/useMangaData.js';
import Card from '../compontents/Card.jsx';
import { Link } from 'react-router-dom';

const Search = () => {
  const { mangaData, genres, loading } = useMangaData();
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const searchResults = mangaData.filter(manga =>
      manga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manga.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(searchResults);
  }, [searchTerm, mangaData]);

  return (
    <div className="flex flex-col items-center p-5 max-w-3xl mx-auto">
      <div className="w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm truyện"
          className="w-full px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-400 shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-dots loading-lg"></span>
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

      {!loading && searchTerm && results.length === 0 && (
        <div className="w-full mt-5 text-center text-gray-600">
          Không tìm thấy kết quả
        </div>
      )}
    </div>
  )
}

export default Search