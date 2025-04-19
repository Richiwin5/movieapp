// src/services/api.js
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmFlYzJjNjQyOWQzMWVjMTlmN2QyNjFhMWEzMjRiNCIsIm5iZiI6MTc0NTA5NDk1NC4zOCwic3ViIjoiNjgwNDA5MmE2NWMyM2YyNTRlYWNlZTU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.zR_MMR7Yaw4_6DTq4nzdpC-Mm0YDvHZrWpUjtbjKhBw'
  }
});

export const fetchPopularMovies = async () => {
  const res = await api.get('/movie/popular', {
    params: { language: 'en-US', page: 1 }
  });
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await api.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1
    }
  });
  return res.data.results;
};

export default api;
