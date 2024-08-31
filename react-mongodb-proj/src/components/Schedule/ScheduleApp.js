import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "../../style/chartStyle.css";

export default class ScheduleApp extends React.Component {
    calendarComponentRef = React.createRef();

    state = {
        calendarWeekends: true,
        calendarEvents: [
            // initial event data
            {
                id: "1",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T01:00:00.000Z")
            },
            {
                id: "2",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T00:00:00.000Z")
            },
            {
                id: "3",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T01:00:00.000Z")
            },
            {
                id: "4",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T00:00:00.000Z")
            },
            {
                id: "1",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T01:00:00.000Z")
            },
            {
                id: "5",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T00:00:00.000Z")
            },
            {
                id: "6",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T01:00:00.000Z")
            },
            {
                id: "2",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T00:00:00.000Z")
            },
            {
                id: "7",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T01:00:00.000Z")
            },
            {
                id: "8",
                title: "Event Now 1",
                start: new Date("2019-06-05T13:00:00.000Z"),
                end: new Date("2019-06-06T00:00:00.000Z")
            }
        ]
    };

    render() {
        return (
            <div className="demo-app">
                <div className="demo-app-top">
                    <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
                    <button onClick={this.gotoPast}>go to a date in the past</button>
                </div>
                <div className="demo-app-calendar">
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        ref={this.calendarComponentRef}
                        weekends={this.state.calendarWeekends}
                        events={this.state.calendarEvents}
                    />
                </div>
            </div>
        );
    }

    toggleWeekends = () => {
        this.setState({
            // update a property
            calendarWeekends: !this.state.calendarWeekends
        });
    };

    gotoPast = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
    };
}
