import {useEffect, useState} from "react";
import axios from "axios";

const serverURL = "http://localhost:5000/schedule";
const ScheduleList = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(function () { updateList().then(() => 'initializing success')});

    const updateList = async () => {
        const response = await axios.get(serverURL, {withCredentials : true});
        if(response.data.flag) {
            setTodoList(response.data.schedules);
        }
    }

    // Function to handle task deletion
    const onDelete = async (item) => {
        const response = await axios.delete(serverURL, {data : {title : item.title}, withCredentials : true});
        if(response.data.flag) {
            updateList().then(() => console.log('delete success'));
        }
    };

    // Function to handle toggling the done flag
    const onEdit = async (item) => {
        const response = await axios.put(serverURL, {done : item.done, originalTitle : item.title, title : item.title, dateFrom : item.dateFrom, dateTo : item.dateTo}, {withCredentials : true});
        if(response.data.flag) {
            updateList().then(() => console.log('flag changed'));
        } else {
            alert(`end date can't be before start date`);
            updateList().then(() => console.log('edit error'));
        }
    };

    // Function to handle task editing
    const onTitleEdit = async (item) => {
        const response = await axios.put(serverURL, {done : item.done, originalTitle : item.originalTitle, title : item.title, dateFrom : item.dateFrom, dateTo : item.dateTo}, {withCredentials : true});
        if(response.data.flag) {
            updateList().then(() => console.log('edit success'));
        }
    };

    return (
        <>
            {todoList.map((item) => (
                <tr key={item.id}>
                    <ScheduleListItem
                        item={item}
                        onTitleEdit={onTitleEdit}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </tr>
            ))}
        </>
    );
};

const ScheduleListItem = ({ item, onTitleEdit, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [titleTmp, setTitleTmp] = useState(item.title);
    const [dateFromTmp, setDateFromTmp] = useState(item.start);
    const [dateToTmp, setDateToTmp] = useState(item.end);
    return (
        <>
            <td>
                <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => onEdit({...item, done:!item.done, dateFrom: dateFromTmp, dateTo: dateToTmp})}
                />
            </td>
            <td>
                <input
                    type="text"
                    className={`${item.done ? 'line-through' : ''}`}
                    style={{ width: '25vw', marginTop: '17px' }}
                    value={titleTmp}
                    readOnly={!isEditing}
                    onChange={(e) => setTitleTmp(e.target.value)}
                    onFocus={() => setIsEditing(true)}
                    onBlur={() => {
                        setIsEditing(false);
                        onTitleEdit({...item, originalTitle : item.title, title: titleTmp, dateFrom: dateFromTmp, dateTo: dateToTmp});
                    }}
                />
            </td>
            <td>
                <input
                    type="datetime-local"
                    className="form-control"
                    style={{marginTop: '17px'}}
                    value={dateFromTmp}
                    readOnly={!isEditing}
                    onChange={(e) => setDateFromTmp(e.target.value)}
                    onFocus={() => setIsEditing(true)}
                    onBlur={() => {
                        setIsEditing(false);
                        onEdit({ ...item, title: titleTmp, dateFrom: dateFromTmp, dateTo: dateToTmp });
                    }}
                />
            </td>
            <td>
                <input
                    type="datetime-local"
                    className="form-control"
                    style={{marginTop: '17px'}}
                    value={dateToTmp}
                    readOnly={!isEditing}
                    onChange={(e) => setDateToTmp(e.target.value)}
                    onFocus={() => setIsEditing(true)}
                    onBlur={() => {
                        setIsEditing(false);
                        onEdit({ ...item, title: titleTmp, dateFrom: dateFromTmp, dateTo: dateToTmp });
                    }}
                />
            </td>
            <td>
                <button
                    onClick={() => onEdit({ ...item, title: titleTmp, dateFrom: dateFromTmp, dateTo: dateToTmp })}
                    className="btn-primary"
                    type="button"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(item)}
                    className="btn-danger"
                    type="button"
                >
                    Delete
                </button>
            </td>
        </>
    );
};

export default ScheduleList;
