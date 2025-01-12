import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

const useCUDManga = () => {
    const [mangaData, setMangaData] = useState([]);

    // POST: Add new manga
    const addManga = async (newManga) => {
        try {
            const response = await axios.post('/api/manga', newManga);
            if (response.data) {
                setMangaData(prev => [...prev, response.data.data]);
                toast.success('Manga added successfully');
                return true;
            }
        } catch (error) {
            console.error('Error adding manga:', error);
            toast.error(error.response?.data?.message || 'Error adding manga');
            return false;
        }
    };

    // PUT: Update existing manga
    const updateManga = async (id, updatedManga) => {
        try {
            const response = await axios.put(`/api/manga/${id}`, updatedManga);
            if (response.data) {
                setMangaData(prev =>
                    prev.map(manga => manga._id === id ? response.data.data : manga)
                );
                toast.success('Manga updated successfully');
                return true;
            }
        } catch (error) {
            console.error('Error updating manga:', error);
            toast.error(error.response?.data?.message || 'Error updating manga');
            return false;
        }
    };

    // DELETE: Remove manga
    const deleteManga = async (id) => {
        try {
            const response = await axios.delete(`/api/manga/${id}`);
            if (response.status === 200) {
                setMangaData(prev => prev.filter(manga => manga._id !== id));
                toast.success('Manga deleted successfully');
                return true;
            }
        } catch (error) {
            console.error('Error deleting manga:', error);
            toast.error(error.response?.data?.message || 'Error deleting manga');
            return false;
        }
    };

    return {
        mangaData,
        setMangaData,
        addManga,
        updateManga,
        deleteManga,
    };
}

export default useCUDManga