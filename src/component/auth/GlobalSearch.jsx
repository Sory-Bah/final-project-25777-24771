import React, { useEffect, useState } from 'react';

// GlobalSearch Component
const GlobalSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Debounce timer to delay the search request
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                performSearch(query);
            } else {
                setResults([]); // Clear results if input is empty
            }
        }, 500); // Adjust debounce delay time (500ms)

        return () => clearTimeout(timer); // Clean up the timeout on query change
    }, [query]);

    // Function to handle the search request
    const performSearch = (query) => {
        setLoading(true);
        setError('');

        fetch('http://localhost:4040/users/search-users?query=' + encodeURIComponent(query))

            .then((response) => response.json())
            .then((data) => {
                setResults(data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error fetching results.');
                setLoading(false);
            });
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update query state on input change
                placeholder="Search users by name, email, or phone..."
                className="search-input"
            />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {results.length === 0 && !loading && !error && query && (
                <p>No results found.</p>
            )}
            <div className="results-container">
                {results.length > 0 && !loading && !error && (
                    <ul>
                        {results.map((user) => (
                            <li key={user.id}>
                                Name: {user.name}, Email: {user.email}, Phone: {user.phoneNumber}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GlobalSearch;
