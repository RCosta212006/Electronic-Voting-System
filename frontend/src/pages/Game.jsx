import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Game.css";

function Game() {
    const { gameId } = useParams();

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadGame() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`http://localhost:8000/games/${gameId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.detail || "Erro ao carregar jogo.");
                }

                setGame(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (gameId) {
            loadGame();
        }
    }, [gameId]);

    if (loading) {
        return (
            <main className="game-detail-page">
                <p>A carregar jogo...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="game-detail-page">
                <div className="alert alert-danger">
                    {error}
                </div>
            </main>
        );
    }

    if (!game) {
        return (
            <main className="game-detail-page">
                <p>Jogo não encontrado.</p>
            </main>
        );
    }

    return (
        <main className="game-detail-page">

            <section className="game-hero">
                <img src={game.image} alt={game.name} className="game-hero-image"/>

                <div className="game-hero-content">
                    <div className="game-meta">
                        <span>Action Adventure</span>
                        <span>2026 Nominee</span>
                    </div>

                    <h1>{game.name}</h1>

                    <div className="game-info-row">
                        <span>Developer: {game.developer || "Unknown Studio"}</span>
                        <span>Platforms: {game.platforms || "PC, PS5, Xbox"}</span>
                    </div>
                </div>
            </section>

            <section className="game-main-grid">

                <div className="game-main-content">

                    <section className="game-section">
                        <h2>About the Game</h2>

                        <p>
                            {game.description}
                        </p>

                        <p>
                            This section can later include a longer description,
                            game mechanics, story details, release information and
                            voting context.
                        </p>
                    </section>

                    <section className="game-section">
                        <h2>Nominated For</h2>
                        <div className="nomination-grid">
                            {game.categories && game.categories.length > 0 ? (
                                game.categories.map((category) => (
                                    <div className="nomination-card" key={category.id}>
                                        {category.name}
                                    </div>
                                ))
                            ) : (
                                <p>Este jogo ainda não está associado a categorias.</p>
                            )}
                        </div>
                    </section>

                </div>

                <aside className="game-sidebar">
                    <div className="vote-panel">
                        <button className="btn btn-info w-100">
                            Cast Vote
                        </button>
                    </div>

                    <div className="release-panel">
                        <div>
                            <span>Release Date</span>
                            <strong>{game.release_date || "N/A"}</strong>
                        </div>

                        <div>
                            <span>User Score</span>
                            <strong>{game.user_score || "N/A"}</strong>
                        </div>

                        <div>
                            <span>Game Consensus</span>
                            <strong>{game.consensus || "Masterpiece"}</strong>
                        </div>
                    </div>
                </aside>

            </section>

        </main>
    );
}

export default Game;