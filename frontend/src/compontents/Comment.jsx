import React, { useState, useEffect } from 'react';
import { useCD_Comment } from '../hooks/useCD_Comment';
import useGetComment from '../hooks/useGetComment';
import useUserData from '../hooks/useUserData';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/dataFomat';

const Comment = () => {
  const { id } = useParams();
  const { createComment, deleteComment } = useCD_Comment();
  const { comments, loading, fetchComments } = useGetComment();
  const { user, loading: loadingUser } = useUserData();


  const [newComment, setNewComment] = useState('');
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsers(JSON.parse(storedUser));
    }
    fetchComments();
  }, [fetchComments]);

  // console.log("User name  : ", users);


  // const userComments = comments.filter(cmt => cmt.mangaId === id).map((cmt) => );
  // console.log("Coment ne : ", userComments);


  const handleAddComment = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để bình luận!');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Bình luận không được để trống!');
      return;
    }

    try {
      await createComment({ content: newComment, mangaId: id, userId: users._id });
      setNewComment('');
      toast.success('Bình luận đã được đăng!');
      fetchComments(); // Gọi lại API để cập nhật bình luận mới
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success('Đã xóa bình luận!');
      fetchComments(); // Gọi lại API để cập nhật danh sách bình luận
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa bình luận!');
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-lg font-semibold mb-4">Bình luận</h2>

      {/* Form nhập bình luận */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md">
        {/* Input hiện đại, tối giản */}
        <input
          type="text"
          className="border border-gray-300 px-4 py-3 flex-1 rounded-lg text-base font-medium 
               text-gray-900 bg-gray-100 placeholder-gray-500 shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
               transition-all duration-300 ease-in-out"
          placeholder="Nhập bình luận của bạn..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        {/* Nút gửi tinh tế, đẹp mắt */}
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-5 py-3 rounded-lg text-base font-semibold 
               shadow-md transition-all duration-300 ease-in-out 
               hover:bg-blue-600 hover:shadow-lg active:scale-95">
          Gửi
        </button>
      </div>

      {/* {console.log(user?.map(use => use?._id))} */}


      {/* Danh sách bình luận */}
      {loading ? (
        <p>Đang tải bình luận...</p>
      ) : (
        <ul className="space-y-3">
          {comments.length === 0 ? (
            <p className="text-gray-500 flex justify-center py-5">Chưa có bình luận nào.</p>
          ) : (
            <>
              {comments
                .filter(cmt => cmt.mangaId === id) // Chỉ hiển thị bình luận của truyện hiện tại
                .map((cmt) => (
                  <li key={cmt._id} className="p-3 border rounded-lg relative">
                    <p className="text-sm font-semibold">{user?.filter((use) => use?._id === cmt?.userId).map((u) => u?.username)}</p>
                    <p className="text-gray-700">{cmt.content}</p>

                    {/* Hiển thị ngày cập nhật */}
                    <p className="text-gray-500 text-xs">
                      Cập nhật: {formatDate(cmt.updatedAt)}
                    </p>
                    {users && users._id === cmt.userId && (
                      <button
                        onClick={() => handleDeleteComment(cmt._id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                        Xóa
                      </button>
                    )}
                  </li>
                ))}
            </>
          )}

        </ul>
      )}
    </div>
  );
};

export default Comment;
