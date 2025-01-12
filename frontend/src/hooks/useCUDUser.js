import axios from "axios";

const useCUDUser = () => {
    const updateUser = async (id, updatedUser) => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.put(`/api/user/favorite/${id}`, updatedUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data.data;
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    }

    return { updateUser };
}

export default useCUDUser;