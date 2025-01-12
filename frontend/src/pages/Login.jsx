import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { formData, loading, handleChange, handleSubmit } = useLogin();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <div className="bg-gradient-to-r animate-gradient-x from-red-500 via-blue-500 to-purple-500 flex items-center justify-center min-h-screen">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
          },
          success: {
            duration: 3000,
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

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
        <form onSubmit={onSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Tên đăng nhập</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nhập tên đăng nhập"
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Mật khẩu</span>
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu của bạn"
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mb-4"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>

          <div className="text-center">
            <p>Bạn chưa có tài khoản? <Link to="/register" className="text-blue-500">Đăng ký tại đây</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;