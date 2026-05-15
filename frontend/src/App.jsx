import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar";

import Categories from "./pages/Categories";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Creators from "./pages/Creators";

import "./App.css";

function AppContent() {
    const location = useLocation();

    const hideNavBar =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <>
            {!hideNavBar && <NavBar />}

            <main className={!hideNavBar ? "page-with-navbar" : ""}>
                <Routes>
                    <Route path="/" element={<Categories />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/games/:categoryId" element={<Games />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/creators" element={<Creators />} />
                </Routes>
            </main>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;