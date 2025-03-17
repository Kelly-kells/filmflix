import { useState, useEffect } from 'react';
import Search from './components/Search';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animeList, setAnimeList] = useState([]); // To store anime data
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  // Function to fetch anime data from Kitsu API
  const fetchAnime = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://kitsu.io/api/edge/anime?filter[text]=${query}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimeList(data.data); // Set the anime data
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch anime data when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      fetchAnime(searchTerm);
    } else {
      setAnimeList([]); // Clear the list if searchTerm is empty
    }
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
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Display loading, error, or anime results */}
        {loading && <p className="text-center">Loading...⏳</p>}
        {error && (
          <p className="text-center text-red-500">Error: {error} 😢</p>
        )}

        {/* Display anime list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {animeList.map((anime) => (
            <div
              key={anime.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2"
            >
              {/* Image with fixed height and object-cover */}
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={anime.attributes.posterImage?.original || 'https://via.placeholder.com/300'}
                  alt={anime.attributes.canonicalTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {anime.attributes.canonicalTitle}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {anime.attributes.synopsis}
                </p>
                <p className="text-yellow-600 font-bold">
                  Rating: {anime.attributes.averageRating}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;