import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>landing page</div>} />
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
