import GameList from "../components/GameList";
import LowScrollBar from "../components/LowScrollBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Games() {
    const { categoryId } = useParams();

    const [games, setGames] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const categoryResponse = await fetch(
                    `http://localhost:8000/categories/${categoryId}`
                );

                const categoryData = await categoryResponse.json();

                if (!categoryResponse.ok) {
                    throw new Error(categoryData.detail || "Erro ao carregar categoria.");
                }

                setCategory(categoryData);

                const gamesResponse = await fetch(
                    `http://localhost:8000/categories/${categoryId}/games`
                );

                const gamesData = await gamesResponse.json();

                if (!gamesResponse.ok) {
                    throw new Error(gamesData.detail || "Erro ao carregar jogos.");
                }

                setGames(gamesData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (categoryId) {
            loadData();
        }
    }, [categoryId]);

    return (
        <>
            <NavBar></NavBar>
            <div className="p-4 mt-0">
                <h1>
                    {category ? category.name : "Jogos"}
                </h1>

                {category && (
                    <p className="text-muted">
                        {category.description}
                    </p>
                )}
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