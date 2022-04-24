import React from "react";
import { useParams } from "react-router-dom";
import styles from "./TodoListContent.module.scss";
import TodoListUnselectedMenu from "./TodoListUnselectedMenu/TodoListUnselectedMenu";

export default function TodoListContent() {
    const { id } = useParams();

    return (
        <div className={styles["todo-list-content-container"]}>
            {
                id
                ?   <div>selected</div>
                :   <TodoListUnselectedMenu />
            }
        </div>
    );
}