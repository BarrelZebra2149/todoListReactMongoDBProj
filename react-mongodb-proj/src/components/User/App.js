import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import { checkAuthStatus } from "../../store/authActions";

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // Dispatch the checkAuthStatus action when the app loads
    useEffect(() => {dispatch(checkAuthStatus());}, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? (<Home />) : (<Login />)} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}

export default App;
