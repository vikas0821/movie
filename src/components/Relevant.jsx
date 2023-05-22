import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";

const Relevant = ( {genre} ) => {

    let[movies , setMovies] = useState(null);

    useEffect(()=>{
        fetch("http://localhost:4000/movies")
        .then((res)=>{ return res.json()})
        .then((data)=>{setMovies(data)})
    } , [])


    return ( 
    <div className="relevant-movies">

      

        {movies && 
        <Movieslist 
        movies={movies.filter( (m)=>{ return m.genre.includes(genre) })} 
        title="Relevant Movies"/>  }
    
    </div>);
}
 
export default Relevant;