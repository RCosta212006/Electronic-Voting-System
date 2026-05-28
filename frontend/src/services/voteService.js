import { getAccessToken } from "./authService";

const API_URL = "http://localhost:8000";

export async function voteForGame({ categoryId, gameId }) {
    const token = getAccessToken();

    if (!token) {
        throw new Error("Tens de iniciar sessao para votar.");
    }

    const response = await fetch(
        `${API_URL}/categories/${categoryId}/games/${gameId}/vote`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        const message =
            data.detail === "Ja votaste nesta categoria"
                ? "Já votaste nesta categoria"
                : data.detail || "Nao foi possivel registar o voto.";

        throw new Error(message);
    }

    return data;
}
