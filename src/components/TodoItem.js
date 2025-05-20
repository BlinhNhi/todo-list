import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
    completed,
    deleteTodo,
    updateTodo,
    startEditing,
    cancelEditing,
} from "../features/todo/todoSlice";

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [editValue, setEditValue] = useState(todo.content);
    const inputRef = useRef(null);

    const handleSave = () => {
        if (editValue.trim()) {
            dispatch(updateTodo({ id: todo.id, content: editValue }));
        }
    };

    const isDeadlineSoon = () => {
        if (!todo.deadline) return false;
        const today = new Date();
        const deadlineDate = new Date(todo.deadline);

        if (isNaN(deadlineDate.getTime())) return false;
        const diffInTime = deadlineDate.getTime() - today.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        return diffInDays <= 2 && diffInDays >= 0;
    };
    console.log(isDeadlineSoon);

    useEffect(() => {
        if (todo.isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [todo.isEditing]);

    return (
        <div className="flex sm:items-center  flex-col  sm:flex-row  sm:justify-between border gap-2 p-2 rounded mb-2 bg-white">
            <div className="flex items-center gap-4 w-full">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(completed(todo.id))}
                />
                {todo.isEditing ? (
                    <input
                        ref={inputRef}
                        className="border px-2 py-1 rounded w-full dark:text-gray-500"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                ) : (
                    <div>
                        <span className={todo.completed ? "line-through text-gray-400 text-lg dark:text-gray-500" : "text-base sm:text-lg dark:text-gray-500"}>
                            {todo.content}
                        </span>
                        <p className={`text-sm ${isDeadlineSoon() ? "text-red-500" : "text-gray-400"}`}>
                            Hạn: {new Date(todo.deadline).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
            <div className="flex gap-2">
                {todo.isEditing ? (
                    <>
                        <button onClick={handleSave} className="text-green-500 px-1 sm:p-2 bg-green-500 text-gray-100 rounded-md hover:bg-green-500/80">Lưu</button>
                        <button onClick={() => dispatch(cancelEditing(todo.id))} className="px-1 sm:p-2 bg-orange-500 text-gray-100 rounded-md hover:bg-orange-500/80">Huỷ</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => dispatch(startEditing(todo.id))} className=" px-1 sm:p-2 bg-green-500 text-gray-100 rounded-md hover:bg-green-500/80">Sửa</button>
                        <button onClick={() => dispatch(deleteTodo({ id: todo.id, content: todo.content }))} className="px-1 sm:p-2 bg-red-500 text-gray-100 rounded-md hover:bg-red-500/80">Xoá</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TodoItem;
