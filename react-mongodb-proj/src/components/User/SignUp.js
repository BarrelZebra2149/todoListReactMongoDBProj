import "../../style/form.css";
import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const serverURL = "http://localhost:5000/user";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const postElements = async () => {
        const { name, email, password, passwordConfirm } = formData;
        if (password !== passwordConfirm) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(serverURL, { name, email, password }, {withCredentials : true});
            if(response.data.flag) {
                alert("Sign up successful");
                // Reset form
                navigate('/');
            } else {
                setError("Email already exists. Please choose another one.");
            }
            setFormData({
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
            });
        } catch (err) {
            setError("Failed to sign up. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const { name, email, password, passwordConfirm } = formData;

    return (
        <>
            <div className="container">
                <label htmlFor="name">Name
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={name}
                        disabled={loading}
                    />
                </label>
                <label htmlFor="email">Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={email}
                        disabled={loading}
                    />
                </label>
                <label htmlFor="password">Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                        disabled={loading}
                    />
                </label>
                <label htmlFor="passwordConfirm">Confirm Password
                    <input
                        type="password"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        onChange={handleChange}
                        value={passwordConfirm}
                        disabled={loading}
                    />
                </label>
                {error && <p className="error">{error}</p>}

                <button onClick={postElements} disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
                <Link to="/"><button>Back</button></Link>
            </div>
        </>
    );
};

export default SignUp;
