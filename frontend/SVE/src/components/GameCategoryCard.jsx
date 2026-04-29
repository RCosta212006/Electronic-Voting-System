import "../css/GameCategoryCard.css";
function GameCategoryCard({category}){
    return(
        <>
            <div className="card h-100 custom-card">
                <img src={category.image} className="card-img-top custom-img" alt="Teste" />

                <div className="card-body">
                    <div className="card-content">
                        <h2 className="card-title">{category.name}</h2>
                        <p className="card-text text-truncate-multiline">{category.description}</p>
                        <div className="card-bottom">
                            <hr className="divider"></hr>
                            <small className="text-body-secondary close-date">Closes in: {category.datatime_closes}</small>
                        </div>
                    </div>
                </div>

                <div className="card-footer border-0">
                    <strong>Enter Voting Booth →</strong>
                </div>
            </div>
        </>
    )
}

export default GameCategoryCard;