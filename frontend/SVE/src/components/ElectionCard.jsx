import "../css/ElectionCard.css";
function ElectionCard({election}){
    return(
        <>
            <div className="card h-100 custom-card">
                <img src={election.image} className="card-img-top custom-img" alt="Teste" />

                <div className="card-body">
                    <h2 className="card-title">{election.title}</h2>
                    <p className="card-text text-truncate-multiline">{election.description}</p>
                    <hr className="divider"></hr>
                    <small className="text-body-secondary">Closes in: {election.datatime_closes}</small>
                </div>

                <div className="card-footer border-0">
                    <strong>Enter Voting Booth →</strong>
                </div>
            </div>
        </>
    )
}

export default ElectionCard;