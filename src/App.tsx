import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import AuthElement from "./components/AuthElement/AuthElement";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import TodoListPage from "./components/TodoListPage/TodoListPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthElement loadScreen defaultElement={<LandingPage />}><TodoListPage /></AuthElement>} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
