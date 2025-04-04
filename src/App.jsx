import { useState, useEffect } from 'react';
import Search from './components/Search';

const API_BASE_URL = 'https://anime-db.p.rapidapi.com/anime';
const API_KEY = import.meta.env.VITE_ANIME_DB_API_KEY; // Use underscores

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'anime-db.p.rapidapi.com',
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animeList, setAnimeList] = useState([]); // To store anime data
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state

  const fetchAnime = async (query = '') => {
    setLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}?page=1&size=10&search=${query}` // Search endpoint
        : `${API_BASE_URL}?page=1&size=10&sortBy=ranking&sortOrder=asc`; // Default endpoint

      console.log('Fetching from:', endpoint); // Log the endpoint
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API Response:', data); // Log the API response
      setAnimeList(data.data); // Set the anime data
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch anime data when searchTerm changes
  useEffect(() => {
    fetchAnime(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./header.png" alt="background-image" className="w-screen" />
          <h1 className="text-4xl font-bold text-center my-8">
            Find<span className="text-gradient"> animes</span> you love
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section>
          <h2 className="text-2xl font-bold text-center my-6">All Movies</h2>
          {loading && <p className="text-center">Loading...⏳</p>}
          {errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}

          {/* Display anime list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {animeList.map((anime) => (
              <div
                key={anime._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2"
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{anime.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {anime.synopsis}
                  </p>
                  <p className="text-yellow-600 font-bold">
                    Rating: {anime.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;