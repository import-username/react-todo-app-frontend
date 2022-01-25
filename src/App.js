import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<div>landing page</div>} />
                <Route exact path="*" element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
