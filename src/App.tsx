import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>landing page</div>} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
