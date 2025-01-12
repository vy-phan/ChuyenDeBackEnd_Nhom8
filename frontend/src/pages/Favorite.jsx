import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import useMangaData from '../hooks/useMangaData';
import MangaCard from '../compontents/MangaCard';
import { FaList, FaThLarge } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Favorite = () => {
  const navigate = useNavigate();
  const [userLocal, setUserLocal] = useState(null);
  const { user } = useUserData();
  const { mangaData } = useMangaData();
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      toast.error('Vui lòng đăng nhập để xem danh sách yêu thích!');
      navigate('/login');
      return;
    }

    setUserLocal(JSON.parse(userData));
  }, [navigate]);

  if (!userLocal) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const filterUser = userLocal?.favorites || [];
  const favoriteManga = mangaData.filter((mangaItem) => filterUser.includes(mangaItem._id));

  return (
    <div className="container mx-auto p-4">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
          },
          success: {
            style: {
              background: '#4aed88',
            },
          },
          error: {
            style: {
              background: '#ff4b4b',
            },
          },
        }}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-2xl">
          {favoriteManga.length} Manga
        </h1>

        {/* View Mode Toggles */}
        <div className="flex gap-2">
          <button
            className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => setViewMode('list')}
          >
            <FaList className="text-white" />
          </button>
          <button
            className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => setViewMode('grid')}
          >
            <FaThLarge className="text-white" />
          </button>
        </div>
      </div>

      <div className={`
        grid gap-4
        ${viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1'
        }
      `}>
        {favoriteManga.map((manga, index) => (
          <MangaCard 
            key={manga._id || index} 
            manga={manga} 
          />
        ))}
      </div>
    </div>
  );
}

export default Favorite;
