import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/auth.context';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy email từ localStorage
    const storedEmail = localStorage.getItem('verificationEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Nếu không có email trong localStorage, chuyển về trang đăng ký
      toast.error('Vui lòng đăng ký trước khi xác thực email');
      navigate('/register');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/verify-email', {
        email,
        token: verificationCode
      });

      if (response.data.success) {
        localStorage.removeItem('verificationEmail');
        localStorage.removeItem('verificationEmailExpires');
        toast.success('Email đã được xác thực thành công!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Xác thực thất bại, vui lòng thử lại.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Xác thực Email</h2>
        <p className="text-center text-gray-700 mb-8">
          Chúng tôi đã gửi mã xác thực đến email: <br />
          <span className="font-semibold text-purple-600">{email}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-6">
            <label className="label-text text-gray-900 font-medium mb-2">Mã xác thực</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Nhập mã xác thực từ email"
              className="input input-bordered w-full bg-white/50 text-black border-2 border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all"
              required
            />
          </div>
          <button type="submit" className="btn w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            Xác thực
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;