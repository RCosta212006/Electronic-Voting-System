import AboutCard from "../components/AboutCard";

function About(){
    return(
        <>
            <div className="page-header">
                <h1>About</h1>
                <p>The voting platform was made by this team</p>
            </div>
            <div className="page-container">
                <div className="row g-4 justify-content-center">
                    <div className="col">
                        <AboutCard name="André Costa" image="" github="https://github.com/Shiro-5252"></AboutCard>
                    </div>
                    <div className="col">
                        <AboutCard name="Pedro Mendes" image="" github="https://github.com/Docas26-dev"></AboutCard>
                    </div>
                    <div className="col">
                        <AboutCard name="Rodrigo Costa" image="Electronic-Voting-System\frontend\src\images\Rodrigo_Costa.jpeg" github="https://github.com/RCosta212006"></AboutCard>
                    </div>
                    <div className="col">
                        <AboutCard name="Rodrigo Lopes" image="" github="https://github.com/RodrigoLopes12/"></AboutCard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;