import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Creators from "./pages/Creators";

import NavBar from "./components/NavBar";
import LowScrollBar from "./components/LowScrollBar";

import "./App.css";

function App() {

  return (
    <BrowserRouter>
            <NavBar />

            <Routes>
                <Route path="/" element={<Categories />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/games/:categoryId" element={<Games />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/creators" element={<Creators />} />
            </Routes>

            <LowScrollBar />
        </BrowserRouter>
  );
}

export default App;