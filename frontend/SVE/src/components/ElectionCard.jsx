import "../css/ElectionCard.css";
function ElectionCard({election}){
    return(
        <>
            <div className="card h-100 custom-card">
                <img src={election.image} className="card-img-top custom-img" alt="Teste" />

                <div className="card-body">
                    <h5 className="card-title">{election.title}</h5>
                    <p className="card-text text-truncate-multiline">{election.description}</p>
                    <small className="text-body-secondary">Closes in: {election.datatime_closes}</small>
                </div>

                <div className="card-footer">
                    <strong>Enter Voting Booth →</strong>
                </div>
            </div>
        </>
    )
}

export default ElectionCard;