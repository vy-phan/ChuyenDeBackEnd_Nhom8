import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

const RankingList = ({ mangas, currentTheme }) => {
  const { user } = useUserData();
  const [ favoriteMangas, setFavoriteMangas ] = useState([]);

  useEffect(() => {
    if (user) {
      const flattened = user.flatMap(user => user.favorites);
      setFavoriteMangas(flattened);
    }
  }, [user]);

  // Tạo object đếm số lần xuất hiện của mỗi manga ID trong favorites
  const getFavoriteCount = (mangaId) => {
    return favoriteMangas.filter(favorite => favorite === mangaId).length;
  };

  const topMangas = [...mangas]
    .map(manga => ({
      ...manga,
      favoriteCount: getFavoriteCount(manga._id)
    }))
    .sort((a, b) => b.favoriteCount - a.favoriteCount)
    .slice(0, 4);

  return (
    <div className={`w-full ${currentTheme === 'night' ? 'bg-neutral text-white' : 'bg-base-200'}`}>
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-3 mb-6 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
          </svg>
          <h2 className="text-3xl font-bold">Truyện đề cử</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {topMangas.map((manga, index) => (
            <Link 
              to={`/manga/${manga._id}`} 
              key={index}
              className="group relative block overflow-hidden rounded-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500"
            >
              <div className="relative aspect-[3/4]">
                <div className="absolute -top-2 -left-2 z-10">
                  <div className={`font-bold text-8xl opacity-90 ml-4 ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-300' :
                    index === 2 ? 'text-amber-500' :
                    'text-red-500'
                  } drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
                    {index + 1}
                  </div>
                </div>
                <img
                  src={manga.poster}
                  alt={manga.title}
                  className="absolute inset-0 h-full w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="font-bold line-clamp-2 mb-1">{manga.title}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        {manga.rating || '5'}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        {manga.favoriteCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingList;