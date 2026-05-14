import GameList from "../components/GameList";
import LowScrollBar from "../components/LowScrollBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Games() {
    const { categoryId } = useParams();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadGames() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:8000/categories/${categoryId}/games`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.detail || "Erro ao carregar jogos.");
                }

                setGames(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (categoryId) {
            loadGames();
        }
    }, [categoryId]);

    return (
        <>
            <NavBar/>
            <div className="p-4 mt-0">
                <small>Premiação 2026</small>
                <h1>Jogos</h1>
            </div>

            <div className="container">
                {loading && <p>A carregar jogos...</p>}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!loading && !error && games.length === 0 && (
                    <p>Não existem jogos nesta categoria.</p>
                )}

                {!loading && !error && games.length > 0 && (
                    <GameList games={games} />
                )}

                <LowScrollBar />
            </div>
        </>
    );
}

export default Games;