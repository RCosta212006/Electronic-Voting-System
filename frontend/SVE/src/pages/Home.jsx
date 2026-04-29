import GameCategoryList from "../components/GameCategoryList";
import whiteHouse from "../images/WhiteHouse.jpg";

function Home() {
    const categories = [
        {
            id: 1,
            name: "Melhor Jogo de Acção",
            image: whiteHouse,
            description: "Vota no melhor jogo de acção.",
            datatime_closes: " 3 days",
        },
        {
            id: 2,
            name: "Melhor Jogo de Aventura",
            image: whiteHouse,
            description: "Escolhe o jogo de aventura que mais se destacou.",
            datatime_closes: " 10 days",
        },
        {
            id: 3,
            name: "Jogo do Ano",
            image: whiteHouse,
            description: "A categoria principal com os melhores jogos nomeados.",
            datatime_closes: " 20 days",
        },
    ];

    return (
    <>
        <h1 className="text-center my-4">Categorias</h1>
        <GameCategoryList categories={categories} />
    </>
    );
}


export default Home;