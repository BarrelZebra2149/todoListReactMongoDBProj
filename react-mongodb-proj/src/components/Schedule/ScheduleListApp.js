import "../../style/list.css";
import { useState } from "react";
import ScheduleList from "./ScheduleList";

const ScheduleListApp = () => {
    const [todoList, setTodoList] = useState([
        { no: 101, title: "Complete React Tutorial", done: false, dateFrom: "2024-09-01T09:00", dateTo: "2024-09-01T17:00" },
        { no: 102, title: "Finish Homework", done: true, dateFrom: "2024-08-30T14:00", dateTo: "2024-08-30T18:00" },
        { no: 103, title: "Read Book", done: false, dateFrom: "2024-09-02T10:00", dateTo: "2024-09-02T12:00" },
        { no: 104, title: "Go Grocery Shopping", done: false, dateFrom: "2024-09-03T08:00", dateTo: "2024-09-03T09:30" }
    ]);
    const [noCnt, setNoCnt] = useState(105);
    const [inputTitle, setInputTitle] = useState("");
    const [inputDateFrom, setInputDateFrom] = useState("");
    const [inputDateTo, setInputDateTo] = useState("");

    // Function to handle adding a new task
    const onClickEvent = () => {
        if (inputTitle.trim() === "" || !inputDateFrom || !inputDateTo) return; // Prevent adding tasks with empty fields

        setTodoList([
            ...todoList,
            { no: noCnt, title: inputTitle, done: false, dateFrom: inputDateFrom, dateTo: inputDateTo }
        ]);
        setNoCnt(noCnt + 1);
        setInputTitle("");
        setInputDateFrom("");
        setInputDateTo("");
    };

    // Function to handle input changes
    const onChangeTitle = (e) => setInputTitle(e.target.value);
    const onChangeDateFrom = (e) => setInputDateFrom(e.target.value);
    const onChangeDateTo = (e) => setInputDateTo(e.target.value);

    // Function to handle task deletion
    const onDelete = (item) => {
        const newList = todoList.filter((todo) => todo.no !== item.no);
        setTodoList(newList);
    };

    // Function to handle toggling the done flag
    const onDoneFlag = (item) => {
        const newTodoList = todoList.map((todo) =>
            todo.no === item.no ? { ...todo, done: !todo.done } : todo
        );
        setTodoList(newTodoList);
    };

    // Function to handle task editing
    const onEdit = (item) => {
        const newTodoList = todoList.map((todo) =>
            todo.no === item.no ? { ...todo, title: item.title, done: item.done, dateFrom: item.dateFrom, dateTo: item.dateTo } : todo
        );
        setTodoList(newTodoList);
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
