import axios from "axios";
import { useState, useEffect } from "react";

const useGetComment = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true); 
     
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get("/api/comment");
                setComments(response.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, []);
    return { comments, loading };
}

export default useGetComment;

