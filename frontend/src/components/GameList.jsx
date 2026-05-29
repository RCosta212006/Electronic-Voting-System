import { Link } from "react-router-dom";
import GameCard from "./GameCard";

function GameList({ games, onVote, votingDisabled }) {
    return (
        <div className="row g-4 justify-content-center">
            {games.map((game) => (
                <div className="col-12 col-sm-6 col-lg-4 d-flex" key={game.id}>
                    <Link
                        to={`/game/${game.id}`}
                        className="text-decoration-none w-100"
                    >
                        <GameCard
                            data={game}
                            type="game"
                            onVote={(event) => onVote(event, game.id)}
                            votingDisabled={votingDisabled}
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default GameList;
