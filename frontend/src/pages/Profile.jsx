import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/dataFomat.js';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [readingHistory, setReadingHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token xác thực
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Lấy thông tin user từ localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      navigate('/login');
    }

    // Lấy lịch sử đọc truyện
    const history = JSON.parse(localStorage.getItem('readingHistory') || '[]');
    setReadingHistory(history);
  }, [navigate]);

  // Hiển thị loading khi chưa có dữ liệu
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Thông tin cá nhân</h1>
        
        <div className="space-y-4">
          <div className="border-l-2 border-gray-300 pl-4">
            <p className="text-gray-600">Họ và tên:</p>
            <p className="font-semibold text-gray-800 hover:text-blue-500 cursor-pointer">{user.username}</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-4">
            <p className="text-gray-600 ">Email:</p>
            <p className="font-semibold text-gray-800 hover:text-blue-500 cursor-pointer">{user.email}</p>
          </div>

          {user.role === 'admin' && (
            <div className="border-l-2 border-gray-300 pl-4">
              <p className="text-gray-600">Vai trò:</p>
              <Link to="/admin">
                <p className="font-semibold text-gray-800 hover:text-blue-500 cursor-pointer">{user.role}</p>
              </Link>
            </div>
          )}
          
          {user?.isVerified && (
            <div className="border-l-2 border-gray-300 pl-4">
              <p className="text-gray-600 hover:text-blue-500 cursor-pointer"><strong>Email đã được xác thực</strong></p>
            </div>
          )}
        </div>
      </div>

      {/* Reading History Section */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Lịch sử đọc truyện</h2>
        
        {readingHistory.length === 0 ? (
          <p className="text-gray-600 text-center">Chưa có lịch sử đọc truyện</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {readingHistory.map((manga, index) => (
              <Link 
                to={`/manga/${manga.mangaId}`} 
                key={index}
                className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <div className="relative pb-[140%]">
                  <img 
                    src={manga.poster} 
                    alt={manga.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-xs text-white">
                      {formatDate(manga.lastReadAt)}
                    </p>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 hover:text-blue-500 line-clamp-2 text-sm sm:text-base">
                    {manga.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
