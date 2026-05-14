import CategoryList from "../components/CategoryList";
import GameList from "../components/GameList";
import LowScrollBar from "../components/LowScrollBar";
import NavBar from "../components/NavBar";
import whiteHouse from "../images/WhiteHouse.jpg";

function Categories() {
    
    return (
        <>
            <div className="p-4 mt-0">
                <NavBar/>
                <small>Premiação 2026</small>
                <h1>Categorias</h1>
            </div>

            <div className="container">
                <CategoryList categories={categories} />
            </div>
        </>
    );
}

export default Categories;