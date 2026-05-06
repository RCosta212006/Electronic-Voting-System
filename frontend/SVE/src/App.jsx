import Home from "./pages/Home";
import WhiteHouse from "./images/WhiteHouse.jpg";
import GameCategoryCard from "./components/GameCategoryCard";
import Categories from "./pages/Categories";
import NavBar from "./components/NavBar";
import LowScrollBar from "./components/LowScrollBar";

function App(){

  return( 
    <div>
      <NavBar></NavBar>
      <Categories></Categories>
      <LowScrollBar></LowScrollBar>
    </div>
  )
}

export default App;