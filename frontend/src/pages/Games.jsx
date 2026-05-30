import GameList from "../components/GameList";
import LowScrollBar from "../components/LowScrollBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { voteForGame } from "../services/voteService";
import "../css/Games.css";

function Games() {
    const { categoryId } = useParams();

    const [games, setGames] = useState([]);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [voteMessage, setVoteMessage] = useState("");
    const [voteError, setVoteError] = useState("");

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

                const categoriesResponse = await fetch("http://localhost:8000/categories/");
                const categoriesData = await categoriesResponse.json();

                if (!categoriesResponse.ok) {
                    throw new Error(categoriesData.detail || "Erro ao carregar categorias.");
                }

                setCategories(categoriesData);

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

    useEffect(() => {
        if (!voteMessage && !voteError) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setVoteMessage("");
            setVoteError("");
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [voteMessage, voteError]);

    useEffect(() => {
        if (!category || category.is_closed) {
            return;
        }

        const closingTime = new Date(category.datetime_closes).getTime();
        if (Number.isNaN(closingTime) || closingTime <= Date.now()) {
            setCategory((currentCategory) =>
                currentCategory ? { ...currentCategory, is_closed: true } : currentCategory
            );
            return;
        }

        const timeoutId = setTimeout(() => {
            setCategory((currentCategory) =>
                currentCategory ? { ...currentCategory, is_closed: true } : currentCategory
            );
        }, closingTime - Date.now() + 1000);

        return () => clearTimeout(timeoutId);
    }, [category]);

    async function handleVote(event, gameId) {
        event.preventDefault();
        event.stopPropagation();
        setVoteMessage("");
        setVoteError("");

        if (category?.is_closed) {
            setVoteError("Esta votação já encerrou.");
            return;
        }

        try {
            const vote = await voteForGame({ categoryId, gameId });

            setGames((currentGames) =>
                currentGames.map((game) =>
                    game.id === gameId
                        ? { ...game, vote_count: vote.vote_count }
                        : game
                )
            );
            setVoteMessage("Voto registado com sucesso.");
        } catch (err) {
            setVoteError(err.message);
        }
    }

    return (
        <>
            <div className="page-header">
                <h1>
                    {category ? category.name : "Jogos"}
                </h1>

                {category && (
                    <p className="text-muted">
                        {category.description}
                    </p>
                )}
            </div>

            <div className="page-container games-page-container">
                <div className="games-content">
                {loading && <p>A carregar jogos...</p>}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {voteMessage && (
                    <div className="alert alert-success">
                        {voteMessage}
                    </div>
                )}

                {voteError && (
                    <div className="alert alert-danger">
                        {voteError}
                    </div>
                )}

                {!loading && !error && games.length === 0 && (
                    <p>Não existem jogos nesta categoria.</p>
                )}

                {!loading && !error && games.length > 0 && (
                    <GameList
                        games={games}
                        onVote={handleVote}
                        votingDisabled={category?.is_closed}
                    />
                )}

                </div>

                <div className="games-bottom-nav">
                    <LowScrollBar
                        categories={categories}
                        currentCategoryId={categoryId}
                    />
                </div>
            </div>
        </>
    );
}

export default Games;
