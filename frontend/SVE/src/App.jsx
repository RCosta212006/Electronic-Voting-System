import Home from "./pages/Home";
import WhiteHouse from "./images/WhiteHouse.jpg";
import GameCategoryCard from "./components/GameCategoryCard";
import Categories from "./pages/Categories";
import NavBar from "./components/NavBar";
import LowScrollBar from "./components/LowScrollBar";
import Login from "./pages/Login";

function App(){

  return(
    <div>
      {/*
      <NavBar></NavBar>
      <Categories></Categories>
      <LowScrollBar></LowScrollBar>
      */}
      <Login></Login>
    </div>
  )
}

export default App;