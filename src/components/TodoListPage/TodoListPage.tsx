import React from "react";
import styles from "./TodoListPage.module.scss";
import TodoListSidebar from "./TodoListSidebar/TodoListSidebar";

export default function TodoListPage() {
    return (
        <div className={styles["todo-list-container"]}>
            <TodoListSidebar />
        </div>
    );
}