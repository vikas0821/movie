import { useEffect, useState } from "react";
import Movieslist from "./Movieslist";

const Favorites = () => {

    let[fav , setFav] = useState(null);

    useEffect( ()=>{
     setFav( JSON.parse(localStorage.getItem("fav")) );
    } , [])

    return(
        <div className="h-auto  text-center ">
            {fav && <Movieslist movies={fav} title="Favorites"/>  }
        </div>
    )
}
 
export default Favorites;