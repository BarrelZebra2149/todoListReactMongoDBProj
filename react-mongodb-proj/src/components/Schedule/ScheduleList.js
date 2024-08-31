import { useState } from "react";

const ScheduleList = ({ todoList, onDoneFlag, onDelete, onEdit }) => {
    return (
        <>
            {todoList.map((item) => (
                <tr key={item.no}>
                    <ScheduleListItem
                        item={item}
                        onDoneFlag={onDoneFlag}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </tr>
            ))}
        </>
    );
};

const ScheduleListItem = ({ item, onDoneFlag, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [titleTmp, setTitleTmp] = useState(item.title);
    const [dateFromTmp, setDateFromTmp] = useState(item.dateFrom);
    const [dateToTmp, setDateToTmp] = useState(item.dateTo);

    return (
        <>
            <td>
                <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => onDoneFlag(item)}
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
                        onEdit({...item, title: titleTmp, dateFrom: dateFromTmp, dateTo: dateToTmp});
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
