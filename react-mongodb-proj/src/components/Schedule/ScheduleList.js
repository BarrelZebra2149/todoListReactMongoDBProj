import { useState } from "react";

const ScheduleList = ({ todoList, onDoneFlag, onDelete, onEdit }) => {
    return (
        <>
            {todoList.map((item) => (
                <tr key={item.no}>
                    <td colSpan={3} style={{ padding: "0px" }}>
                        <ScheduleListItem
                            item={item}
                            onDoneFlag={onDoneFlag}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    </td>
                </tr>
            ))}
        </>
    );
};

const ScheduleListItem = ({ item, onDoneFlag, onDelete, onEdit }) => {
    const [flag, setFlag] = useState(false);
    const [outputTitle, setOutputTtile] = useState(item.title);
    const lineThroughClass = { textDecoration: "line-through", color: "blue" };
    const [titleTmp, setTitleTmp] = useState(item.title);

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input
                        onChange={() => {
                            onDoneFlag(item);
                        }}
                        checked={item.done && "checked"}
                        type="checkbox"
                    />
                </div>
            </div>
            <input
                style={item.done ? lineThroughClass : {}}
                type="text"
                className="form-control"
                readOnly={flag ? "" : "readOnly"}
                value={outputTitle}
                onChange={(e) => {
                    setOutputTtile(e.target.value);
                    setTitleTmp(e.target.value);
                }}
                onFocus={() => setFlag(true)}
                onBlur={() => {
                    setFlag(false);
                    setOutputTtile(item.title);
                }}
            />
            <div className="input-group-append">
                <button
                    onClick={() => {
                        setOutputTtile(titleTmp);
                        onEdit({ no: item.no, title: titleTmp, done: item.done });
                    }}
                    className="btn btn-primary"
                    type="button"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(item)}
                    className="btn btn-danger"
                    type="button"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ScheduleList;
