import CreatorCard from "../components/CreatorCard";
import RodrigoCosta from "../images/Rodrigo_Costa.jpeg";
import RodrigoLopes from "../images/Rodrigo_Lopes.jpeg";
import AndreCosta from "../images/Andre_Costa.png";
import PedroMendes from "../images/Pedro_Mendes.png";

function Creators(){
    return(
        <>
            <div className="page-header">
                <h1>Meet the Creators</h1>
                <p>The voting platform was made by this team</p>
            </div>
            <div className="page-container">
                <div className="row g-4 justify-content-center">
                    <div className="col">
                        <CreatorCard name="André Costa" image={AndreCosta} github="https://github.com/Shiro-5252"></CreatorCard>
                    </div>
                    <div className="col">
                        <CreatorCard name="Pedro Mendes" image={PedroMendes} github="https://github.com/Docas26-dev"></CreatorCard>
                    </div>
                    <div className="col">
                        <CreatorCard name="Rodrigo Costa" image={RodrigoCosta} github="https://github.com/RCosta212006"></CreatorCard>
                    </div>
                    <div className="col">
                        <CreatorCard name="Rodrigo Lopes" image={RodrigoLopes} github="https://github.com/RodrigoLopes12/"></CreatorCard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Creators;
