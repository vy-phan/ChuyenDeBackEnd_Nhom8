export const formatDate = (dateString) => {
    const now = new Date();
    const updatedAt = new Date(dateString);
    const diffInSeconds = Math.floor((now - updatedAt) / 1000);
    
    if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else {
        return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    }
};