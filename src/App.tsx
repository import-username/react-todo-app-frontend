import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import AuthElement from "./components/AuthElement/AuthElement";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthElement loadScreen defaultElement={<div>landing page</div>}><div>todo list page</div></AuthElement>} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
