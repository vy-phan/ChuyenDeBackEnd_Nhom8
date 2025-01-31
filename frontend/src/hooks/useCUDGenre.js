import axios from 'axios';
import { useState } from 'react';

export const useCUDGenre = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGenres = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/genre');
            setGenres(response.data.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to fetch genres');
        } finally {
            setLoading(false);
        }
    };

    const createGenre = async (genre) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/genre', genre);
            const newGenre = response.data.data;
            setGenres(prevGenres => [...prevGenres, newGenre]);
            return newGenre;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to create genre');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateGenre = async (id, genre) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`/api/genre/${id}`, genre);
            const updatedGenre = response.data.data;
            setGenres(prevGenres => 
                prevGenres.map(g => g._id === id ? updatedGenre : g)
            );
            return updatedGenre;
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to update genre');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteGenre = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`/api/genre/${id}`);
            if (response.data.success) {
                setGenres(prevGenres => prevGenres.filter(g => g._id !== id));
                return true;
            } else {
                throw new Error(response.data.message || 'Failed to delete genre');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to delete genre');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        genres,
        loading,
        error,
        fetchGenres,
        createGenre,
        updateGenre,
        deleteGenre,
    };
};

export default useCUDGenre;