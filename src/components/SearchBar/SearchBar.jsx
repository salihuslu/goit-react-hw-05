import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSubmit }) {
    const [query, setQuery] = useState('');

    const handleChange = e => {
        setQuery(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            alert('Please enter a movie name.');
            return;
        }

        onSubmit(trimmedQuery);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.input}
                value={query}
                onChange={handleChange}
                autoComplete="off"
                autoFocus
            />
            <button type="submit" className={styles.button}>
                Search
            </button>
        </form>
    );
}

export default SearchBar;
