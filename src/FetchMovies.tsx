import React from "react";

const API_KEY: string = import.meta.env.VITE_TMCB_API_READ_ACCESS_TOKEN;
const API_BASE_URL: string = import.meta.env.VITE_TMDB_BASE_URL;

// Define the structure of the API options
type APIOptions = {
  method: string;
  headers: {
    accept: string;
    Authorization: string;
  };
};

// Configure the API request Options
const API_OPTIONS: APIOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Fetch movies from the API based on the search term
const fetchMovies = async (
  setIsLoading: (value: React.SetStateAction<boolean>) => void,
  setErrorMessage: (value: React.SetStateAction<string>) => void,
  setMovieList: (value: React.SetStateAction<never[]>) => void,
  searchTerm: string = ""
): Promise<void> => {
  setIsLoading(true); // Start loading
  setErrorMessage(""); // Starts without error
  try {
    // Determine the endpoint based on whether a search term is provided
    const endpoint: string =
      searchTerm.length !== 0
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    // Make the API request
    const response: Response = await fetch(endpoint, API_OPTIONS);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON response (returns a promise)
    const data = await response.json();

    // Handle API-specific errors
    if (data.Response === "False") {
      setErrorMessage(() => data.Error || "Failed to fetch movies"); // Handle API error message
      setMovieList(() => []); // Clear movie list on error
      return;
    }

    // Update the movie list with the fetched data
    setMovieList(() => data.results || []);
  } catch (error) {
    console.error("Error fetching movies:", error);
    setErrorMessage(() => "Error fetching movies, Please try again later,");
  } finally {
    // If success: show movies; If error: show error, no more loading either case
    setIsLoading(false);
  }
};

export default fetchMovies;
