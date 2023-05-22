import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movieslist = ({movies , title}) => 
{
    let[favId , setFavId] = useState([]);
    let[altered , setAltered] = useState(0);

    useEffect(()=>{
        let fav = JSON.parse(localStorage.getItem("fav"));
        setFavId(fav.map((m)=>{return m.id}));
    } , [altered]);

    let add = (movie)=>{ 
       let fav =  JSON.parse(localStorage.getItem("fav"));
       fav.push(movie);
       localStorage.setItem("fav" , JSON.stringify(fav));
       setAltered(altered+1);
    }

    let removeMovie = (id)=>{ 
        let fav =  JSON.parse(localStorage.getItem("fav"));
        fav = fav.filter((m)=>{return m.id!==id })
        localStorage.setItem("fav" , JSON.stringify(fav));
        setAltered(altered+1);
     }

    return ( 
    <div>
        <div className=" w-1/12 h-1  bg-gray-400 inline-block relative bottom-1"></div><h1 className="text-xl text-white mx-14 font-bold inline-block p-4" >{title}</h1><div className="w-1/12 h-1 relative bottom-1  bg-gray-400 inline-block"></div>

        <div className="flex justify-items-center gap-8 overflow-x-scroll mx-10 mb-4 ">
                    {movies.map((movie)=>{
                        return(
                            <div className="h-80 ">

                              {favId.includes(movie.id) ?
                                <button className="remove-btn" onClick={ ()=>{removeMovie(movie.id)} }><i class="fa-solid fa-heart"></i></button> 
                                :
                                <button className="add-btn" onClick={ ()=>{add(movie)} }><i class="fa-regular fa-heart "></i></button>}

                                <Link to={`/moviedetails/${movie.id}`}>
                                   <div className="h-44 w-44">
                                    <img src={movie.poster} alt="poster" className="h-60 text-center"/>
                                    <h2>{movie.moviename}</h2>
                                    {/* <p>{movie.genre}</p> */}
                                   </div>
                                    

                                </Link>
                            </div>
                        )
                    })}
        </div>

    </div> );
}
 
export default Movieslist;