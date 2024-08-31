import "../../style/list.css";
import { useState } from "react";
import ScheduleList from "./ScheduleList";

const ScheduleListApp = () => {
    const [todoList, setTodoLilst] = useState([
        { no: 101, title: "공부하기", done: false },
        { no: 102, title: "자바하기", done: true },
        { no: 103, title: "리액트하기", done: false },
        { no: 104, title: "스프링하기", done: false }
    ]);
    const [noCnt, setNoCnt] = useState(105);
    const [inputTitle, setInputTtile] = useState("");

    const onClickEvent = () => {
        setTodoLilst([...todoList, { no: noCnt, title: inputTitle, done: false }]);
        setNoCnt(noCnt + 1);
        setInputTtile("");
    };

    const onChangeTitle = (e) => {
        setInputTtile(e.target.value);
    };

    const onDelete = ({ no }) => {
        const newList = todoList.filter((todo) => todo.no !== no);
        setTodoLilst(newList);
    };

    const onDoneFlag = ({ no, done }) => {
        const newTodoList = [...todoList];
        todoList.forEach((item, idx) => {
            if (item.no === no) {
                newTodoList[idx].done = !done;
            }
        });
        setTodoLilst(newTodoList);
    };

    const onEdit = ({ no, title, done }) => {
        const newTodoList = [...todoList];
        todoList.forEach((item, idx) => {
            if (item.no === no) {
                newTodoList[idx].done = done;
                newTodoList[idx].title = title;
            }
        });
        setTodoLilst(newTodoList);
    };

    return (
        <div className="todoList">
            <div className="list-body">
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Done</th>
                            <th>Title</th>
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
