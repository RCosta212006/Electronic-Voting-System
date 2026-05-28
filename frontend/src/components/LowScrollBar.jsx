import { Link } from "react-router-dom";
import "../css/LowScrollBar.css";

function LowScrollBar({ categories, currentCategoryId }) {
    const currentIndex = categories.findIndex(
        (category) => category.id === currentCategoryId
    );

    if (currentIndex === -1) {
        return null;
    }

    const previousCategory = categories[currentIndex - 1];
    const nextCategory = categories[currentIndex + 1];

    if (!previousCategory && !nextCategory) {
        return null;
    }

    const layoutClass = [
        "low-scrollbar",
        !previousCategory && nextCategory ? "only-next" : "",
        previousCategory && !nextCategory ? "only-previous" : "",
    ].join(" ");

    return (
        <div className={layoutClass}>
            {previousCategory && (
                <Link
                    to={`/games/${previousCategory.id}`}
                    className="category-nav-button"
                >
                    <div className="arrow-box">
                        {"<-"}
                    </div>

                    <div className="category-nav-text">
                        <span>PREVIOUS CATEGORY</span>
                        <strong>{previousCategory.name}</strong>
                    </div>
                </Link>
            )}

            {nextCategory && (
                <Link
                    to={`/games/${nextCategory.id}`}
                    className="category-nav-button"
                >
                    <div className="category-nav-text right-text">
                        <span>NEXT CATEGORY</span>
                        <strong>{nextCategory.name}</strong>
                    </div>

                    <div className="arrow-box">
                        {"->"}
                    </div>
                </Link>
            )}
        </div>
    );
}

export default LowScrollBar;
