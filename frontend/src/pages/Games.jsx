import GameList from "../components/GameList";
import LowScrollBar from "../components/LowScrollBar";

function Games(){
    const games = [
        {
            id: 1,
            name: "Elden Ring",
            description: "An open-world action RPG developed by FromSoftware.",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e"
        },
        {
            id: 2,
            name: "God of War Ragnarök",
            description: "Kratos and Atreus face the end of the Norse world.",
            image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8"
        },
        {
            id: 3,
            name: "Cyberpunk 2077",
            description: "A futuristic RPG set in the sprawling Night City.",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420"
        },
        {
            id: 4,
            name: "The Legend of Zelda: Tears of the Kingdom",
            description: "A massive adventure across the skies and lands of Hyrule.",
            image: "https://images.unsplash.com/photo-1511882150382-421056c89033"
        },
        {
            id: 5,
            name: "Baldur's Gate 3",
            description: "A story-rich RPG based on the world of Dungeons & Dragons.",
            image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e"
        },
        {
            id: 6,
            name: "Hogwarts Legacy",
            description: "Experience life as a student at Hogwarts School.",
            image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6"
        }
    ];

    return (
        <>
            <div className="p-4 mt-0">
                <small>Premiação 2026</small>
                <h1>Jogos</h1>
            </div>

            <div className="container">
                <GameList games={games}/>
                <LowScrollBar></LowScrollBar>
            </div>
        </>
    );
}

export default Games;