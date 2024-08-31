import "../../style/list.css";
import {useEffect, useState} from "react";
import ScheduleList from "./ScheduleList";
import axios from "axios";

const serverURL = "http://localhost:5000/schedule"

const ScheduleListApp = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(function () { updateList().then(r => 'initializing success')});

    const updateList = async () => {
        const response = await axios.get(serverURL, {withCredentials : true});
        if(response.data.flag) {
            setTodoList(response.data.schedules);
        }
    }

    // Function to handle task deletion
    const onDelete = (item) => {

        updateList().then(r => 'delete success');
    };

    // Function to handle toggling the done flag
    const onDoneFlag = (item) => {

        updateList().then(r => 'flag reversed');
    };

    // Function to handle task editing
    const onEdit = (item) => {

        updateList().then(r => 'edit success');
    };

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
                        <ScheduleList
                            todoList={todoList}
                            onDoneFlag={onDoneFlag}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ScheduleListApp;
