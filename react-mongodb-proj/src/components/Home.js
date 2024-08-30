import "../style/home.css"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../store/authActions";
import {Link} from "react-router-dom";

const serverURL = "http://localhost:5000/logout";
const Home = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const handleLogout = async () => {
        try {
            const response = await axios.get(serverURL, { withCredentials: true });
            if(response.data.flag) {dispatch(signOut());}
        } catch (err) {
            console.error(err);
            alert("Logout failed");
        }
    };

    return (
        <div className="container">
            {isAuthenticated ?
                (<>
                    <h1>You didn't sign in.</h1>
                    <Link to="/">go Back</Link>
                </>)
                :
                (<>
                    <h1>Home Page</h1>
                    <button onClick={handleLogout}>Log out</button>
                </>)}
        </div>
    );
};

export default Home;
