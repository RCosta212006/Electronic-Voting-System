import GameCategoryCard from "./GameCategoryCard";

function GameCategoryList({ categories }) {
    return (
        <div className="row g-4 justify-content-center">
            {categories.map((category) => (
                <div className="col-12 col-sm-6 col-lg-4 d-flex" key={category.id}>
                    <GameCategoryCard category={category} />
                </div>
            ))}
        </div>
    );
}

export default GameCategoryList;