import {useState} from "react";
import Login from "./Login";
import Home from "./Home";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        isLoggedIn ? (<Home setIsLoggedIn={setIsLoggedIn} />) : (<Login setIsLoggedIn={setIsLoggedIn} />)
    );
}

export default App;
