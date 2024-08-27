import "../style/login.css"
import { useState } from "react";
import axios from "axios";

const serverURL = "http://localhost:5000/login";

const Login = ({ setIsLoggedIn }) => {
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
            setIsLoggedIn(response.data.flag);
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
        </div>
    );
};

export default Login;
