import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../services/tmdbApi';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
    const { id, title, poster_path } = movie;
    const location = useLocation();

    return (
        <li className={styles.card}>
            <Link to={`/movies/${id}`} state={{ from: location }} className={styles.link}>
                <img
                    src={poster_path ? getImageUrl(poster_path) : 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={title}
                    className={styles.image}
                />
                <h3 className={styles.title}>{title}</h3>
            </Link>
        </li>
    );
}

export default MovieCard;
