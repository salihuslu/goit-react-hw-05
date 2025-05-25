import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../services/tmdbApi';
import SearchBar from '../../components/SearchBar/SearchBar';

function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const query = searchParams.get('query') || '';

    useEffect(() => {
        if (!query) return;

        async function fetchMovies() {
            try {
                setLoading(true);
                setError(null);
                const data = await searchMovies(query);
                if (data.length === 0) {
                    setError('No movies were found that match your search criteria.');
                }
                setMovies(data);
            } catch (err) {
                console.error(err);
                setError('An error occurred while searching for movies.');
                setMovies([]);
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, [query]);

    const handleSearch = (newQuery) => {
        if (newQuery.trim() === '') return;
        setSearchParams({ query: newQuery });
    };

    return (
        <div className={styles.container}>
            <SearchBar onSubmit={handleSearch} />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}

export default MoviesPage;
