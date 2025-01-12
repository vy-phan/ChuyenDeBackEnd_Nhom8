import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useRegister from '../hooks/useRegister';

const Register = () => {
  const { formData, loading, handleChange, handleSubmit } = useRegister();

  return (
    <div className="bg-gradient-to-r animate-gradient-x from-green-500 via-blue-500 to-teal-500 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control mb-4'>
            <label className='label-text'>Email</label>
            <div className='relative'>
              <FaUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Nhập email'
                className='input input-bordered w-full pl-10'
                required
              />
            </div>
          </div>

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
                placeholder="Tạo mật khẩu"
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>

          <div className="text-center mt-4">
            <p>Đã có tài khoản? <Link to="/login" className="text-blue-500">Đăng nhập</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;