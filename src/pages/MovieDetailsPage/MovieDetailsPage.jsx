import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../../services/tmdbApi';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadMovieDetails() {
            try {
                const data = await fetchMovieDetails(movieId);
                setMovie(data);
            } catch (err) {
                console.error(err);
                setError('Film detayları alınamadı.');
            }
        }

        loadMovieDetails();
    }, [movieId]);

    if (error) return <p>{error}</p>;
    if (!movie) return <p>Yükleniyor...</p>;

    const { title, poster_path, overview, vote_average, genres } = movie;

    return (
        <div className={styles.container}>
            <button onClick={() => navigate('/')} className={styles.backButton}>
                ← Go back
            </button>

            <div className={styles.details}>
                <img
                    src={getImageUrl(poster_path)}
                    alt={title}
                    className={styles.poster}
                />
                <div className={styles.info}>
                    <h2>{title}</h2>
                    <p><span>User Score:</span> {Math.round(vote_average * 10)}%</p>

                    <p className={styles.label}>Overview</p>
                    <p className={styles.text}>{overview}</p>

                    <p className={styles.label}>Genres</p>
                    <p className={styles.text}>
                        {genres.map((genre) => genre.name).join(', ')}
                    </p>
                </div>
            </div>

            <div className={styles.additional}>
                <h3>Additional Information</h3>
                <ul className={styles.links}>
                    {/* Göreli linkler */}
                    <li><Link to="cast">Cast</Link></li>
                    <li><Link to="reviews">Reviews</Link></li>
                </ul>
            </div>

            {/* Nested routes için outlet */}
            <Outlet />
        </div>
    );
}

export default MovieDetailsPage;
