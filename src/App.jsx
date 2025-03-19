import { useState, useEffect } from 'react'
import Search from "./components/Search"


const App = () => {
  const [searchTerm, setSearchTerm] = useState("")

 
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