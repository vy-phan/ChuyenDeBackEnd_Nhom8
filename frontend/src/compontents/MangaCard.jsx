import React from 'react';
import { Link } from 'react-router-dom';
import getGenreData from '../hooks/useGenres';
import useMangaData from '../hooks/useMangaData';

const MangaCard = ({ manga }) => {

  const { genres } = useMangaData();
  return (
    <div className="block">
      <div className="flex bg-gray-800 rounded-lg overflow-hidden w-full h-[230px]">
        {/* Ảnh bên trái */}
        <Link to={`/manga/${manga._id}`} className="relative w-[140px] flex-shrink-0">
          <img
            src={manga.poster}
            alt={manga.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className="text-white bg-gray-900/70 px-2 py-1 rounded-full text-xs">
              Ch. {manga.chapters.length}
            </span>
          </div>
        </Link>

        {/* Thông tin bên phải */}
        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-semibold text-lg line-clamp-1">
              {manga.title}
            </h3>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-gray-300 text-sm mb-2">
            <div className="flex items-center gap-1">
              <span>⭐ </span>
            </div>
            <div className="flex items-center gap-1">
              <span>{'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💬 </span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {getGenreData(manga.genres?.slice(0, 3), genres).map((genre) => (
              <Link to={`/genre/${genre.id}`} key={genre.id}>
                <span
                  key={genre.id}
                  className={`px-2 py-0.5 rounded-full text-xs bg-gray-700 text-gray-200`}
                >
                  {genre.name}
                </span>
              </Link>
            ))}
            {manga.genres?.length > 3 && (
              <span className="text-gray-400 text-xs mt-1">
                + {manga.genres.length - 3} more
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm " dangerouslySetInnerHTML={{ __html: manga.description }}></p>
        </div>

      </div>
    </div>
  );
};

export default MangaCard;