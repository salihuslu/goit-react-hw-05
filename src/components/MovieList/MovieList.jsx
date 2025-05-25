import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
    return (
        <ul className={styles.list}>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
    );
}

export default MovieList;
