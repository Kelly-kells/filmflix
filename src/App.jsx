import { useState, useEffect } from 'react'
import Search from "./components/Search"


const API_BASE_URL = "https://anime-db.p.rapidapi.com/anime";

const API_KEY = import.meta.env.VITE_anime - db_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState("")

  const [errormessage, setErrorMessage] = useState("")

  const fetchAnime = async () => {
    try{

    } catch (error) {
      console.error(`error fetching movies: ${error}`)
      setErrorMessage("Error fetching movies try again later")
    }
  }

  useEffect(() => {
    console.log(searchTerm)
  }, [searchTerm])


  return (
    <main >
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./header.png" alt="background-image" className="w-screen" />
          <h1>Find<span className="text-gradient"> animes</span> you love  </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  )
}

export default App