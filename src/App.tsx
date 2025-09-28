import "./App.css";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import fetchMovies from "./FetchMovies";
import type { movie } from "./interfaces/movie.types.ts";
import { useState, useEffect } from "react";
import { useDebounce } from "react-use";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const debounceDelay: number = 3000; // milliseconds
  
  // Debounce search term input to avoid excessive API calls
  // by waiting for the user to stop typing for X milliseconds
  useDebounce(() => setDebouncedSearchTerm(searchTerm), debounceDelay, [searchTerm]);

  useEffect(() => {
    // first
    fetchMovies(
      setIsLoading,
      setErrorMessage,
      setMovieList,
      debouncedSearchTerm
    );
    // return () => {
    //   second
    // }
  }, [debouncedSearchTerm]);

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
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie: movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  );
};

export default App;
