import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem("todos");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const todoSlice = createSlice({
    name: "todos",
    initialState: loadFromLocalStorage(),
    reducers: {
        addTodo: (state, action) => {
            const { content, deadline } = action.payload;
            const newTodo = {
                id: Date.now().toString(),
                content,
                deadline,
                createdAt: new Date().toISOString(),
                completed: false,
                isEditing: false
            };
            state.push(newTodo);
            saveToLocalStorage(state);
        },
        completed: (state, action) => {
            const todo = state.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                saveToLocalStorage(state);
            }
        },
        deleteTodo: (state, action) => {
            console.log(action?.payload);
            if (window.confirm(`Bạn muốn xoá công việc ${action?.payload?.content}?`)) {
                const index = state.findIndex((t) => t.id === action.payload?.id);
                if (index !== -1) {
                    state.splice(index, 1);
                    saveToLocalStorage(state);
                }
            }
        },
        startEditing: (state, action) => {
            const todo = state.find((t) => t.id === action.payload);
            if (todo) todo.isEditing = true;
        },
        updateTodo: (state, action) => {
            const { id, content } = action.payload;
            const todo = state.find((t) => t.id === id);
            if (todo) {
                todo.content = content;
                todo.isEditing = false;
                saveToLocalStorage(state);
            }
        },
        cancelEditing: (state, action) => {
            const todo = state.find((t) => t.id === action.payload);
            if (todo) todo.isEditing = false;
        },
        reorderTodos: (state, action) => {
            return [...action.payload];
        }
    },
});

export const {
    addTodo,
    completed,
    deleteTodo,
    startEditing,
    updateTodo,
    cancelEditing,
    reorderTodos,
} = todoSlice.actions;
export default todoSlice.reducer;