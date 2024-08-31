import "../../style/home.css";
import { useState } from "react";
import ScheduleListApp from "./ScheduleListApp";
import {Link} from "react-router-dom";

const Schedule = () => {
    const [formData, setFormData] = useState({
        todo: "",
        dateFrom: "",
        dateTo: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            console.log("Submitting form data:", formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert("Schedule created successfully!");
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
            <label htmlFor="todo">
                Task
                <input
                    type="text"
                    name="todo"
                    id="todo"
                    onChange={handleChange}
                    value={formData.todo}
                    disabled={loading}
                />
            </label>
            <label htmlFor="dateFrom">
                Start Date and Time
                <input
                    type="datetime-local"
                    name="dateFrom"
                    id="dateFrom"
                    onChange={handleChange}
                    value={formData.dateFrom}
                    disabled={loading}
                />
            </label>
            <label htmlFor="dateTo">
                End Date and Time
                <input
                    type="datetime-local"
                    name="dateTo"
                    id="dateTo"
                    onChange={handleChange}
                    value={formData.dateTo}
                    disabled={loading}
                />
            </label>
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Create Schedule"}
            </button>
            <hr/>
            <ScheduleListApp />
            <Link to={"/"}><button className="btn-primary">Back</button></Link>
        </div>
    );
};

export default Schedule;
