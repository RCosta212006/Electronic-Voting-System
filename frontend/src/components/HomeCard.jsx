import "../css/HomeCard.css";

function HomeCard({ text }) {

    return (
        <div className="card-home">
            <h2>{text}</h2>
        </div>
    );
}

export default HomeCard;
