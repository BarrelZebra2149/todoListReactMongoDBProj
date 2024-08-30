import "../../style/form.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/authActions";

const serverURL = "http://localhost:5000/login";

const Login = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const postElements = async () => {
        const { email, password } = formData;

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(serverURL, { email, password }, { withCredentials: true });

            if (response.data.flag) {
                dispatch(signIn({ name: response.data.name, email }));
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
            console.error('Error posting elements:', error);
        } finally {
            setLoading(false);
        }

        setFormData({ email: "", password: "" });
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <label htmlFor="email">
                Email
                <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                    disabled={loading}
                />
            </label>
            <label htmlFor="password">
                Password
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={formData.password}
                    disabled={loading}
                />
            </label>
            {error && <p className="error">{error}</p>}
            <button onClick={postElements} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <br />
            <Link to="/signup">
                <button disabled={loading}>Sign Up</button>
            </Link>
        </div>
    );
};

export default Login;
