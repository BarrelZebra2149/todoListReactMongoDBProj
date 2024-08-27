import "../style/home.css"
import axios from "axios";

const serverURL = "http://localhost:5000/logout";
const Home = ({ setIsLoggedIn }) => {
    const handleLogout = async () => {
        try {
            const response = await axios.get(serverURL, { withCredentials: true });
            setIsLoggedIn(!response.data.flag); // Assuming flag true means logout success
        } catch (err) {
            console.error(err);
            alert("Logout failed");
        }
    };

    return (
        <div className="container">
            <h1>Home Page</h1>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
};

export default Home;
