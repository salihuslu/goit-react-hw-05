import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast, getImageUrl } from '../../services/tmdbApi';
import styles from './MovieCast.module.css';

function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCast() {
            try {
                setLoading(true);
                const data = await fetchMovieCast(movieId);
                setCast(data);
            } catch (err) {
                console.error(err);
                setError('Oyuncular yüklenirken hata oluştu.');
            } finally {
                setLoading(false);
            }
        }

        loadCast();
    }, [movieId]);

    if (loading) return <p className={styles.message}>Yükleniyor...</p>;
    if (error) return <p className={styles.message}>{error}</p>;
    if (cast.length === 0) return <p className={styles.message}>Oyuncu bilgisi bulunamadı.</p>;

    return (
        <ul className={styles.list}>
            {cast.map(({ id, name, character, profile_path }) => (
                <li key={id} className={styles.item}>
                    <img
                        src={profile_path ? getImageUrl(profile_path) : 'https://via.placeholder.com/150x225?text=No+Image'}
                        alt={name}
                        className={styles.image}
                    />
                    <div className={styles.info}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.character}>Karakter: {character}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default MovieCast;
