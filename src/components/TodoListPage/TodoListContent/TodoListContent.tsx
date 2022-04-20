import React from "react";
import { TodoList } from "../TodoListPage";
import TodoListUnselectedMenu from "./TodoListUnselectedMenu/TodoListUnselectedMenu";

export default function TodoListContent({ selectedTodoListState }: { selectedTodoListState: TodoList | null }) {
    return (
        <div className="todo-list-content-container">
            {
                selectedTodoListState
                ? "selected"
                : <TodoListUnselectedMenu />
            }
        </div>
    );
}