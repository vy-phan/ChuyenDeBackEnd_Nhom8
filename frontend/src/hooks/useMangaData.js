import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useMangaData = () => {
    const [mangaData, setMangaData] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMangaData = async () => {
            try {
                const response = await axios.get('/api/manga/');
                setMangaData(response.data.data);
            } catch (error) {
                toast.error('Error fetching manga data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchGenreData = async () => {
            try {
                const response = await axios.get('/api/genre');
                setGenres(response.data.data);
            } catch (error) {
                toast.error('Error fetching genre data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMangaData();
        fetchGenreData();
    }, []);

    return { mangaData, genres, setGenres, loading };
};

export default useMangaData; 