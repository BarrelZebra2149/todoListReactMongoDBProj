import "../../style/home.css"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../store/authActions";
import Schedule from "../Schedule/Schedule";
import ScheduleApp from "../Schedule/ScheduleApp";

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
            {isAuthenticated &&
                <>
                    <Schedule/>
                    <ScheduleApp/>
                    <button onClick={handleLogout}>Log out</button>
                </>}
        </div>
    );
};

export default Home;
