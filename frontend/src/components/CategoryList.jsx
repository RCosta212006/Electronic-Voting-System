import { Link } from "react-router-dom";
import GameCard from "./GameCard";

function CategoryList({ categories }) {
    return (
        <div className="row g-4 justify-content-center">
            {categories.map((category) => (
                <div className="col-12 col-sm-6 col-lg-4 d-flex" key={category.id}>
                    <Link to={`/games/${category.id}`} className="text-decoration-none w-100">
                        <GameCard data={category} type="category" />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;