import Home from "./pages/Home";
import ElectionCard from "./components/ElectionCard";
import WhiteHouse from "./images/WhiteHouse.jpg";

function App(){
  // Teste de cartão
  const election = {
    title: "Eleições 2025",
    description: "Descrição da eleição aqui.",
    image: WhiteHouse,
    datatime_closes: "3 days",
  };

  return <div><ElectionCard election={election}></ElectionCard></div>;
}

export default App;