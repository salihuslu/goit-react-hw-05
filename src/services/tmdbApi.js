import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmIxMmE5YzA3NTM3NzBlMjU5Zjk1M2I5ODBlM2MwYiIsIm5iZiI6MTc0ODAyNDc3NC4zODMwMDAxLCJzdWIiOiI2ODMwYmRjNjYxZjFmZWZiOGJlYjI1N2IiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2s7nMViwFOSOcJndkOks8uvZ_E_ciAJkRrn6naeW3bo';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: TOKEN,
    },
});

export const fetchTrendingMovies = async () => {
    try {
        const response = await axiosInstance.get('/trending/movie/day');
        return response.data.results;
    } catch (error) {
        // Konsola hata yazdırabilirsin (opsiyonel)
        console.error('API fetchTrendingMovies error:', error);
        throw error; // Hatanın yukarı gitmesini sağla
    }
};


export const searchMovies = async query => {
    try {
        const response = await axiosInstance.get('/search/movie', {
            params: {
                query,
                include_adult: false,
                language: 'en-US',
                page: 1,
            },
        });
        return response.data?.results || [];
    } catch (error) {
        console.error('Arama sırasında hata oluştu:', error);
        return [];
    }
};

export const fetchMovieDetails = async movieId => {
    const response = await axiosInstance.get(`/movie/${movieId}`, {
        params: { language: 'en-US' },
    });
    return response.data;
};

export const fetchMovieCast = async movieId => {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`, {
        params: { language: 'en-US' },
    });
    return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
        params: { language: 'en-US' },
    });
    return response.data.results;
};

export const getImageUrl = path => {
    return `${IMAGE_BASE_URL}${path}`;
};

// const testFetchTrending = async () => {
//     try {
//         const response = await axiosInstance.get('/trending/movie/day');
//         console.log('Test fetch trending:', response.data.results);
//     } catch (error) {
//         console.error('Test fetch error:', error);
//     }
// };
// testFetchTrending();
