import "../css/GameCard.css";

function GameCard({ data, type }) {
    const isGame = type === "game";
    const maxTitleLength = 28;

    const title =
        data.name.length > maxTitleLength
            ? data.name.slice(0, maxTitleLength) + "..."
            : data.name;

    return (
        <div className="card h-100 w-100 custom-card">
            <img src={data.image} className="card-img-top custom-img" alt={title} />

            <div className="card-body">
                <div className="card-top">
                    <h2 className="card-title">{title}</h2>
                    <p className="card-text text-truncate-multiline">
                        {data.description}
                    </p>
                </div>

                {!isGame && (

                    <div className="card-bottom">
                        <hr className="divider" />
                        <small className="text-body-secondary close-date">
                            Closes in: {data.datatime_closes}
                        </small>
                    </div>

                )}

            </div>

            <div className="card-footer border-0">
                {isGame ? (

                    <button className="btn btn-info w-100">
                        Vote
                    </button>

                ) : (

                <strong>Enter Voting Booth →</strong>
                
                )}
            </div>
        </div>
    );
}

export default GameCard;