import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import useMangaData from '../hooks/useMangaData.js';
import getGenreData from '../hooks/useGenres.js';
import { formatDate } from '../utils/dataFomat.js';
import useCUDUser from '../hooks/useCUDUser.js';

const DetailCard = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [manga, setManga] = useState(null);
  const { genres } = useMangaData()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(null);
  const { updateUser } = useCUDUser();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLiked(userData.favorites?.includes(id));
    }
  }, [id]);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const response = await axios.get(`/api/manga/${id}`);
        setManga(response.data.data);
      } catch (err) {
        setError('Failed to fetch manga details');
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [id]);

  if (error) {
    return toast.error(error);
  }

  const handleHeartClick = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để thêm vào yêu thích!');
      return;
    }

    try {
      // Đảm bảo favorites là một mảng
      const currentFavorites = user.favorites || [];
      
      const updatedFavorites = isLiked
        ? currentFavorites.filter(favoriteId => favoriteId !== id)
        : [...currentFavorites, id];



      const updatedUserData = await updateUser(user._id, {
        favorites: updatedFavorites
      });



      // Cập nhật local storage và state
      const updatedUser = { 
        ...user, 
        favorites: updatedUserData.favorites // Sử dụng dữ liệu từ server
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsLiked(!isLiked);
      
      toast.success(isLiked 
        ? 'Đã xóa khỏi danh sách yêu thích' 
        : 'Đã thêm vào danh sách yêu thích'
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast.error('Có lỗi xảy ra khi cập nhật yêu thích');
    }
  };

  return (
    loading ? (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    ) : (
      <div className="bg-base-200 min-h-screen p-6">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 1000,
            style: {
              background: '#363636',
              color: '#fff',
              padding: '16px',
            },
            success: {
              duration: 1000,
              style: {
                background: '#4aed88',
              },
            },
            error: {
              duration: 3000,
              style: {
                background: '#ff4b4b',
              },
            },
          }}
        />

        {/* Card container */}
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6">

          {/* Poster Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="card bg-base-100 shadow-xl mb-4">
              <figure className="w-full">
                <img
                  src={manga.poster}
                  alt={manga.title}
                  className="rounded-t-lg object-cover w-full h-auto max-w-[230px]"
                />
              </figure>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{manga.title}</h1>
              <p className="text-gray-600">
                Trạng thái: <span className="text-green-500">{manga.status}</span>
              </p>
              <p className='text-gray-600'>
                {formatDate(manga.updatedAt)}
              </p>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {getGenreData(manga.genres, genres).map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className="badge badge-outline badge-primary text-sm cursor-pointer"
              >
                {genre.name}
              </Link>
            ))}
          </div>

          {/* nút yêu thích  */}
          <div className='flex justify-end'>
            <button 
              className={`btn ${isLiked 
                ? 'bg-pink-500 hover:bg-pink-600 border-none text-white shadow-lg transform hover:scale-105 transition-all' 
                : 'bg-white hover:bg-pink-50 border-pink-500 text-pink-500 hover:border-pink-600'
              }`}
              onClick={handleHeartClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-all ${isLiked ? 'transform scale-110' : ''}`}
                fill={isLiked ? "#ffffff" : "none"}
                viewBox="0 0 24 24"
                stroke={isLiked ? "#ffffff" : "#ec4899"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Description Section */}
          <div className="p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Mô tả</h2>
            <p
              className="text-gray-600 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: manga.description }}
            />
          </div>

          {/* Chapters Section */}
          <div className="p-4 border-t border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Danh sách chương</h2>
            <ul className="space-y-2">
              {manga.chapters.map((chapter, index) => (
                <li
                  key={chapter._id}
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => {
                    document.getElementById('openChapter').showModal();
                    setCurrentIndex(index);
                  }}
                >
                  Chương {chapter.chapterNumber}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dialog id="openChapter" className="modal">
          <div className="modal-box w-11/12 max-w-5xl flex flex-col items-center">
            {currentIndex !== null && (
              <h3 className="font-bold text-lg">Chapter {manga.chapters[currentIndex].chapterNumber}</h3>
            )}
            {/* {console.log(manga.chapters[currentIndex].pages)} */}
            {currentIndex !== null && (
              <img
                src={manga.chapters[currentIndex].pages}
                alt={`Chapter ${manga.chapters[currentIndex].chapterNumber}`}
                className="rounded-lg mb-4"
              />

            )}

            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <button className="btn">Đóng</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    )
  );
};

export default DetailCard;
