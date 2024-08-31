import "../../style/list.css";
import {useEffect, useState} from "react";
import ScheduleList from "./ScheduleList";
import axios from "axios";

const serverURL = "http://localhost:5000/schedule"

const ScheduleListApp = () => {

    return (
        <div className="todoList">
            <div className="list-body">
                <div className="todo-container">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Done</th>
                            <th>Title</th>
                            <th>Date From</th>
                            <th>Date To</th>
                            <th>Buttons</th>
                        </tr>
                        </thead>
                        <tbody>
                        <ScheduleList/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ScheduleListApp;
