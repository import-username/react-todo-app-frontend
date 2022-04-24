import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { TodoList } from "../TodoListPage";
import styles from "./TodoListItem.module.scss";

export default function TodoListItem({ todoListItem }: { todoListItem: TodoList }) {
    const navigate = useNavigate();

    const location = useLocation();

    const title: string = todoListItem.title.substring(0, 55).trim() + (todoListItem.title.length > 55 ? "..." : "");

    const date: string = todoListItem.createdAt.split(" ")[1] + " " + todoListItem.createdAt.split(" ")[2];

    function onItemClicked(): void {
        navigate(`/${todoListItem.id}`);
    }

    return (
        <div className={`${styles["todo-list-item-container"]} ${location.pathname.replace("/", "") === (todoListItem.id + "") ? styles["selected-todo-list"] : ""}`} onClick={onItemClicked}>
            <span className={styles["todo-list-item-title"]}>
                { title }
            </span>
            <span className={styles["todo-list-item-date"]}>{ date }</span>
        </div>
    );
}