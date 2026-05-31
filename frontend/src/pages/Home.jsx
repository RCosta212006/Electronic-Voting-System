import HomeCard from "../components/HomeCard";
import "../css/Home.css";

function Home() {
    return(
        <>
            <div className="page-header">
                <h1>Game DSA Awards</h1>
                <p>The voting platform for the best games of the year.</p>
            </div>
            <div className="page-container">
                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-sm-6 col-lg-4 d-flex">
                        <HomeCard text="Create an account"></HomeCard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 d-flex">
                        <HomeCard text="See Categories"></HomeCard>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 d-flex">
                        <HomeCard text="Vote for your Winner"></HomeCard>
                    </div>
                </div>
            </div>
        </>
    )
    
}


export default Home;
