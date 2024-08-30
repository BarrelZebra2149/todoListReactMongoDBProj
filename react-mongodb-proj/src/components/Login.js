import "../style/login.css"
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux";
import {signIn} from "../store/authActions";

const serverURL = "http://localhost:5000/login";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const postElements = async () => {
        console.log('Posting user credentials');
        console.log('email:', email, 'password:', password);
        try {
            const response = await axios.post(serverURL, { email, password }, { withCredentials: true });
            if(response.data.flag) { dispatch(signIn({name : response.data.name, email : email})); }
        } catch (error) {
            console.error('Error posting elements:', error);
        }
        setEmail("");
        setPassword("");
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <label>
                Email:
                <input type="text" name="email" onChange={handleEmailChange} value={email} />
            </label>
            <label>
                Password:
                <input type="password" name="password" onChange={handlePasswordChange} value={password} />
            </label>
            <button onClick={postElements}>Login</button>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
};

export default Login;
