const API_URL = "http://localhost:8000";
const TOKEN_KEY = "sve_access_token";

async function parseResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Ocorreu um erro. Tenta novamente.");
    }

    return data;
}

export async function loginUser({ email, password }) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await parseResponse(response);
    localStorage.setItem(TOKEN_KEY, data.access_token);

    return data;
}

export async function registerUser({ name, email, password }) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    return parseResponse(response);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
    return Boolean(getAccessToken());
}

export function logoutUser() {
    localStorage.removeItem(TOKEN_KEY);
}
