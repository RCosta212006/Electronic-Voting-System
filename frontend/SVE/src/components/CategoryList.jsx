import GameCard from "./GameCard";

function CategoryList({ categories }) {
    return (
        <div className="row g-4 justify-content-center">
            {categories.map((category) => (
                <div className="col-12 col-sm-6 col-lg-4 d-flex" key={category.id}>
                    <GameCard data={category} type="category"/>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;