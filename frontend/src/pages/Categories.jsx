import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadCategories(showLoader = true) {
        try {
            if (showLoader) {
                setLoading(true);
            }
            setError("");

            const response = await fetch("http://localhost:8000/categories/");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Erro ao carregar categorias.");
            }

            setCategories(data);
        } catch (err) {
            setError(err.message);
        } finally {
            if (showLoader) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        const nextClosingCategory = categories
            .filter((category) => !category.is_closed)
            .map((category) => new Date(category.datetime_closes).getTime())
            .filter((closingTime) => !Number.isNaN(closingTime) && closingTime > Date.now())
            .sort((first, second) => first - second)[0];

        if (!nextClosingCategory) {
            return;
        }

        const timeoutId = setTimeout(() => {
            loadCategories(false);
        }, nextClosingCategory - Date.now() + 1000);

        return () => clearTimeout(timeoutId);
    }, [categories]);

    return (
        <>
            <div className="page-header">
                <h1>Game DSA Awards</h1>
                <p>
                    Explore the official categories, follow live voting windows,
                    and enter each award booth to support the standout games.
                </p>
            </div>

            <div className="page-container">
                {loading && <p>A carregar categorias...</p>}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!loading && !error && categories.length === 0 && (
                    <p>Ainda não existem categorias.</p>
                )}

                {!loading && !error && categories.length > 0 && (
                    <CategoryList categories={categories} />
                )}
            </div>
        </>
    );
}

export default Categories;
