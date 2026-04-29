import Home from "./pages/Home";
import WhiteHouse from "./images/WhiteHouse.jpg";
import GameCategoryCard from "./components/GameCategoryCard";

function App(){
  // Teste de cartão
  const game = {
    title: "Soundtrack Award",
    description: "This award is a test",
    image: WhiteHouse,
    datatime_closes: "3 days",
  };

  return <div><GameCategoryCard game={game}></GameCategoryCard></div>;
}

export default App;