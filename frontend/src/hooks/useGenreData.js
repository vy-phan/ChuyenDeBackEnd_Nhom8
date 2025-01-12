import { useState, useEffect } from "react";
import axios from "axios";

const useFetchGenres = (genreIds) => {
  const [genreData, setGenreData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllGenres = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedGenres = {};
        for (const id of genreIds) {
          if (!genreData[id]) {
            const response = await axios.get(`/genre/${id}`);
            fetchedGenres[id] = response.data.data;
          }
        }
        setGenreData((prev) => ({ ...prev, ...fetchedGenres }));
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError(err.message || "Failed to fetch genres");
      } finally {
        setLoading(false);
      }
    };

    if (genreIds.length > 0) {
      fetchAllGenres();
    }
  }, [genreIds]);

  return { genreData, loading, error };
};

export default useFetchGenres;
