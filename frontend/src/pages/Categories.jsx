import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import NavBar from "../components/NavBar";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true);
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
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    return (
        <>
            <NavBar/>
            <div className="page-header">
                <h1>Categorias</h1>
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