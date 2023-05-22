import { useState , useEffect} from "react";
import { Link, useParams } from "react-router-dom";
// import Movieslist from "./Movieslist";
import Relevant from "./Relevant";
import { useNavigate } from "react-router-dom";
// import Addmovie from "./Addmovie";

const Moviedetails = () => {

    let {id} = useParams();
    let navigate = useNavigate();
    let [movie , setMovie] = useState(null);
    let [error , setError] = useState(null);
    let [pending , setPending] = useState(true);

    // let [displayEditbox , setdisplayEditbox] = useState(false);

    
    useEffect(()=>{
        setMovie(null);
        setPending(true);
        setTimeout(()=>{
            fetch("http://localhost:4000/movies/"+ id)
            .then((res)=>{ return res.json() })
            .then((data)=>{ 
                console.log(data);
                setMovie(data);
                setPending(false);
                })
            .catch((err)=>{
                setError("404 Network issue !!! please try again later");
                setPending(false);
            })
        } , 3000)
    } , [id])

    let deleteMovie = ()=>{
        fetch("http://localhost:4000/movies/"+ id , {method : "DELETE"} )
        .then(()=>{ navigate("/") })
    }

    return (
    
     <div className="bg-black text-white" >
        {pending===true  && <div className="loading"></div> }
        {error && <h1> {error} </h1>}
        {movie &&   <div class=" bg-black pb-20 ">
                        <div  class="flex flex-col pt-10 text-white items-center bg-black border border-gray-200 rounded-lg shadow md:flex-row m-auto md:w-4/5 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img class="object-cover w-96 mx-16 rounded-t-lg h-96 md:h-auto md:w-80 md:rounded-none md:rounded-l-lg" src={movie.poster} alt="poster" />
                        <div>
                         <h1 class="mb-2 text-3xl font-bold tracking-tight text-white dark:text-white">Watch Complete movie</h1>
                        <h1 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Movie : {movie.moviename}</h1>
                        <h3 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Actor : {movie.hero}</h3>
                        <p class="mb-3 font-normal text-white dark:text-gray-400">Director : {movie.ditrector}</p> 
                        <p class="mb-3 font-normal text-white dark:text-gray-400">Languages : {movie.languages.join(" , ")}</p>
                        <p class="mb-3 font-normal text-white dark:text-gray-400">Genre : {movie.genre}</p>
                        <h3 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Story Line : </h3>
                        <p class="mb-3 font-normal text-white dark:text-gray-400">{movie.synopsis}</p>
                        <div>
                        <button onClick={deleteMovie} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
                        <Link to={`/edit/${movie.id}`}><button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Update</button></Link>
                         
                        </div>
                        </div>
                        </div>
                        <div className=" m-auto md:w-4/5">
                        <iframe className="m-auto py-10" width="560" height="315" src={movie.trailer} 
                        title="YouTube video player" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen></iframe>
                        </div>
                         
                    </div> }
                   

                    <div  class="text-center text=2xl text-white  font-bold  bg-black border border-gray-200 rounded-lg shadow md:flex-row m-auto md:w-4/5 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        {movie && <Relevant genre={movie.genre}/>}
                       </div>

        

    </div> );
}
 
export default Moviedetails;