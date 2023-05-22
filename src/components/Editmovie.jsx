import { useEffect, useRef } from "react";
import {useNavigate, useParams} from 'react-router-dom'

const Editmovie = () => {

    let {id} = useParams();

    let navigate = useNavigate()
    let moviename = useRef();
    let hero = useRef();
    let heroine = useRef();
    let director = useRef();
    let genre = useRef();
    let poster = useRef();
    let trailer = useRef();
    let release = useRef();
    let rating = useRef();
    let synopsis = useRef();
    useEffect(()=>{
        fetch("http://localhost:4000/movies"+id)
        .then((res)=>{ return res.json() })
        .then((data)=>{
             moviename.current.value=data.moviename; 
             hero.current.value=data.hero;
            heroine.current.value=data.heroine;
            director.current.value=data.director;
             genre.current.value=data.genre;
             poster.current.value=data.poster;
            trailer.current.value=data.trailer;
            release.current.value=data.release;
            rating.current.value=data.rating;
             synopsis.current.value=data.synopsis;
         })
    },[id])


    let handleEditMovie = (e)=>{
        e.preventDefault();
        
        // create new movie object
        let updatedMovie = {
            moviename : moviename.current.value,
            hero : hero.current.value,
            heroine : heroine.current.value,
            director : director.current.value,
            languages:[],
            genre:  genre.current.value,
            poster: poster.current.value,
            trailer: trailer.current.value,
            release: release.current.value,
            rating: rating.current.value,
            synopsis: synopsis.current.value
        }
        let options = document.getElementsByName("lang");
        for(let i = 0; i < options.length; i++) 
        {
            if(options[i].checked===true)
            {
                updatedMovie.languages.push( options[i].value )
            }  
        }

        // send the movie obj to the database
        fetch("http://localhost:4000/movies/"+id , 
                                                {
                                                    method : "PUT",
                                                    headers : {"Content-Type": "application/json"},
                                                    body : JSON.stringify(updatedMovie)
                                                })
        .then(()=>{
            alert("movie updated in database");
            navigate("/moviedetails/"+id);
        })
    }

    return ( 
        <div className="add-movie h-full w-1/2 m-auto my-5 border-2 border-white p-5">
            <h1 className="w-full  text-center text-white text-xl">Edit Movie</h1>

            <form className="py-5 text-center" onSubmit={ handleEditMovie }>
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="text" ref={moviename} placeholder="Movie name" />
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="text" ref={hero} placeholder="hero"/>
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="text" ref={heroine} placeholder="heroine"/>
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="text" ref={director} placeholder="Director"/>
                <fieldset>
                    <legend className="text-white sr-only">Select languages</legend>
                    <input className="ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name="lang" value="kannada"/><label className="text-white ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kannada</label>
                    <input className="ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name="lang" value="tamil"/><label className="text-white ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">tamil</label>
                    <input className="ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name="lang" value="telugu"/><label className="text-white ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">telugu</label>
                    <input className="ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name="lang" value="hindi"/><label className="text-white ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">hindi</label>
                    <input className="ml-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name="lang" value="malayalam"/><label className="text-white ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">malayalam</label>
                </fieldset>
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="text" ref={genre} placeholder="Genre" />
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="url" ref={poster} placeholder="Poster"/>
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="url" ref={trailer} placeholder="Trailer link"/>
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="number" min="1950" max="2024" ref={release} placeholder="Realease year"/>
                <input  className="w-full my-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="number" min="1" max="10" step="0.1" ref={rating} placeholder="Ratings : 1 - 10" />
                <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" cols="70" rows="6" ref={synopsis}></textarea>

                <input className= " mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="submit" value="Edit movie"/>
            </form>
        </div>
     );
}
 
export default Editmovie;