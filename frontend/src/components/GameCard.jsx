import { useEffect, useState } from "react";
import "../css/GameCard.css";

function getCountdown(datetimeCloses) {
    const closesAt = new Date(datetimeCloses).getTime();
    const difference = closesAt - Date.now();

    if (!datetimeCloses || Number.isNaN(closesAt) || difference <= 0) {
        return "Voting closed";
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
}

function GameCard({ data, type, onVote, votingDisabled }) {
    const isGame = type === "game";
    const [countdown, setCountdown] = useState(
        getCountdown(data.datetime_closes)
    );
    const maxTitleLength = 28;

    useEffect(() => {
        if (isGame) {
            return;
        }

        setCountdown(getCountdown(data.datetime_closes));

        const intervalId = setInterval(() => {
            setCountdown(getCountdown(data.datetime_closes));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [data.datetime_closes, isGame]);

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
                        {data.is_closed ? (
                            <small className="text-body-secondary close-date">
                                Winner: {data.winner ? `${data.winner.name} (${data.winner.vote_count} votes)` : "No votes yet"}
                            </small>
                        ) : (
                            <small className="text-body-secondary close-date">
                                Closes in: {countdown}
                            </small>
                        )}
                    </div>

                )}

            </div>

            <div className="card-footer border-0">
                {isGame ? (
                    <>
                        <small className="d-block text-center text-body-secondary mb-2">
                            Votes: {data.vote_count || 0}
                        </small>

                        <button
                            className="btn btn-info w-100"
                            type="button"
                            onClick={onVote}
                            disabled={votingDisabled}
                        >
                            {votingDisabled ? "Voting closed" : "Vote"}
                        </button>
                    </>

                ) : (

                <strong>Enter Voting Booth →</strong>
                
                )}
            </div>
        </div>
    );
}

export default GameCard;
