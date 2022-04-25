import React from "react";
import { FaCheck, FaEllipsisV } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import type { TodoList } from "../TodoListPage";
import styles from "./TodoListItem.module.scss";

export default function TodoListItem({ todoListItem }: { todoListItem: TodoList }) {
    const navigate = useNavigate();

    const location = useLocation();

    const title: string = todoListItem.title.substring(0, 15).trim() + (todoListItem.title.length > 15 ? "..." : "");

    const date: string = getTodoListDate(todoListItem);

    function onItemClicked(): void {
        navigate(`/${todoListItem.id}`);
    }

    return (
        <div className={`${styles["todo-list-item-container"]}`}>
            <div className={`${styles["todo-list-item-button"]}`} onClick={onItemClicked}>
                <div className={`${styles["todo-list-completion-status"]}`}>
                    <FaCheck />
                </div>
                <div className={styles["todo-list-item-data-container"]}>
                    <span className={styles["todo-list-item-title"]}>
                        { title }
                    </span>
                    <span className={styles["todo-list-item-date"]}>{ date }</span>
                </div>
            </div>
        </div>
    );
}

function getTodoListDate(todoList: TodoList): string {
    let date: string;

    if (isListAYearOrOlder(todoList.createdAt)) {
        const dateDifference: number = getDateDifference(todoList.createdAt);

        if (dateDifference === 1) {
            date = "A year ago.";
        } else {
            date = `${dateDifference} years ago.`;
        }
    } else {
        date = todoList.createdAt.split(" ")[1] + " " + todoList.createdAt.split(" ")[2];
    }

    return date;
}

function getDateDifference(createdAt: string): number {
    if (!isListAYearOrOlder(createdAt)) {
        return -1;
    }

    return (new Date().getFullYear() - new Date(createdAt).getFullYear());
}

function isListAYearOrOlder(createdAt: string): boolean {
    return (new Date(createdAt).getFullYear() < new Date().getFullYear());
}
