import React, { useState } from 'react'
import { useCD_Comment } from '../hooks/useCD_Comment'
import useGetComment from '../hooks/useGetComment';

const Comment = () => {
  const { comments, loading, createComment, deleteComment } = useCD_Comment();
  const { comment, loading: commentLoading } = useGetComment();
  const [newComment, setNewComment] = useState('');

  return (
    <div>Comment</div>
  )
}

export default Comment