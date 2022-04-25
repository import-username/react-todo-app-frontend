import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { TodoList } from "../TodoListPage";
import styles from "./TodoListContent.module.scss";
import TodoListUnselectedMenu from "./TodoListUnselectedMenu/TodoListUnselectedMenu";

export default function TodoListContent() {
    const isSmallScreen: boolean = useMediaQuery({
        query: "(max-width: 700px)"
    });

    return (
        <>
            {
                isSmallScreen ?
                <SmallScreenContentModal /> :
                <RegularScreenContentMenu />
            }
        </>
    );
}

function RegularScreenContentMenu() {
    const { id } = useParams();

    const [todoList, setTodoList]: [TodoList | null, React.SetStateAction<any>] = useState(null);

    useEffect(() => {
        // fetch todo list data
    }, []);

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

function SmallScreenContentModal() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [todoList, setTodoList]: [TodoList | null, React.SetStateAction<any>] = useState(null);

    useEffect(() => {
        // fetch todo list data
    }, []);

    function onModalClick(event: any) {
        const targetName: string = event.target.className.split(" ")[0];

        if (targetName === "todo-list-modal-container") {
            navigate("/");
        }
    }

    return (
        <>
            {
                id ?
                <div className={`todo-list-modal-container ${styles["todo-list-content-modal-container"]}`} onClick={onModalClick}>
                    <span>small screen</span>
                </div> :
                null
            }
        </>
    );
}
