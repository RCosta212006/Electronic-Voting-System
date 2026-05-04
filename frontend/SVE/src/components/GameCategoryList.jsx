import GameCategoryCard from "./GameCategoryCard";

function GameCategoryList({ categories }) {
    return (
        <div className="container my-4">
            <div className="row g-4">
                {categories.map((category) => (
                    <div className="col-12 col-sm-6 col-lg-4 d-flex" key={category.id}>
                        <GameCategoryCard category={category} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameCategoryList;