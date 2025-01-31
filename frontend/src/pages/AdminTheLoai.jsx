import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCUDGenre } from "../hooks/useCUDGenre";
import toast, { Toaster } from 'react-hot-toast';
import SlideBar from "../compontents/SlideBar";
import useMangaData from "../hooks/useMangaData";

const AdminTheLoai = () => {
  const navigate = useNavigate();
  const { genres, setGenres } = useMangaData();
  const { error, createGenre, updateGenre, deleteGenre } = useCUDGenre();
  const [newGenre, setNewGenre] = useState({ name: "", description: "" });
  const [editGenre, setEditGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Kiểm tra đăng nhập và role admin
    const token = localStorage.getItem('auth-token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      toast.error('Vui lòng đăng nhập để truy cập trang Admin!');
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      toast.error('Bạn không có quyền truy cập trang này!');
      navigate('/');
      return;
    }
  }, [navigate]);

  const handleAddGenre = async () => {
    if (newGenre.name.trim() !== "") {
      setLoading(true);
      try {
        const newGenreData = await createGenre(newGenre);
        toast.success('Thêm thể loại thành công!');
        setNewGenre({ name: "", description: "" });
        // Cập nhật danh sách thể loại
        setGenres(prev => [...prev, newGenreData]);
      } catch (err) {
        toast.error(err.message || 'Có lỗi xảy ra khi thêm thể loại!');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Vui lòng nhập tên thể loại!');
    }
  };

  const handleEditClick = (genre) => {
    setEditGenre(genre);
  };

  const handleUpdateGenre = async () => {
    if (editGenre && editGenre.name.trim() !== "") {
      setLoading(true);
      try {
        const updatedGenre = await updateGenre(editGenre._id, editGenre);
        toast.success('Cập nhật thể loại thành công!');
        setEditGenre(null);
        // Cập nhật danh sách thể loại
        setGenres(prev => prev.map(g => g._id === editGenre._id ? updatedGenre : g));
      } catch (err) {
        toast.error(err.message || 'Có lỗi xảy ra khi cập nhật thể loại!');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteGenre = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thể loại này?");
    if (confirmDelete) {
      setLoading(true);
      try {
        await deleteGenre(id);
        toast.success('Xóa thể loại thành công!');
        // Cập nhật danh sách thể loại
        setGenres(prev => prev.filter(genre => genre._id !== id));
      } catch (err) {
        toast.error(err.message || 'Có lỗi xảy ra khi xóa thể loại!');
      } finally {
        setLoading(false);
      }
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">Lỗi: {error}</div>;
  }

  return (
    <div className="flex">
      <SlideBar />
      <div className="flex-1 p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Quản lý Thể Loại</h2>
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newGenre.name}
              onChange={(e) => setNewGenre({ ...newGenre, name: e.target.value })}
              placeholder="Tên thể loại mới"
              className="input input-bordered w-full max-w-xs"
              disabled={loading}
            />
            <textarea
              value={newGenre.description}
              onChange={(e) => setNewGenre({ ...newGenre, description: e.target.value })}
              placeholder="Miêu tả thể loại"
              className="input input-bordered w-full max-w-xs"
              disabled={loading}
            />
            <button 
              onClick={handleAddGenre}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Thêm'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên thể loại</th>
                  <th>Miêu tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {genres && genres.map((genre, index) => (
                  <tr key={genre._id}>
                    <td>{index + 1}</td>
                    <td>
                      {editGenre && editGenre._id === genre._id ? (
                        <input
                          type="text"
                          value={editGenre.name}
                          onChange={(e) => setEditGenre({ ...editGenre, name: e.target.value })}
                          className="input input-bordered w-full max-w-xs"
                          disabled={loading}
                        />
                      ) : (
                        genre.name
                      )}
                    </td>
                    <td>
                      {editGenre && editGenre._id === genre._id ? (
                        <textarea
                          value={editGenre.description}
                          onChange={(e) => setEditGenre({ ...editGenre, description: e.target.value })}
                          className="input input-bordered w-full max-w-xs"
                          disabled={loading}
                        />
                      ) : (
                        genre.description
                      )}
                    </td>
                    <td>
                      {editGenre && editGenre._id === genre._id ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={handleUpdateGenre}
                            className="btn btn-success btn-sm"
                            disabled={loading}
                          >
                            {loading ? 'Đang lưu...' : 'Lưu'}
                          </button>
                          <button 
                            onClick={() => setEditGenre(null)}
                            className="btn btn-error btn-sm"
                            disabled={loading}
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditClick(genre)}
                            className="btn btn-warning btn-sm"
                            disabled={loading}
                          >
                            Sửa
                          </button>
                          <button 
                            onClick={() => handleDeleteGenre(genre._id)}
                            className="btn btn-error btn-sm"
                            disabled={loading}
                          >
                            {loading ? 'Đang xóa...' : 'Xóa'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminTheLoai;
