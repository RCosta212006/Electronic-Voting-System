import GameCategoryCard from "./GameCategoryCard";

function GameCategoryList({ categories }) {
    return (
        <div className="container my-4">
            <div className="row g-4 justify-content-center">
                {categories.map((category) => (
                <div className="col-md-4 d-flex" key={category.id}>
                    <GameCategoryCard category={category} />
                </div>
            ))}
            </div>
        </div>
    );
}

export default GameCategoryList;