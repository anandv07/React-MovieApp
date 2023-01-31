import {useEffect, useState} from "react";

import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL ="http://www.omdbapi.com?apikey=5268bfcd";

// const movie1 = 
//     {
//         "Title": "Interstellar",
//         "Year": "2014",
//         "imdbID": "tt0816692",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
//     }

const App = ()=>{
    const [movies,setmovies] = useState();
    const [searchTerm,setsearchTerm] = useState();
    const searchMovies = async (title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setmovies(data.Search);

    }
    useEffect(()=>{
        searchMovies('Interstellar');
    },[]);



    return (
        <div className="app">
            <h1>MovieSearch</h1>

            <div className="search">
                <input 
                placeholder="Search For movies"
                value={searchTerm}
                onChange={(e)=>{setsearchTerm(e.target.value)}}
                />
                <img src={SearchIcon} 
                alt="search"
                onClick={()=>{searchMovies(searchTerm)}}
                />
            </div>

            {
                movies?.length > 0
                ?(  
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
            ): (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
            }

            
        </div>
    );
}
export default App;