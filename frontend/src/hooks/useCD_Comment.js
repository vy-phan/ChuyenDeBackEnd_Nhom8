import axios from "axios";
import { useState, useEffect } from "react";

export const useCD_Comment = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('auth-token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    };

    const createComment = async (comment) => {
        try {
            const response = await axios.post("/api/comment/", comment, getAuthHeaders());
            setComments([...comments, response.data.data]);
        } catch (err) {
            console.log(err);
        }
    };
    
    const deleteComment = async (id) => {
        try {
            await axios.delete(`/api/comment/${id}`, getAuthHeaders());
            setComments(comments.filter(comment => comment._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return { comments, loading, createComment, deleteComment };
}

export default useCD_Comment;