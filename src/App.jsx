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
          <h1>
            Find<span className="text-gradient"> animes</span> you love
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2>All movies</h2>
          {/* Display loading, error, or anime results */}
          {loading && <p className="text-center text-white">Loading...⏳</p>}
          {error && <p className="text-center text-red-500">Error: {error} 😢</p>}
        </section>


        {/* Display anime list */}
        <div className="anime-grid">
          {animeList.map((anime) => (
            <div key={anime.id} className="anime-card">
              <img
                src={anime.attributes.posterImage?.original}
                alt={anime.attributes.canonicalTitle}
                className="anime-poster"
              />
              <h2 className="anime-title text-white">{anime.attributes.canonicalTitle}</h2>
              <p className="anime-synopsis text-white">{anime.attributes.synopsis}</p>
              <p className="anime-rating text-white">
                Rating: {anime.attributes.averageRating}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;