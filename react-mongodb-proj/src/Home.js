import axios from "axios";
const serverURL = "http://localhost:5000/logout"
const Home = ({setIsLoggedIn}) => {
    const handleLogout = async () => {
        try {
            const response = await axios.get(serverURL);
            setIsLoggedIn(response.data.flag);
        } catch (err) {
            console.error(err);
            alert("logout failed");
        }
    }

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleLogout}> Log out</button>
        </div>
    );
}

export default Home;