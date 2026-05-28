import { useNavigate } from "react-router-dom";

function CloseButton() {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="close-button"
            onClick={() => navigate("/")}
            aria-label="Close"
        />
    );
}

export default CloseButton;
