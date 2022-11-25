import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';
// use API to access movie data for movie app feature, API Key = 900f2d2d

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=900f2d2d";


function App() {

  const [movies, setMovies] = useState([]);
  const [keyWord, setKeyword] = useState('');
  //function to call movie data 
  const searchMovies = async(title) => { //asynchronized data, takes a while to fetch the movies 

    const response = await fetch(`${API_URL}&s=${title}`)

    const data = await response.json();

    setMovies(data.Search);
  }
  //call movie data on page reload using useEffect
  useEffect(() => {
    searchMovies('Superman'); // call a script of your favorite movie on page load
  }, []);


  return (
    <div className="app">
      <h1>MovieVerse</h1>

      <div className="search">
        <input 
          placeholder="Search for movies"
          value={keyWord}
          onChange={(e) => setKeyword(e.target.value)} 
        />
        <img 
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(keyWord)}
        />
      </div>
      {
        movies.length > 0 
        ? (<div className="container">
              {/* <MovieCard movie1={movie1}/> */}
              {movies.map((movie) => 
                (<MovieCard movie={movie}/>) )}
            </div>
          ) : 
          (
            <div className="empty">
                <h2>No Movies Found!</h2>
            </div>
          ) 
      }
      

    </div>
    
  )
}

export default App;