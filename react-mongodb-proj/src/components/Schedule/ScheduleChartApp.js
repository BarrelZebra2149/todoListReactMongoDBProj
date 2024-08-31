import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios"; // Make sure axios is imported

import "../../style/chartStyle.css";


const serverURI = "http://localhost:5000/scheduleAll"
export default class ScheduleChartApp extends React.Component {
    calendarComponentRef = React.createRef();

    state = {
        calendarWeekends: true,
        calendarEvents: [],
        currentYear: new Date().getFullYear(),
    };

    // Fetch events when the component mounts
    async componentDidMount() {
        try {
            const response = await axios.get(serverURI, {withCredentials : true});// Replace with your actual API endpoint
            console.log(response.data.schedules);
            if(response.data.flag) {
                this.setState({
                    calendarEvents: response.data.schedules // Assuming the API returns events in the correct format
                });
            }
        } catch (error) {
            console.error("Error fetching calendar events:", error);
        }
    }

    render() {
        return (
            <div className="demo-app">
                <div className="demo-app-top">
                    <button onClick={() => this.changeYear(-1)}>Go Prev Year</button>
                    <button onClick={() => this.changeYear(1)}>Go Next Year</button>
                </div>
                <div className="demo-app-calendar">
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        ref={this.calendarComponentRef}
                        weekends={this.state.calendarWeekends}
                        events={this.state.calendarEvents} // Use the events from the state
                    />
                </div>
            </div>
        );
    }

    changeYear = (num) => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        let currentDate = calendarApi.getDate();
        let newYear = this.state.currentYear + num;
        let newDate = new Date(currentDate);
        newDate.setFullYear(newYear);
        this.setState({
            currentYear: newYear,
        });
        calendarApi.gotoDate(newDate);
    };
}
