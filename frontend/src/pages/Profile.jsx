import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
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
  }, [navigate]);

  // Hiển thị loading khi chưa có dữ liệu
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
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
    </div>
  );
};

export default Profile;
