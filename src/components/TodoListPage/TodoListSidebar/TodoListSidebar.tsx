import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { TodoListStateHook } from "../TodoListPage";
import styles from "./TodoListSidebar.module.scss";
import { ReactComponent as IconSvg } from "../../../assets/checkmark-logo.svg";
import TodoListItem from "../TodoListItem/TodoListItem";

export default function TodoListSidebar({ todoListState, addTodoListItem, removeTodoList }: TodoListStateHook) {
    return (
        <div className={styles["todo-list-sidebar"]}>
            <div className={styles["todo-list-sidebar-icon-container"]}>
                <IconSvg />
                <span>React Todo List</span>
            </div>
            <hr className={styles["todo-list-sidebar-divider"]}/>
            <div className={styles["todo-list-sidebar-header"]}>
                <div className={`search-bar-container ${styles["search-bar-container"]}`}>
                    <button className="search-input-button">
                        <FaSearch />
                    </button>
                    <input className={`sidebar-search-input ${styles["sidebar-search-input"]}`} type={"search"} placeholder="Search..."/>
                </div>
                <div className={styles["add-todo-list-button-container"]}>
                    <button className="add-todo-list-button">
                        <FaPlus />
                    </button>
                </div>
            </div>
            <div className="todo-lists-container">
                {
                    todoListState.map((todoList) => {
                        return (
                            <TodoListItem todoListItem={todoList} />
                        );
                    })
                }
            </div>
        </div>
    );
}
