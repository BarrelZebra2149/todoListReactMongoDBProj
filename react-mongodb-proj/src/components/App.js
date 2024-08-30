import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {Provider, useSelector} from 'react-redux';
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import store from "../store/store";

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={isAuthenticated ?  (<Home />)  : (<Login />)}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </Provider>
    );
}

export default App;
