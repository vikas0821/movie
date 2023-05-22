import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Addmovie from "./components/Addmovie";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Moviedetails from "./components/Moviedetails";
import Favorites from "./components/Favorites";
// import "./components/index.css"
// import "./index.css"
import Searchpage from "./components/Searchpage";
import Editmovie from "./components/Editmovie";
import Footer from "./components/Footer";

function App() {
  return (
      <BrowserRouter>
        <div className="bg-black">
          <Navbar/>
          <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/add" element={<Addmovie/>}/>
            <Route path="/moviedetails/:id" element={<Moviedetails/>}/>
            <Route path="/fav" element={<Favorites/>} />
            <Route path="/search/:searchword" element={<Searchpage/>} />
            <Route path="/edit/:id" element={<Editmovie/>}/>

          </Routes>
          <Footer />
        </div>  
      </BrowserRouter>
  );
}

export default App;
