import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { fetchTrendingMovies } from '../../services/tmdbApi';

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadTrendingMovies() {
            try {
                setLoading(true);
                const data = await fetchTrendingMovies();
                setMovies(data); // data.results zaten dönüyor
            } catch (err) {
                setError('Trend filmler alınırken hata oluştu.');
            } finally {
                setLoading(false);
            }
        }

        loadTrendingMovies();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trending today</h1>
            {loading && <p>Yükleniyor...</p>}
            {error && <p>{error}</p>}
            <ul className={styles.list}>
                {movies.map(({ id, title }) => (
                    <li key={id}>
                        <Link to={`/movies/${id}`}>{title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
