import "./App.css";
import Search from "./components/search";
import { useState, useEffect } from "react";

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL: string = import.meta.env.VITE_TMDB_BASE_URL;

type APIOptions = {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
};

const API_OPTIONS: APIOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovies = async () => {
    try {
      //
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage(() => "Error fetching movies, Please try again later,");
    }
  };

  useEffect(() => {
    // first
    // return () => {
    //   second
    // }
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  );
}

export default App;
