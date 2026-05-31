import "../css/CreatorCard.css";

function AboutCard({ name, image, github }) {

    return (
        <div className="card-about">
            <div className="card-border-top">
            </div>
            <div className="img-about">
                {image && <img src={image} alt={name} />}
            </div>
            <span> {name}</span>
            <a href={github}>
                <button>Github</button>
            </a>
        </div>
    );
}

export default AboutCard;
