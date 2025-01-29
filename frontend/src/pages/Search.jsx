import React, { useState, useEffect } from 'react'
import useMangaData from '../hooks/useMangaData.js';
import Card from '../compontents/Card.jsx';
import { Link } from 'react-router-dom';

const Search = () => {
  const { mangaData, genres, loading } = useMangaData();
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [randomManga, setRandomManga] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeFilter, setActiveFilter] = useState('none') // 'none', 'search', 'status', 'date', 'genre'
  const [sortOrder, setSortOrder] = useState('desc') // 'desc' for newest first, 'asc' for oldest first
  const [selectedGenre, setSelectedGenre] = useState('all')

  // Handle search
  const handleSearch = (term) => {
    if (term.trim() === '') {
      setResults([]);
      setActiveFilter('none');
      return;
    }

    const searchResults = mangaData.filter(manga =>
      manga.title.toLowerCase().includes(term.toLowerCase()) ||
      manga.description?.toLowerCase().includes(term.toLowerCase())
    );

    setResults(searchResults);
    setActiveFilter('search');
    setStatusFilter('all');
    setSelectedGenre('all');
  }

  // Handle status filter
  const handleStatusFilter = (status) => {
    if (status === 'all') {
      setResults([]);
      setActiveFilter('none');
      return;
    }

    const filteredResults = mangaData.filter(manga => manga.status === status);
    setResults(filteredResults);
    setActiveFilter('status');
    setSearchTerm('');
    setSelectedGenre('all');
  }

  // Handle genre filter
  const handleGenreFilter = (genreId) => {
    if (genreId === 'all') {
      setResults([]);
      setActiveFilter('none');
      return;
    }

    const filteredResults = mangaData.filter(manga => 
      manga.genres.includes(genreId)
    );
    setResults(filteredResults);
    setActiveFilter('genre');
    setSearchTerm('');
    setStatusFilter('all');
  }

  // Handle date sort
  const handleDateSort = () => {
    const sortedResults = [...mangaData].sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setResults(sortedResults);
    setActiveFilter('date');
    setSearchTerm('');
    setStatusFilter('all');
    setSelectedGenre('all');
  }

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, mangaData]);

  // Handle random manga
  const handleRandomManga = () => {
    setSearchTerm('');
    setResults([]);
    setStatusFilter('all');
    setSelectedGenre('all');
    setActiveFilter('none');
    const randomIndex = Math.floor(Math.random() * mangaData.length);
    setRandomManga(mangaData[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center p-3 sm:p-5 max-w-3xl mx-auto">
      {/* Search and Random Section */}
      <div className="w-full flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm truyện"
          className="w-full px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-blue-400 shadow-sm text-sm sm:text-base"
        />
        <button
          onClick={handleRandomManga}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm text-sm sm:text-base whitespace-nowrap"
        >
          Random
        </button>
      </div>

      {/* Filter Options */}
      <div className="w-full mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:justify-end">
        {/* Sort by Date Filter */}
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            handleDateSort();
          }}
          className={`select select-bordered w-full sm:w-auto text-sm ${
            activeFilter === 'date' ? 'select-primary' : ''
          }`}
        >
          <option value="asc">Mới cập nhật</option>
          <option value="desc">Cũ nhất</option>
        </select>

        {/* Genre Filter */}
        <select
          value={selectedGenre}
          onChange={(e) => handleGenreFilter(e.target.value)}
          className={`select select-bordered w-full sm:w-auto text-sm ${
            activeFilter === 'genre' ? 'select-primary' : ''
          }`}
        >
          <option value="all">Tất cả thể loại</option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className={`select select-bordered w-full sm:w-auto text-sm ${
            activeFilter === 'status' ? 'select-primary' : ''
          }`}
        >
          <option value="all">Tất cả</option>
          <option value="Đang tiến hành">Đang tiến hành</option>
          <option value="Đã hoàn thành">Hoàn thành</option>
        </select>
      </div>

      {/* Genres Section */}
      {/* <div className="w-full mt-4 p-4 bg-neutral rounded-box">
        <h3 className="text-lg font-semibold mb-3 text-left">Thể loại</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {genres.map((genre) => (
            <Link
              key={genre._id}
              to={`/genre/${genre._id}`}
              className="badge badge-outline badge-primary p-3 text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div> */}

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