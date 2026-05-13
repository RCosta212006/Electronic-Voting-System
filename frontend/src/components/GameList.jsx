import GameCard from "./GameCard";

function GameList({ games }) {
    return (
        <div className="row g-4 justify-content-center">
            {games.map((game) => (
                <div className="col-12 col-sm-6 col-lg-4 d-flex" key={game.id}>
                    <GameCard data={game} type="game"/>
                </div>
            ))}
        </div>
    );
}

export default GameList;