import { useEffect, useState } from "react";
import Movieslist from "./Movieslist.jsx";

const Home = () => {

    let [movies , setMovies] = useState(null);
    let [actionmovies , setActionMovies] = useState(null);
    let [topmovies , setTopMovies] = useState(null);
    let [dramamovies , setDramaMovies] = useState(null);
    let [error , setError] = useState(null);
    let [pending , setPending] = useState(true);
    

    useEffect(()=>{

        if( localStorage.getItem("fav")===null )
        {
            localStorage.setItem("fav" , "[]")
        }

        setTimeout(()=>{
            fetch("http://localhost:4000/movies")
            .then((res)=>{ return res.json() })
            .then((data)=>{ 
               setActionMovies( data.filter((movie)=>{return movie.genre.includes("action") }))
               setTopMovies( data.filter((movie)=>{return movie.rating>8}))
               setDramaMovies( data.filter((movie)=>{return movie.genre.includes("drama") }))
                setMovies(data);
                setPending(false);
                })
            .catch((err)=>{
                setError("404 Network issue !!! please try again later");
                setPending(false);
            })
        } , 3000)
    } , [])


    return ( 
        <div className="w-full h-auto m-auto bg-black  text-white text-center pt-12">   

        {pending===true  &&  <h1>Loading.......</h1>}

        {error && <h1> {error} </h1>}

        {movies && <Movieslist movies={movies} title="All movies"/>}

        {movies && <Movieslist movies={actionmovies} title="Action movies"/>}

        {movies && <Movieslist movies={topmovies} title="Top movies"/>}

        {movies && <Movieslist movies={dramamovies} title="Drama movies"/>}



        </div>
     );
}
export default Home;