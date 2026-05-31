import "../css/AboutCard.css";

function AboutCard({ name, image, github }) {

    return (
        <div class="card-about">
            <div className="card-border-top">
            </div>
            <div className="img-about">
                <img href={image}></img>
            </div>
            <span> {name}</span>
            <a href={github}>
                <button>Github</button>
            </a>
        </div>
    );
}

export default AboutCard;