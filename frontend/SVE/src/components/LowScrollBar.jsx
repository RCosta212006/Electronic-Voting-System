import "../css/LowScrollBar.css";

function LowScrollBar() {
    return (
        <div className="low-scrollbar">

            {/* LEFT */}
            <button type="button" className="category-nav-button">

                <div className="arrow-box">
                    ←
                </div>

                <div className="category-nav-text">
                    <span>PREVIOUS CATEGORY</span>
                    <strong>BEST ART DIRECTION</strong>
                </div>

            </button>


            {/* RIGHT */}
            <button type="button" className="category-nav-button">

                <div className="category-nav-text right-text">
                    <span>NEXT CATEGORY</span>
                    <strong>BEST NARRATIVE</strong>
                </div>

                <div className="arrow-box">
                    →
                </div>

            </button>

        </div>
    );
}

export default LowScrollBar;