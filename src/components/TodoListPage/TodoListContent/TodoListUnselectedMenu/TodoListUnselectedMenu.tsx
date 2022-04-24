import React from "react";
import styles from "./TodoListUnselectedMenu.module.scss";

export default function TodoListUnselectedMenu() {
    return (
        <div className={styles["todo-list-unselected-menu-container"]}>
            <span>Nothing here yet!</span>
            <span>Select a todo list to get started.</span>
        </div>
    );
}
