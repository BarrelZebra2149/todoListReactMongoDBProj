import "../../style/home.css";
import { useState } from "react";
import ScheduleListApp from "./ScheduleListApp"; // Ensure this component is properly implemented
import { Link } from "react-router-dom";
import axios from "axios";

const serverURL = "http://localhost:5000/schedule";

const Schedule = () => {
    const [formData, setFormData] = useState({
        title: "",
        start: "",
        end: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(serverURL, formData, {withCredentials : true}); // Send formData directly
            if (response.data.flag) {
                setFormData({
                    title: "",
                    start: "",
                    end: "",
                });
            } else {
                throw new Error("end date can't be before start date");
            }
        } catch (error) {
            console.error("Error submitting schedule:", error);
            alert("Failed to create schedule. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-schedule">
            <h1>Create Schedule</h1>
            <label htmlFor="title">
                Task
                <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    value={formData.title}
                    disabled={loading}
                />
            </label>
            <label htmlFor="start">
                Start Date and Time
                <input
                    type="datetime-local"
                    name="start"
                    id="start"
                    onChange={handleChange}
                    value={formData.start}
                    disabled={loading}
                />
            </label>
            <label htmlFor="end">
                End Date and Time
                <input
                    type="datetime-local"
                    name="end"
                    id="end"
                    onChange={handleChange}
                    value={formData.end}
                    disabled={loading}
                />
            </label>
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Create Schedule"}
            </button>
            <hr />
            <ScheduleListApp /> {/* Ensure this component displays a list of schedules */}
            <Link to={"/"}><button className="btn-primary">Back</button></Link>
        </div>
    );
};

export default Schedule;
