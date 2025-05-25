import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/tmdbApi';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getReviews() {
            try {
                setLoading(true);
                const data = await fetchMovieReviews(movieId);
                setReviews(data);
            } catch (err) {
                setError('Yorumlar alınamadı.');
            } finally {
                setLoading(false);
            }
        }

        getReviews();
    }, [movieId]);

    if (loading) return <p className={styles.message}>Yükleniyor...</p>;
    if (error) return <p className={styles.message}>{error}</p>;
    if (reviews.length === 0)
        return <p className={styles.message}>We don't have any reviews for this movie.</p>;

    return (
        <ul className={styles.list}>
            {reviews.map(({ id, author, content }) => (
                <li key={id} className={styles.item}>
                    <h4>{author}</h4>
                    <p>{content}</p>
                </li>
            ))}
        </ul>
    );
}
