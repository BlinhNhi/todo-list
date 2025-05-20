import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { reorderTodos } from "../features/todo/todoSlice";

function TodoList({ filter }) {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();
    const filteredTodos = todos.filter((todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "active") return !todo.completed;
        return true;
    });
    const [draggedIndex, setDraggedIndex] = useState(null);
    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggedIndex === null || draggedIndex === index) return;

        const newTodos = [...todos];
        const draggedItem = newTodos[draggedIndex];
        newTodos.splice(draggedIndex, 1);
        newTodos.splice(index, 0, draggedItem);

        dispatch(reorderTodos(newTodos));
        setDraggedIndex(null);
    };
    return (
        <div>
            {filteredTodos.map((todo, index) => (
                <div
                    key={todo.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                >
                    <TodoItem todo={todo} />
                </div>
            ))}
        </div>
    );
}

export default TodoList;