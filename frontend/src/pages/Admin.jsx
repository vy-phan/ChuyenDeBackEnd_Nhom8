import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SlideBar from "../compontents/SlideBar";
import useMangaData from "../hooks/useMangaData";
import { formatDate } from "../utils/dataFomat";
import getGenreData from "../hooks/useGenres";
import Status from "../compontents/Status";
import useCUDManga from "../hooks/useCUDManga";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { addManga, updateManga, deleteManga } = useCUDManga();
  const [manga, setManga] = useState({
    title: '',
    status: '',
    poster: '',
    description: '',
    genres: [],
    chapters: [],
  });
  const [selectedMangaId, setSelectedMangaId] = useState(null)
  const { mangaData, genres, loading } = useMangaData();
  const { setMangaData } = useMangaData();
  const [selectOPtion, setSelectOption] = useState(1);

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

  // them manga
  const handleAdd = () => {
    setManga({
      title: '',
      status: '',
      poster: '',
      description: '',
      genres: [],
      chapters: [],
    });
    setSelectOption(1);
    document.getElementById('my_modal_4').showModal();
  };

// sua manga 
  const handleEdit = (mangaToEdit) => {
    setSelectedMangaId(mangaToEdit._id);
    setManga(mangaToEdit);
    // console.log(mangaToEdit);
    setSelectOption(2);
    document.getElementById('my_modal_4').showModal();
  };  

  // xoa manga
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa manga này?");
    if (confirmDelete) {
      deleteManga(id).then(() => {
        setMangaData((prev) => prev.filter((manga) => manga._id !== id)); 
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectOPtion === 1) {
      addManga(manga);
      console.log('Thêm manga:', manga);
    } else if (selectOPtion === 2) {
      if (selectedMangaId) {
        updateManga(selectedMangaId, manga);
        console.log('Cập nhật manga:', manga);
      }
    }
    setManga({
      title: '',
      status: '',
      poster: '',
      description: '',
      genres: [],
      chapters: [],
    });
    setSelectedMangaId(null);
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
          <div className="flex min-h-screen ">
            {/* Sidebar */}
            <SlideBar />

            {/* Main Content */}
            <main className="flex-1 p-6 ">
              <Status />
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Hiển thị truyện</h1>
                <button className="btn btn-primary" onClick={handleAdd}>Thêm truyện</button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead >
                    <tr>
                      <th >STT</th>
                      <th >Ảnh</th>
                      <th >Tên truyện</th>
                      <th >Tinh trang</th>
                      <th >Thể loại</th>
                      <th >Số chương</th>
                      <th >Ngày cập nhật</th>
                      <th >Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mangaData.map((manga, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/admin/manga/${manga._id}`}>
                            <img src={manga.poster} alt="" className="w-14 h-20" />
                          </Link>
                        </td>
                        <td>
                          <Link to={`/admin/manga/${manga._id}`}>
                            {manga.title}
                          </Link>
                        </td>
                        <td>{manga.status}</td>
                        <td>{getGenreData(manga.genres, genres).map((genre) => (
                          <div key={genre.id} className="badge badge-outline">
                            {genre.name}
                          </div>
                        ))}</td>
                        <td>{manga.chapters.length}</td>
                        <td>{formatDate(manga.updatedAt)}</td>
                        <td>
                          <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEdit(manga)}>Sửa</button>
                          <button className="btn btn-error btn-sm mx-1" onClick={() => handleDelete(manga._id)}>Xóa</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>


            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">{selectOPtion === 1 ? 'Thêm truyện' : 'Sửa truyện'}</h3>
                <p className="py-4">
                  <form action="" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Left Column: Inputs and Select */}
                      <div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Tên truyện</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Tên truyện"
                            className="input input-bordered input-primary w-full"
                            value={manga.title}
                            onChange={(e) => setManga({ ...manga, title: e.target.value })} />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Tình trạng</span>
                          </label>
                          <select
                            className="select select-primary w-full"
                            value={manga.status}
                            onChange={(e) => {
                              setManga({ ...manga, status: e.target.value });
                            }}
                          >
                            {/* Loại bỏ `selected` */}
                            <option value="Đang tiến hành">Đang tiến hành</option>
                            <option value="Đã hoàn thành">Đã hoàn thành</option>
                          </select>
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Poster</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ảnh Url"
                            className="input input-bordered input-primary w-full"
                            value={manga.poster}
                            onChange={(e) => setManga({ ...manga, poster: e.target.value })} />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Mô tả</span>
                          </label>
                          <textarea
                            placeholder="Mô tả"
                            className="textarea textarea-bordered textarea-info textarea-lg w-full"
                            value={manga.description}
                            onChange={(e) => setManga({ ...manga, description: e.target.value })}></textarea>
                        </div>
                      </div>

                      {/* Right Column: Genres Checkbox */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Thể loại</span>
                        </label>
                        <div className="form-control">
                          {genres.map((genre) => (
                            <label key={genre._id} className="label cursor-pointer">
                              <span className="label-text">{genre.name}</span>
                              <input
                                type="checkbox"
                                checked={manga.genres.includes(genre._id)}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const updatedGenres = isChecked
                                    ? [...manga.genres, genre._id]
                                    : manga.genres.filter((id) => id !== genre._id);
                                  setManga({ ...manga, genres: updatedGenres });
                                }}
                                className="checkbox checkbox-info"
                              />

                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="mt-5 btn btn-outline btn-primary" onClick={handleSubmit}>{selectOPtion === 1 ? 'Thêm' : 'Sửa'}</button>
                    </div>
                  </form>
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
                    <button className="btn">Đóng</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;