import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SlideBar from '../compontents/SlideBar';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

const DetailAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectOption, setSelectOption] = useState(1);
  const [selectedChapter, setSelectedChapter] = useState({ chapterNumber: '', pages: '' });

  // Kiểm tra đăng nhập và role admin
  useEffect(() => {
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
      navigate('/'); // Chuyển về trang chủ
      return;
    }
  }, [navigate]);

  // Fetch Manga Details
  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const response = await axios.get(`/api/manga/${id}`);
        setManga(response.data.data);
      } catch (err) {
        setError('Can not fetch manga');
      } finally {
        setLoading(false);
      }
    };

    fetchMangaDetails();
  }, [id]);

  if (error) {
    return toast.error(error);
  }

  // Cập nhật manga (gồm chapters)
  const updateManga = async (updatedManga) => {
    try {
      const response = await axios.put(`/api/manga/${id}`, updatedManga);
      setManga((prev) => ({ ...prev, ...response.data.data })); // Cập nhật state manga
      toast.success('Cập nhật manga thành công');
    } catch (err) {
      toast.error('Cập nhật manga thất bại');
    }
  };


  // Thêm chương
  const handleAdd = () => {
    setSelectOption(1);
    setSelectedChapter({ chapterNumber: manga.chapters.length + 1, pages: '' });
    document.getElementById('my_modal_4').showModal();
  };

  // Sửa chương
  const handleEdit = (chapter) => {
    setSelectOption(2);
    setSelectedChapter(chapter);
    document.getElementById('my_modal_4').showModal();
  };

  // Xóa chương
  const handleDelete = async (chapterNumber) => {
    const updatedChapters = manga.chapters.filter((chapter) => chapter.chapterNumber !== chapterNumber);
    await updateManga({ ...manga, chapters: updatedChapters });
    setManga((prev) => ({ ...prev, chapters: updatedChapters })); // Đảm bảo state được cập nhật ngay
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedChapters = [...manga.chapters];
    if (selectOption === 1) {
      updatedChapters.push(selectedChapter);
    } else if (selectOption === 2) {
      const index = updatedChapters.findIndex((ch) => ch.chapterNumber === selectedChapter.chapterNumber);
      updatedChapters[index] = selectedChapter;
    }

    await updateManga({ ...manga, chapters: updatedChapters });
    document.getElementById('my_modal_4').close();
  };

  return (
    <>
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
      
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <SlideBar />
            <div className="container mx-auto p-6">
              <div>
                <Link to={"/admin"}>
                  <button className="btn btn-outline btn-accent mb-5" >
                    <FaRegArrowAltCircleLeft size={24} /> 
                  </button>
                </Link>
              </div>
              <h2 className="text-2xl font-bold mb-5">{manga.title}</h2>
              <div className="flex justify-end">
                <button className="btn btn-primary" onClick={handleAdd}>Thêm chương</button>
              </div>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Danh sách chương</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {manga?.chapters?.length > 0 ? (
                    manga.chapters.map((chapter, index) => (
                      <tr key={chapter.chapterNumber} className="hover:bg-gray-100 text-center">
                        <td>{index + 1}</td>
                        <td>Chương {chapter.chapterNumber}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm mx-1"
                            onClick={() => handleEdit(chapter)}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn btn-error btn-sm mx-1"
                            onClick={() => handleDelete(chapter.chapterNumber)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">Không có chương nào</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>

          {/* Modal */}
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-xl">
              <h3 className="font-bold text-lg">{selectOption === 1 ? 'Thêm chương' : 'Sửa chương'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Chương Số</span>
                    </label>
                    <input
                      type="number"
                      value={selectedChapter.chapterNumber}
                      onChange={(e) => setSelectedChapter({ ...selectedChapter, chapterNumber: parseInt(e.target.value, 10) })}
                      className="input input-bordered input-primary w-full"
                      disabled={selectOption === 2} // Không cho sửa chapterNumber khi edit
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">URL Chương</span>
                    </label>
                    <input
                      type="text"
                      value={selectedChapter.pages}
                      onChange={(e) => setSelectedChapter({ ...selectedChapter, pages: e.target.value })}
                      className="input input-bordered input-primary w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <button className="btn btn-outline btn-primary">{selectOption === 1 ? 'Thêm' : 'Sửa'}</button>
                </div>
              </form>
              <div className="modal-action">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_4').close()}>✕</button>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
};

export default DetailAdmin;
