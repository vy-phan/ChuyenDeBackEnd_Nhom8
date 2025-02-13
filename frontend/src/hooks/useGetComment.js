import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const useGetComment = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true); 

    const fetchComments = useCallback(async () => { // Thêm useCallback để tránh re-render không cần thiết
        try {
            setLoading(true);
            const response = await axios.get("/api/comment");
            setComments(response.data.data);
        } catch (err) {
            console.log("Lỗi khi lấy bình luận:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]); 

    return { comments, loading, fetchComments };
}

export default useGetComment;
