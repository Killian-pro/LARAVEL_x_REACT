import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NotFound from "./screens/NotFound";
import HomePage from "./screens/HomePage";

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

function OtherRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

function App() {
    const hasToken = !!localStorage.getItem("token");

    return (
        <BrowserRouter>
            {hasToken ? <OtherRoutes /> : <AuthRoutes />}
        </BrowserRouter>
    );
}

export default App;
