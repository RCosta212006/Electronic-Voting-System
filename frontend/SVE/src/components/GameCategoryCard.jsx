import "../css/GameCategoryCard.css";

function GameCategoryCard({ category }) {
    const maxTitleLength = 28;

    const title =
        category.name.length > maxTitleLength
            ? category.name.slice(0, maxTitleLength) + "..."
            : category.name;

    return (
        <div className="card h-100 custom-card">
            <img src={category.image} className="card-img-top custom-img" alt={title} />

            <div className="card-body">
                <div className="card-top">
                    <h2 className="card-title">{title}</h2>
                    <p className="card-text text-truncate-multiline">
                        {category.description}
                    </p>
                </div>

                <div className="card-bottom">
                    <hr className="divider" />
                    <small className="text-body-secondary close-date">
                        Closes in: {category.datatime_closes}
                    </small>
                </div>
            </div>

            <div className="card-footer border-0">
                <strong>Enter Voting Booth →</strong>
            </div>
        </div>
    );
}

export default GameCategoryCard;