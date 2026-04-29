import "../css/GameCategoryCard.css";
function GameCategoryCard({game}){
    return(
        <>
            <div className="card h-100 custom-card">
                <img src={game.image} className="card-img-top custom-img" alt="Teste" />

                <div className="card-body">
                    <h2 className="card-title">{game.title}</h2>
                    <p className="card-text text-truncate-multiline">{game.description}</p>
                    <hr className="divider"></hr>
                    <small className="text-body-secondary">Closes in: {game.datatime_closes}</small>
                </div>

                <div className="card-footer border-0">
                    <strong>Enter Voting Booth →</strong>
                </div>
            </div>
        </>
    )
}

export default GameCategoryCard;