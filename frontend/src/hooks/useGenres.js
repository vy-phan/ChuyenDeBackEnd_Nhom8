// tham số đầu vào là mảng mã thể loại của manga, mảng thể loại 
export const getGenreData = (genreIds, genres) => {
    if (!Array.isArray(genres)) return [];

    return genreIds.map(id => {
        const genre = genres.find(g => g._id === id);
        return genre ? { id: genre._id, name: genre.name } : null;
    }).filter(genre => genre !== null); 
};

export default getGenreData