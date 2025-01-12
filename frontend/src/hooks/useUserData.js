import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useUserData = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user/');
                setUser(response.data.data);
            } catch (error) {
                toast.error('Error fetching user data:', error);
            } 
        }
        fetchUser();
    }, []);

    return { user, loading };
}

export default useUserData;