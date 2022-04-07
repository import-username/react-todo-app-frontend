import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import styles from "./TodoListSidebar.module.scss";

export default function TodoListSidebar() {
    return (
        <div className={styles["todo-list-sidebar"]}>
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
        </div>
    );
}
