import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function TodoInput() {
    const [input, setInput] = useState("");
    const [deadline, setDeadline] = useState("");
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (input.trim() === "") {
            window.confirm('Vui lòng nhập công việc!')
        }
        if (deadline.trim() === "") {
            window.confirm('Vui lòng nhập ngày hoàn thành!')
        }
        if (input.trim() && deadline.trim()) {
            dispatch(addTodo({ content: input, deadline }));
            setInput("");
            setDeadline("")
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border rounded px-3 py-2 w-full dark:text-gray-500"
                placeholder="Nhập công việc..."
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="border rounded px-2 py-1 dark:text-gray-500"
                placeholder="Chọn hoàn thành..."
            />
            <button
                onClick={handleAdd}
                className="bg-blue-500 text-white p-2 sm:px-1 text-sm sm:tex-base sm:px-4 rounded hover:bg-blue-500/80"
            >
                Thêm
            </button>
        </div>
    );
}

export default TodoInput;